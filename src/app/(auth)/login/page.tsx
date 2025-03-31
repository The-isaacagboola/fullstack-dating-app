import LoginForm from "./loginForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-5 rounded-lg shadow-2xl mt-10 w-[20%]">
        <h1 className="text-2xl font-semibold mb-5">LOGIN</h1>
        <h3 className="mb-4">Welcome back to MactchMe</h3>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
