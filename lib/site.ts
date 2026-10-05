export const siteConfig = {
  name: "Maciej Szamowski",
  shortName: "Maciej Szamowski",
  title: "Maciej Szamowski | Senior marketer who codes",
  description:
    "Senior marketer who codes. Building native Mac apps: hora Calendar and Pixel Helper. Sharing what works, what breaks, and the tiny details.",
  tagline: "Senior marketer who codes.",
  url: "https://szamowski.dev",
  locale: "en_US",
  location: "Warsaw, Poland",
  email: "maciej@szamowski.dev",
  links: {
    github: "https://github.com/szamski",
    linkedin: "https://pl.linkedin.com/in/szamowski",
    hora: "https://horacal.app",
    pixelHelper: "https://pixel.szamowski.dev",
    prismatic: "https://github.com/szamski/Prismatic-for-macOS",
    copaCity: "https://www.copacity.club/en",
    gnomeTrayToggle: "https://github.com/szamski/gnome-tray-toggle",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString();
