import Link from "next/link";
import { useContext } from "react";
import { GlobleContextStore } from "../context/GlobleContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userState } = useContext(GlobleContextStore);
  const data = userState.get();

  return (
    <div className="flex h-screen flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="ml-2 font-bold text-white">Blogster</span>
            </Link>
          </div>
          {data ? (
            <div>
              <Link href='/profile'>
                <span className="ml-2 font-medium text-white">
                  Welcome <i>{data.name}!</i>
                </span>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/signup" className="mr-4 text-white">
                Sign up
              </Link>
              <Link href="/signin" className="text-white">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
