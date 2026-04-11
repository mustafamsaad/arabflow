const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  QUESTION: (id: string) => `/questions/${id}`,
  TAGS: (id: string) => `/popular-tags/${id}`,
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  SIGN_IN_WITH_OAUTH: "/auth/signin-with-oauth",
};

export default ROUTES;
