"use client";
const SignOutButton = () => {
  const handleLogout = () => (window.location.href = "/signout");
  return (
    <button
      className="bg-red-200 p-2 rounded-md cursor-pointer"
      onClick={handleLogout}
    >
      Log out
    </button>
  );
};

export default SignOutButton;
