import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <Link href={"/books"}>Books</Link>
      <Link href={"/students"}>Students</Link>
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
