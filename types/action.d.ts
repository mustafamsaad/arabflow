interface SignInWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: { email: string; name: string; image: string; username: string };
}

interface AuthCredentials {
  email: string;
  password: string;
  name: string;
  username: string;
}

interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
