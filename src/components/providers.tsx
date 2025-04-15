import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ToastContainer position="bottom-right" hideProgressBar />
      {children}
    </div>
  );
};

export default Providers;
