"use client";

import styles from "./header.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "../Images/gamepad.png";
import Image from "next/image";

export default function Header() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const router = useRouter();

  return (
    <div className={styles.header}>
      <Link href="/">
        <Image src={Logo} alt="Logo" className={styles.logo}></Image>
      </Link>

      {token ? (
        <div className={styles.buttonsIfConnected}>
          <Link href="/mycollection">
            <div>
              <p>My Collection</p>
            </div>
          </Link>
          <button
            className={styles.loginButton}
            onClick={() => {
              Cookies.remove("userToken");
              Cookies.remove("userCollection");
              setToken(null);
              router.push("/");
            }}
          >
            Log off
          </button>
        </div>
      ) : (
        <div className={styles.userSection}>
          <Link href="/mycollection">
            <div>
              <p>My Collection</p>
            </div>
          </Link>
          <Link href="/login">
            <button className={styles.loginButton}> Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}
