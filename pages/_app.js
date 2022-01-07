import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCompleteRouter = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleCompleteRouter);
    router.events.on("routeChangeError", handleCompleteRouter);

    return () => {
      router.events.off("routeChangeComplete", handleCompleteRouter);
      router.events.off("routeChangeError", handleCompleteRouter);
    };
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, []);

  const jsx = isLoading ? <Loading /> : <Component {...pageProps} />;

  return jsx;
}

export default MyApp;
