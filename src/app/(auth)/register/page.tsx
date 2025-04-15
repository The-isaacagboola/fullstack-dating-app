import RegisterForm from "./registerForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="p-5 rounded-lg shadow-2xl mt-10 w-[400px]">
        <h1 className="text-2xl font-semibold mb-5">REGISTER</h1>
        <h3 className="mb-4">Register with MactchMe</h3>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
