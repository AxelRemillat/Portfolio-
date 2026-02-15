# PROJECT_OVERVIEW

## 1) Résumé rapide du projet

- **Stack**: React 19 + TypeScript + Vite 7, avec React Router (`BrowserRouter`, `Routes`, `Route`).
- **Architecture globale**:
  - `src/main.tsx` monte l’app et importe un CSS global historique (`src/index.css`).
  - `src/App.tsx` déclare le routing et importe le **CSS global principal actuel** (`src/styles/index.css`).
  - `src/layout/Layout.tsx` applique la structure commune (Navbar + `<Outlet />`) et injecte l’audio via `AudioProvider`.
- **Style global**:
  - Approche CSS “fichiers thématiques” (`src/styles/...`) importés en cascade.
  - Beaucoup d’effets visuels premium: backgrounds fixes, glow curseur, glassmorphism, gradients métal/bronze.
  - Convention de classes BEM-like (ex: `contact-page__grid`, `projectCard__mediaInner`) + classes utilitaires (`section`, `muted`, etc.).
- **Conventions de code**:
  - Fonctions composants en `export default function ...`.
  - Hooks custom dédiés aux animations/UX (`usePrefersReducedMotion`, hooks `vous-et-moi`).
  - Données métier séparées dans `src/data`.

---

## 2) Arborescence commentée (max 3 niveaux)

```text
.
├─ public/
│  ├─ audio/ambiance.mp3                # piste audio de fond
│  └─ images/                           # assets visuels (backgrounds, SVG, logos technos)
├─ src/
│  ├─ main.tsx                          # bootstrap React + import src/index.css
│  ├─ App.tsx                           # router principal + import src/styles/index.css
│  ├─ index.css                         # ancien/global CSS (contient des @import legacy)
│  ├─ audio/
│  │  └─ AudioProvider.tsx              # gestion musique ON/OFF + unlock au geste utilisateur
│  ├─ layout/
│  │  └─ Layout.tsx                     # shell page + navbar + outlet
│  ├─ pages/
│  │  ├─ Home.tsx                       # page d'accueil
│  │  ├─ Parcours.tsx                   # wrapper vers pages/parcours/ParcoursPage
│  │  ├─ Contact.tsx                    # wrapper vers pages/contact/ContactPageView
│  │  ├─ vous-et-moi/                   # page “Vous & Moi” + data sections
│  │  ├─ parcours/                      # page parcours détaillée
│  │  └─ contact/                       # page contact détaillée
│  ├─ components/
│  │  ├─ home/                          # HomeBackground, TechScroller, ProjectsShowcase, modal
│  │  ├─ parcours/                      # bulles, écran de drop, pie chart, background
│  │  ├─ contact/                       # hero/form/sidebar/orb
│  │  └─ vous-et-moi/                   # background, effets curseur, sections/hooks
│  ├─ styles/
│  │  ├─ index.css                      # point d'entrée CSS principal actuel
│  │  ├─ home/, parcours/, contact/, vous-et-moi/
│  │  └─ base.css, layout.css, navbar.css, ...
│  ├─ data/                             # datasets (projects, parcoursCaps, skills, ...)
│  └─ hooks/                            # hook global usePrefersReducedMotion
├─ vite.config.ts                       # alias @ -> ./src
└─ package.json                         # scripts dev/build/lint/preview
```

---

## 3) Routing (React Router)

- **Fichier source du router**: `src/App.tsx`.
- **Provider router**: `BrowserRouter` au niveau racine.
- **Route layout**: `path="/"` avec `element={<Layout />}` et enfants imbriqués.

### Table des routes

| Route | Page rendue | Fichier page |
|---|---|---|
| `/` (index) | Home | `src/pages/Home.tsx` |
| `/parcours` | Parcours | `src/pages/Parcours.tsx` -> `src/pages/parcours/ParcoursPage.tsx` |
| `/vous-et-moi` | Vous & Moi | `src/pages/vous-et-moi/VousEtMoiPage.tsx` |
| `/about` | Redirection | `Navigate` vers `/vous-et-moi` |
| `/contact` | Contact | `src/pages/Contact.tsx` -> `src/pages/contact/ContactPageView.tsx` |

---

## 4) Pages principales: composants utilisés + CSS associés

## `/` — Home

- **Page**: `src/pages/Home.tsx`
- **Composants principaux**:
  - `src/components/home/HomeBackground.tsx`
  - `src/components/Hero.tsx`
  - `src/components/home/TechScroller.tsx`
  - `src/components/home/ProjectsShowcase.tsx`
- **CSS associés**:
  - Imports globaux via `src/styles/index.css`:
    - `src/styles/home/home-background.css`
    - `src/styles/home/home-page.css`
    - `src/styles/home/projectsShowcase.css`
    - `src/styles/hero.css`
  - Import direct composant:
    - `src/components/home/TechScroller.tsx` -> `src/styles/home/techScroller.css`

## `/parcours` — Parcours

- **Entry page**: `src/pages/Parcours.tsx`
- **Page réelle**: `src/pages/parcours/ParcoursPage.tsx`
- **Composants principaux**:
  - `src/components/parcours/ParcoursBackground.tsx`
  - `src/components/parcours/BubbleList.tsx`
  - `src/components/parcours/DropScreen.tsx`
  - `src/components/parcours/ParcoursSkills.tsx`
- **Data utilisée**:
  - `src/data/parcoursCaps.ts`
- **CSS associés**:
  - `src/pages/parcours/ParcoursPage.tsx` -> `src/styles/parcours.css`
  - `src/components/parcours/ParcoursBackground.tsx` -> `src/styles/parcours/parcours-background.css`
  - + imports globaux parcours depuis `src/styles/index.css`:
    - `src/styles/parcours/parcours.css`
    - `src/styles/parcours/bubbles.css`
    - `src/styles/parcours/screen.css`
    - `src/styles/parcours/skills-pie.css`

## `/vous-et-moi` — Vous & Moi

- **Page**: `src/pages/vous-et-moi/VousEtMoiPage.tsx`
- **Composants principaux**:
  - `src/components/vous-et-moi/VemBackground.tsx`
  - `src/components/vous-et-moi/CursorEffect.tsx`
  - `src/components/vous-et-moi/SectionBlock.tsx`
  - `src/components/vous-et-moi/ContactCTASection.tsx`
- **Hooks/page logic**:
  - `src/components/vous-et-moi/useBodyClass.ts` (ajoute `vem-body` au `<body>`)
  - data sections: `src/pages/vous-et-moi/sectionsData.ts`
- **CSS associés**:
  - Imports globaux via `src/styles/index.css`:
    - `src/styles/vous-et-moi/aurora.css`
    - `src/styles/vous-et-moi/vousEtMoi.css`
    - `src/styles/vous-et-moi/vousEtMoiSections.css`
    - `src/styles/vous-et-moi/contactCta.css`
  - Import direct composant:
    - `src/components/vous-et-moi/CursorEffect.tsx` -> `src/styles/vous-et-moi/CursorEffect.css`

## `/contact` — Contact

- **Entry page**: `src/pages/Contact.tsx`
- **Page réelle**: `src/pages/contact/ContactPageView.tsx`
- **Composants principaux**:
  - `src/components/contact/ContactHero.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/contact/ContactSidebar.tsx`
  - Réutilise `VemBackground` + `CursorEffect`
- **CSS associés**:
  - Imports directs dans `src/pages/Contact.tsx`:
    - `src/styles/contact/contactPage.css`
    - `src/styles/contact/contactForm.css`
    - `src/styles/contact/contactSidebar.css`
  - + import global `src/styles/contact.css` (depuis `src/styles/index.css`)

---

## 5) Backgrounds / Direction Artistique (DA)

### Où sont les backgrounds (fixed + pointer-events none)

- **Home**:
  - Composant: `src/components/home/HomeBackground.tsx`
  - CSS: `src/styles/home/home-background.css`
  - Pattern: conteneur `position: fixed; inset: 0; pointer-events: none; z-index: 0;`
- **Parcours**:
  - Composant: `src/components/parcours/ParcoursBackground.tsx`
  - CSS: `src/styles/parcours/parcours-background.css`
  - Même pattern: fixed + non-interactif + couche glow curseur
- **Vous & Moi / Contact**:
  - Composant: `src/components/vous-et-moi/VemBackground.tsx`
  - CSS: `src/styles/vous-et-moi/aurora.css`
  - Background métal/bronze plein écran, fixed, non cliquable
- **Effet curseur croisé** (overlay):
  - Composant: `src/components/vous-et-moi/CursorEffect.tsx`
  - CSS: `src/styles/vous-et-moi/CursorEffect.css`
  - `position: fixed; inset: 0; pointer-events: none; z-index: 1`

### Règles de z-index (logique de couches)

- **Base background**: généralement `z-index: 0` (`home-background`, `parcours-bg`, `vem-background`)
- **Overlay lumineux curseur**: `z-index: 1` (`cursor-effect-container`)
- **Contenu page**: souvent `z-index: 1` ou `10` selon page:
  - `vous-et-moi-inner` à `z-index: 1`
  - `contact-page`, `contact-hero`, `contact-page__grid` à `z-index: 10`
- **Principe**: fond fixe en dessous, effets non interactifs au milieu, contenu interactif au-dessus.

---

## 6) Styles: import CSS global, ordre, conventions

### Où est importé le CSS global

- `src/main.tsx` importe `src/index.css`.
- `src/App.tsx` importe `src/styles/index.css`.

### Ordre actuel des imports (source principale moderne)

- Fichier: `src/styles/index.css`
- Ordre:
  1. Base & layout (`base.css`, `layout.css`, `responsive.css`)
  2. UI globale (`navbar.css`, `components.css`, `modal.css`)
  3. Home
  4. Hero
  5. Parcours
  6. Vous & Moi (**`aurora.css` avant `vousEtMoi.css`**)
  7. Contact

### Conventions observées

- Découpage par domaine (`styles/home`, `styles/parcours`, `styles/contact`, ...).
- Classes composant structurées en blocs/éléments (`block__element`, variantes `--modifier`).
- Variables CSS pour motion/position (`--hero-mx`, `--parallaxY`, `--vem-scroll`).
- Respect `prefers-reduced-motion` dans les composants animés/backgrounds.

---

## 7) Data & hooks: rôle des fichiers clés

## `src/data`

- `src/data/projects.ts`: liste des projets (cards Home + modal projet), tags, liens, médias.
- `src/data/parcoursCaps.ts`: dataset principal de la page Parcours (bulles + contenu DropScreen).
- `src/data/skills.ts`: groupes de compétences (utilisé par anciennes pages/components type About/Skills).
- `src/data/timeline.ts`: timeline simplifiée (structure année/titre/lieu/description).
- `src/data/parcours.ts`: jeu de données parcours détaillé alternatif (legacy/complémentaire).
- `src/data/experience.ts`: expériences structurées (formation/stages/projets), non branché sur la route active.

## `src/hooks`

- `src/hooks/usePrefersReducedMotion.ts`:
  - hook global d’accessibilité pour détecter `prefers-reduced-motion`.
  - utilisé par des composants visuels (ex: HomeBackground, Hero, ParcoursBackground).

## Hooks spécifiques “Vous & Moi” (`src/components/vous-et-moi`)

- `useBodyClass.ts`: ajoute/retire une classe body pour la DA de page.
- `useScrollProgress.ts`: calcule une progression scroll lissée pour animer des sections.
- `useRevealOnScroll.ts`: gère la révélation via `IntersectionObserver` (mode replay ou one-shot).

---

## 8) Points d’attention

1. **Ne pas casser l’ordre des imports CSS globaux** dans `src/styles/index.css`, surtout:
   - `aurora.css` **avant** `vousEtMoi.css`.
2. **Conserver la hiérarchie de couches (z-index)**:
   - background fixed (`0`) -> overlay lumière (`1`) -> contenu interactif (`>=1/10`).
3. **Conserver `pointer-events: none` sur les backgrounds/overlays** pour éviter de bloquer les clics.
4. **Maintenir la compatibilité accessibilité motion** (`prefers-reduced-motion`) dans tout nouvel effet animé.
5. **Attention au double global CSS**:
   - `src/main.tsx` charge `src/index.css` (legacy),
   - `src/App.tsx` charge `src/styles/index.css` (actuel).
   - Toute modif globale doit vérifier les effets de bord entre les deux.
6. **Routing actif vs code legacy**:
   - les routes actives sont Home/Parcours/Vous & Moi/Contact.
   - des pages/components existent mais non routés (ex: `src/pages/About.tsx`, `src/pages/Projects.tsx`).
7. **Alias de chemin**:
   - `@` est configuré vers `./src` dans `vite.config.ts`; garder cette convention dans les imports.

