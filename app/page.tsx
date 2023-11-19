import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1>hello</h1>
    </div>
  );
}
