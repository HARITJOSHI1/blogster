/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const {data: session} = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="ml-2 font-bold text-white">Blogster</span>
          </Link>
        </div>
        {session?.user ? (
          <div>
            <Link href="/me/profile">
              <span className="ml-2 font-medium text-white">
                Welcome <i>{session.user.name}!</i>
              </span>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/signup" className="mr-4 text-white">
              Sign up
            </Link>
            <Link
              href="/signin"
              className="text-white"
              onClick={() => signIn()}
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
