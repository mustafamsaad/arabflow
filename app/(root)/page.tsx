import { spaceGrotesk } from "../layout";
import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className={spaceGrotesk.className + " h1-bold"}>
        TailwindCss is awesome!!!!
      </h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <button type="submit">Logout</button>
      </form>
    </>
  );
};

export default Home;
