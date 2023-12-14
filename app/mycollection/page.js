/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "../Components/Header";
import styles from "./mycollection.module.css";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { SlGhost } from "react-icons/sl";

export default function MyCollection() {
  const [collectionCookie, setCollectionCookie] = useState(
    Cookies.get("userCollection") || null
  );
  const [collection, setCollection] = useState(
    JSON.parse(collectionCookie) || []
  );

  const [logged, setLogged] = useState(Cookies.get("userToken") || null);

  console.log("collectionPage Cookie", collectionCookie);
  console.log("collectionPage Collecton", collection);

  const saveBDD = async (value) => {
    try {
      const response = await axios.post(
        "https://gamepad-api-09c0a7cf5370.herokuapp.com/user-collection",
        {
          favorites: value,
          token: logged,
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const saveCollection = (value) => {
    if (value) {
      Cookies.set("userCollection", JSON.stringify(value));
      saveBDD(value);
    } else {
      Cookies.remove("userCollection");
      setCollection([]);
      saveBDD([]);
    }
  };

  console.log(collection.length);

  return logged ? (
    <div className={styles.myCollection}>
      <Header></Header>
      <div className={styles.body}>
        <p className={styles.h2}>My collection</p>
        <div>
          {collection.length > 0 ? (
            <div className={styles.listOfGame}>
              {collection.map((game, index) => {
                console.log(game);
                return (
                  <div className={styles.gameCard} key={index}>
                    <img
                      className={styles.gameCardPicture}
                      src={game.image}
                      alt=""
                    />
                    <Link href={`/game/${game.name}/${game.id}`}>
                      <p className={styles.gameLine}>{game.name}</p>
                    </Link>
                    <div
                      className={styles.removeFav}
                      onClick={() => {
                        let newCollection = [...collection];
                        newCollection.splice(index, 1);
                        setCollection(newCollection);
                        saveCollection(newCollection);
                      }}
                    >
                      <p> ✖︎ </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.modalEmpty}>
              <p>Your collection is empty</p>
              <Link href="/">
                <p>Go back to home</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.myCollection}>
      <Header></Header>
      <div className={styles.needToLogPageBody}>
        <div className={styles.needToLogPageBox}>
          <SlGhost />

          <p>You must have an account to get a collection</p>

          <p>
            Already have an account?{" "}
            <Link href="/login">
              <span className={styles.link}>Get logged now</span>{" "}
            </Link>
          </p>
          <p>
            If not, create one
            <Link href="/signup">
              <span className={styles.link}> here</span>
            </Link>{" "}
            !
          </p>
        </div>
      </div>
    </div>
  );
}
