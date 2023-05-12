import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useState } from "react";
import {
  GlobleContextStore,
  type AppContextState,
} from "~/components/context/GlobleContext";
import Layout from "~/components/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [userData, setUserData] = useState<AppContextState["userState"]>(null);

  const value = {
    userState: {
      set: setUserData,
      get: () => userData,
    },
  };

  return (
    <SessionProvider session={session}>
      <GlobleContextStore.Provider value={value}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobleContextStore.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
