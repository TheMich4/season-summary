export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Season Summary",
  description: "Get your iRacing season summary",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search",
      href: "/search",
    },
  ],
  links: {
    github: "https://github.com/themich4/season-summary",
    twitter: "https://twitter.com/SeasonSummary",
  },
};

export const url =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://season-summary.dyczkowski.dev";
