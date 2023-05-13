import { signOut, useSession } from "next-auth/react";
import { type NextRouter, useRouter } from "next/router";
import Drawer, { type IDrawerConfig } from "~/components/Drawer";
import Unauthorized from "~/components/Unauthorized";
import CreateBlog from "~/components/blogs/CreateBlog";
import ShowAllBlogs from "~/components/blogs/ShowAllBlogs";

export default function Profile() {
  const { data: session } = useSession();
  const router = useRouter();

  const getComponent = (router: NextRouter) => {
    const r = `/${(router.query.profile as string[]).join("/")}`;

    switch (r) {
      case "/profile":
        return <CreateBlog />;

      case "/blogs":
        return <ShowAllBlogs />;

      default:
        void router.replace("/404");
        return null;
    }
  };

  if (!session) return <Unauthorized />;

  const drawerNavRoutes: IDrawerConfig["list"] = [
    {
      link: "/my/blogs",
      value: "My blogs",
    },

    {
      link: "/",
      fn: () => {
        void signOut({ redirect: true, callbackUrl: "/" });
      },
      value: "Sign Out",
    },
  ];

  return (
    <div>
      <Drawer list={drawerNavRoutes} />
      {/* <CreateBlog /> */}
      {getComponent(router)}
    </div>
  );
}
