import AuthForm from "@/components/forms/AuthForm";
import { signUpWithCredentials } from "@/lib/actions/auth.action";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      defaultValues={{ name: "", username: "", email: "", password: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
