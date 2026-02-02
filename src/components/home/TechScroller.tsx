import "@/styles/home/techScroller.css";

const techs = [
  { name: "Git", icon: "/images/tech-icons/git-original.svg" },
  { name: "n8n", icon: "/images/tech-icons/n8n-logo.png" },
  { name: "VS Code", icon: "/images/tech-icons/vscode-original.svg" },
  { name: "React", icon: "/images/tech-icons/react-original.svg" },
  { name: "ChatGPT", icon: "/images/tech-icons/ChatGPT_logo.svg" },
  { name: "Figma", icon: "/images/tech-icons/figma-original.svg" },
  { name: "Claude", icon: "/images/tech-icons/claude.png" },
];

export default function TechScroller() {
  return (
    <div className="tech-scroller">
      <div className="tech-scroller__track">
        {/* Premier jeu de logos */}
        {techs.map((tech, index) => (
          <div key={`tech-1-${index}`} className="tech-scroller__item">
            <img
              src={tech.icon}
              alt={tech.name}
              className="tech-scroller__logo"
            />
            <span className="tech-scroller__name">{tech.name}</span>
          </div>
        ))}
        
        {/* Duplication pour continuité infinie */}
        {techs.map((tech, index) => (
          <div key={`tech-2-${index}`} className="tech-scroller__item">
            <img
              src={tech.icon}
              alt={tech.name}
              className="tech-scroller__logo"
            />
            <span className="tech-scroller__name">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}