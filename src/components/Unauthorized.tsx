/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md h-full">
        <div className="px-4 py-8 shadow sm:rounded-lg sm:px-10 bg-red-700 h-full">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Unauthorized
              </h2>
              <p className="mt-2 text-center text-sm text-white">
                You don't have permission to access this page. Please{" "}
                <Link
                  href="/signin"
                  className="font-medium text-black hover:text-blue-950"
                > 
                  login
                </Link>{" "}
                or{" "}
                <Link
                  href="/signup"
                  className="font-medium text-black hover:text-blue-950"
                >
                  sign up
                </Link>{" "}
                to continue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
