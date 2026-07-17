export const siteConfig = {
  name: "Maciej Szamowski",
  shortName: "Maciej Szamowski",
  title: "Maciej Szamowski | Fullstack Developer",
  description:
    "Fullstack developer building native Apple apps and modern web products with Swift, React, Next.js and TypeScript.",
  tagline: "Software that feels native, wherever it runs.",
  url: "https://szamowski.dev",
  locale: "en_US",
  location: "Warsaw, Poland",
  email: "maciej@szamowski.dev",
  links: {
    github: "https://github.com/szamski",
    linkedin: "https://pl.linkedin.com/in/szamowski",
    hora: "https://horacal.app",
    prismatic: "https://github.com/szamski/Prismatic-for-macOS",
    copaCity: "https://www.copacity.club/en",
    gnomeTrayToggle: "https://github.com/szamski/gnome-tray-toggle",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
