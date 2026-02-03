import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type AudioContextValue = {
  isEnabled: boolean;
  toggle: () => void;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useSiteAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useSiteAudio must be used within AudioProvider");
  return ctx;
}

type AudioProviderProps = {
  src: string;
  children: React.ReactNode;
};

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function tryPlay(audio: HTMLAudioElement) {
  try {
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

/**
 * Stratégie fiable (Edge / Chrome) :
 * 1) On lance l'audio en autoplay MUET (souvent autorisé).
 * 2) Au 1er geste (scroll/wheel/touch/etc), on unmute + volume => "démarre" au scroll.
 * 3) Si autoplay muet est bloqué, on fallback sur clic/pointerdown/keydown.
 */
export default function AudioProvider({ src, children }: AudioProviderProps) {
  // ✅ ON au lancement (comme tu veux)
  const [isEnabled, setIsEnabled] = useState(true);

  const audioElRef = useRef<HTMLAudioElement | null>(null);

  // a-t-on réussi à lancer la lecture (même muette) ?
  const startedRef = useRef(false);

  // a-t-on déjà "déverrouillé" le son (muted=false + volume>0) ?
  const unlockedRef = useRef(false);

  // init audio element
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    audio.src = src;
    audio.loop = true;
    audio.preload = "auto";

    // état par défaut: prêt à autoplay muet
    audio.muted = true;
    audio.volume = 0;

    audio.load();
  }, [src]);

  // play/pause quand toggle
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    if (!isEnabled) {
      audio.pause();
      audio.muted = true;
      audio.volume = 0;
      unlockedRef.current = false;
      return;
    }

    // si déjà démarré, on tente reprise
    if (startedRef.current) void tryPlay(audio);
  }, [isEnabled]);

  // ✅ tentative autoplay muet au chargement
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    let cancelled = false;

    const bootMutedAutoplay = async () => {
      if (!isEnabled) return;

      await wait(50);
      if (cancelled) return;

      audio.muted = true;
      audio.volume = 0;

      const ok = await tryPlay(audio);
      if (cancelled) return;

      startedRef.current = ok;
    };

    void bootMutedAutoplay();

    return () => {
      cancelled = true;
    };
  }, [isEnabled, src]);

  // ✅ au moindre geste (inclut scroll) : unmute + volume
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    let cancelled = false;

    const unlockSound = async () => {
      if (cancelled) return;
      if (!isEnabled) return;
      if (unlockedRef.current) return;

      // Si pas démarré (autoplay muet bloqué), on tente play
      if (!startedRef.current) {
        audio.muted = false;
        audio.volume = 0.18;

        const ok1 = await tryPlay(audio);
        if (cancelled) return;

        if (!ok1) {
          await wait(120);
          if (cancelled) return;

          const ok2 = await tryPlay(audio);
          if (cancelled) return;

          startedRef.current = ok2;
          if (!ok2) return; // bloqué => il faudra un geste plus "fort"
        } else {
          startedRef.current = true;
        }

        unlockedRef.current = true;
        return;
      }

      // Sinon: lecture muette déjà lancée => on unmute (c'est le "démarrage" au scroll)
      audio.muted = false;
      audio.volume = 0.18;

      // sécurité si jamais c'était repassé en pause
      if (audio.paused) {
        const ok = await tryPlay(audio);
        if (cancelled) return;
        if (!ok) return;
      }

      unlockedRef.current = true;
    };

    // IMPORTANT: certains navigateurs ne considèrent pas toujours scroll/wheel comme user-gesture,
    // mais ici on "unmute" surtout. Et si autoplay muet a marché, ça suffit.
    const opts: AddEventListenerOptions = { capture: true, passive: true };

    // gestes forts
    document.addEventListener("pointerdown", unlockSound, opts);
    document.addEventListener("click", unlockSound, opts);
    document.addEventListener("keydown", unlockSound, { capture: true });

    // ✅ scroll gestures
    document.addEventListener("wheel", unlockSound, opts);
    document.addEventListener("scroll", unlockSound, opts);
    document.addEventListener("touchstart", unlockSound, opts);
    document.addEventListener("touchmove", unlockSound, opts);

    return () => {
      cancelled = true;

      document.removeEventListener("pointerdown", unlockSound, opts);
      document.removeEventListener("click", unlockSound, opts);
      document.removeEventListener("keydown", unlockSound, { capture: true } as any);

      document.removeEventListener("wheel", unlockSound, opts);
      document.removeEventListener("scroll", unlockSound, opts);
      document.removeEventListener("touchstart", unlockSound, opts);
      document.removeEventListener("touchmove", unlockSound, opts);
    };
  }, [isEnabled]);

  // relance au retour d’onglet
  useEffect(() => {
    const audio = audioElRef.current;
    if (!audio) return;

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (!isEnabled) return;
      if (startedRef.current) void tryPlay(audio);
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isEnabled]);

  const toggle = () => {
    const audio = audioElRef.current;

    setIsEnabled((prev) => {
      const next = !prev;
      if (!audio) return next;

      if (!next) {
        audio.pause();
        audio.muted = true;
        audio.volume = 0;
        unlockedRef.current = false;
        return next;
      }

      // ON : comme c'est un clic sur le bouton => geste user => on peut unmute direct
      audio.muted = false;
      audio.volume = 0.18;

      void (async () => {
        const ok1 = await tryPlay(audio);
        if (!ok1) {
          await wait(120);
          const ok2 = await tryPlay(audio);
          startedRef.current = ok2;
        } else {
          startedRef.current = true;
        }
        if (startedRef.current) unlockedRef.current = true;
      })();

      return next;
    });
  };

  const value = useMemo(() => ({ isEnabled, toggle }), [isEnabled]);

  return (
    <AudioCtx.Provider value={value}>
      <audio ref={audioElRef} loop preload="auto" style={{ display: "none" }} />
      {children}
    </AudioCtx.Provider>
  );
}
