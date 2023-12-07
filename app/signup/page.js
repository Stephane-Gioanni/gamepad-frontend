"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../Components/Header";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("userToken" || null));

  let router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signup", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        setUser(response.data.token);
        router.push("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    }
  };

  console.log(token);

  return token ? (
    <div>Déjà connecté</div>
  ) : (
    <div className={styles.signup}>
      <Header></Header>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.mainLeftBox}>
              <p className={styles.h2}>How it works?</p>
              <div className={styles.mainLeftLine}>
                <span className={styles.lineLogo}>♦︎</span>
                <p>Check any infos you want about all the games existing </p>
              </div>

              <div className={styles.mainLeftLine}>
                <span className={styles.lineLogo}>♦︎</span>
                <p>
                  Log in to your free account to be able to get all features
                </p>
              </div>
              <div className={styles.mainLeftLine}>
                <span className={styles.lineLogo}>♦︎</span>
                <p>Add a game to your collection</p>
              </div>
              <div className={styles.mainLeftLine}>
                <span className={styles.lineLogo}>♦︎</span>
                <p>And more..</p>
              </div>
            </div>
          </div>
          <div className={styles.mainRight}>
            <div className={styles.formBox}>
              <p className={styles.h2}>Sign up</p>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  className={styles.input}
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className={styles.input}
                  placeholder="Password.."
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button className={styles.signupButton}>Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}