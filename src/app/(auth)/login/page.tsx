import { auth } from "@/auth";
import LoginForm from "./loginForm";
import SignOutButton from "@/components/signOutButton";

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    return (
      <div>
        Logged In Already
        <p>{JSON.stringify(session, null, 4)}</p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-5 rounded-lg shadow-2xl mt-10 w-[300px] bg-white text-black">
        <h1 className="text-2xl font-semibold mb-5">LOGIN</h1>
        <h3 className="mb-4">Welcome back to MatchMe</h3>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
