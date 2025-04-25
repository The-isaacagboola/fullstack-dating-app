import { ReactNode } from "react";
import MessageSideBar from "./messageSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="container grid grid-cols-12">
      <MessageSideBar />
      <div className="col-span-8">{children}</div>
    </section>
  );
}
