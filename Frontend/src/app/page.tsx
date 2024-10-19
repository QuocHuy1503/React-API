"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { logIn, logOut } from "./users/api";
import { getCurrentUser } from "./users/api";

export default function Home() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const user = getCurrentUser ();
    if (user) {
        setUser (user);
    }
}, []);

  const handelLogOut = () => {
      logOut();
      setUser(null);
  }
  return (
    <div>
      {/* <Link href={"/books"}>Books</Link>
      <Link href={"/students"}>Students</Link>
      <Link href={"/login"}>Login</Link> */}
      {user ? <Link href={"/users"}>Users</Link> : ""}
      {user ? <Link href={"/students"}>Students</Link> : ""}
      {user ? <Link href={"/books"}>Books</Link> : ""}
      {user ? <button onClick={handelLogOut}>Logout</button> : <Link href={"/login"}>Login</Link>}
    </div>
  );
}
