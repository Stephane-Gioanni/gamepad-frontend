"use client";

import { useState } from "react";
import Header from "../Components/Header";
import styles from "./login.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LuUser } from "react-icons/lu";
import { HiViewfinderCircle } from "react-icons/hi2";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken" || null));

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        console.log(response.data);
        setUser(response.data.token);
        Cookies.set("userCollection", JSON.stringify(response.data.favorites));
        router.push("/");
      } else {
        alert("Wrong email or wrong password");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
  };

  return token ? (
    <div>
      <span>Déjà connecté</span>
      <Link href="/">
        {" "}
        <span>Retour home</span>{" "}
      </Link>
    </div>
  ) : (
    <div className={styles.login}>
      <Header></Header>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.mainLeftBox}>
              <p className={styles.h2}>How it works?</p>
              <div className={styles.mainLeftLine}>
                <div className={styles.lineLogo}>
                  <HiViewfinderCircle />
                </div>
                <p>Check any infos you want about all the games existing </p>
              </div>

              <div className={styles.mainLeftLine}>
                <div className={styles.lineLogo}>
                  <LuUser />
                </div>
                <p>
                  Log in to your free account to be able to get all features
                </p>
              </div>
              <div className={styles.mainLeftLine}>
                <div className={styles.lineLogo}>
                  <MdOutlineBookmarkAdd />
                </div>
                <p>Add a game to your collection</p>
              </div>
              <div className={styles.mainLeftLine}>
                <span className={styles.lineLogo}>
                  <IoIosMore />
                </span>
                <p>And more..</p>
              </div>
            </div>
          </div>
          <div className={styles.mainRight}>
            <form className={styles.formBox} onSubmit={handleSubmit}>
              <p className={styles.h2}>Login</p>
              <input
                className={styles.input}
                type="email"
                placeholder="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button className={styles.loginButton} type="submit">
                Connect
              </button>
              <Link href="/signup">
                <div className={styles.noAccount}>
                  Dont have an account yet?
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
