const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  QUESTIONS: (id: string) => `/questions/${id}`,
  TAGS: (id: string) => `/popular-tags/${id}`,
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
};

export default ROUTES;
