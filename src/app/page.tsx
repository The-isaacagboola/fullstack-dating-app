import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  return (
    <div className="text-base">
      <h1>Home</h1>
    </div>
  );
}
