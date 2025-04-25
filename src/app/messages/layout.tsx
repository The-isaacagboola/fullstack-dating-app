import { ReactNode, Suspense } from "react";
import MessageSideBar from "./messageSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="container grid grid-cols-12">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <MessageSideBar />
      </Suspense>
      <div className="col-span-8">{children}</div>
    </section>
  );
}
