import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";
import styles from "./navbar.module.css";

const Navbar = (props) => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { email } = await magic.user.getMetadata();
        setUsername(email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("browser/list");
  };
  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const signOut = () => {
    try {
      magic.user.logout();
      console.log(magic.user.isLoggedIn());

      router.push("/login");
    } catch (err) {
      console.log(err);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
            </button>

            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName} onClick={signOut}>
                      Sign out
                    </a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
