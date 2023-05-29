export type SiteConfig = typeof siteConfig

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
  },
}
