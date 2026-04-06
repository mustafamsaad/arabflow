import ROUTES from "./routes";

export const sidebarLinks = (userId?: string) => [
  {
    imgURL: "/icons/home.svg",
    route: ROUTES.HOME,
    label: "Home",
  },
  {
    imgURL: "/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/icons/star.svg",
    route: "/collections",
    label: "Collections",
  },
  {
    imgURL: "/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/icons/user.svg",
    route: userId ? ROUTES.PROFILE(userId) : "/profile",
    label: "Profile",
  },
  {
    imgURL: "/icons/question.svg",
    route: ROUTES.ASK_QUESTION,
    label: "Ask a question",
  },
];
