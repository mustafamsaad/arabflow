import { spaceGrotesk } from "../layout";
import { auth, signOut } from "@/auth";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  console.log(session);
  return <></>;
};

export default Home;
