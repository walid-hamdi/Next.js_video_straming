import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { magic } from "../lib/magic-client";

import styles from "../styles/Login.module.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onCompleteEvent = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", onCompleteEvent);
    router.events.on("routeChangeError", onCompleteEvent);

    return () => {
      router.events.off("routeChangeComplete", onCompleteEvent);
      router.events.off("routeChangeError", onCompleteEvent);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      //   log in a user by their email
      try {
        //   setIsLoading(true);
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          router.push("/");
        }
      } catch (error) {
        setUserMsg("Something went wrong logging in" + error);
        setIsLoading(false);
      }
      router.push("/");
    } else {
      // show user message
      setIsLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/">
            <a className={styles.logoLink}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
