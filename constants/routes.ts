const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  QUESTIONS: (id: string) => `/questions/${id}`,
  TAGS: (id: string) => `/popular-tags/${id}`,
};

export default ROUTES;
