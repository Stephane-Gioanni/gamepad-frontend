/* eslint-disable @next/next/no-img-element */
"use client";

import Header from "@/app/Components/Header";
import axios from "axios";
import styles from "./gamePage.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FcPlus } from "react-icons/fc";
import Loader from "@/app/Components/Loader";
import { FaWindowClose } from "react-icons/fa";

export default function GamePage(params) {
  let id = params.params.slug2;

  const [logged, setLogged] = useState(Cookies.get("userToken") || null);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [collectionCookie, setCollectionCookie] = useState(
    Cookies.get("userCollection") || null
  );
  const [needLog, setNeedLog] = useState(false);

  const [collection, setCollection] = useState(
    JSON.parse(collectionCookie) || []
  );
  const [inCollection, setInCollection] = useState(false);

  const saveBDD = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user-collection",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}`,
          {
            params: {
              key: "1682ef652d8e436f87287c77bc2c7abe",
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);

        let newCollection = [...collection];
        for (let i = 0; i < newCollection.length; i++) {
          if (newCollection[i].id === response.data.id) {
            setInCollection(true);
          } else {
            setInCollection(false);
          }
        }
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [id, collection]);

  console.log(collection);
  console.log(inCollection);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div className={styles.gamePage}>
      <Header></Header>
      <div className={styles.body}>
        <p className={styles.gameName}>{data.name}</p>
        <div className={styles.main}>
          <div className={styles.mainLeftSide}>
            <div className={styles.gamepicture}>
              <img
                src={data.background_image}
                alt=""
                className={styles.gameImage}
              />
            </div>
          </div>
          <div className={styles.mainRightSide}>
            <div className={styles.topButtonsRightSideSection}>
              {inCollection === true ? (
                <div
                  className={styles.topButtonsRightSideIfTrue}
                  onClick={() => {
                    let newCollection = [...collection];
                    for (let i = 0; i < newCollection.length; i++) {
                      if (newCollection[i].id === data.id) {
                        newCollection.splice(i, 1);
                        setCollection(newCollection);
                        saveCollection(newCollection);
                        setInCollection(false);
                      }
                    }
                  }}
                >
                  <div className={styles.savedInYourCollection}>
                    <p> Saved in your collection</p>
                    <span className={styles.inCollection}>✓</span>
                  </div>
                </div>
              ) : (
                <div
                  className={styles.topButtonsRightSide}
                  onClick={() => {
                    if (logged) {
                      let isFound = false;
                      let newCollection = [...collection];

                      for (let i = 0; i < newCollection.length; i++) {
                        if (newCollection[i].id === data.id) {
                          isFound = true;
                          break;
                        }
                      }
                      if (isFound === false) {
                        newCollection.push({
                          name: data.name,
                          id: data.id,
                          image: data.background_image,
                        });
                        setCollection(newCollection);
                        saveCollection(newCollection);
                        setInCollection(true);
                      }
                    } else {
                      if (needLog === false) {
                        setNeedLog(true);
                      }
                    }
                  }}
                >
                  <div>
                    {needLog === true ? (
                      <div className={styles.alert}>
                        <p>
                          Your must be logged to add this game to a collection{" "}
                        </p>
                        <span
                          className={styles.closeAlert}
                          onClick={() => setNeedLog(false)}
                        >
                          <FaWindowClose />
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    {" "}
                    <p> Save to</p>{" "}
                  </div>
                  <div className={styles.logoAdd}>
                    <FcPlus />
                  </div>
                  <p className={styles.biggerWord}>collection</p>
                </div>
              )}
            </div>
            <div className={styles.mainRightSideInfos}>
              <div className={styles.mainRightSideInfosColumn}>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Platforms</p>
                  <div className={styles.infosContent}>
                    {data.platforms.map((platform, index) => {
                      return (
                        <div key={index}>
                          <p>{platform.platform.name},</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Release date</p>
                  <p>{data.released}</p>
                </div>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Publisher</p>
                  <div>
                    {data.publishers.map((publisher, index) => {
                      return (
                        <div key={index}>
                          <p>{publisher.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.mainRightSideInfosColumn}>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Genre</p>
                  <div className={styles.infosContent}>
                    {data.genres.map((genre, index) => {
                      return (
                        <div key={index}>
                          <p>{genre.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Developper</p>
                  <div>
                    {data.developers.map((developer, index) => {
                      return (
                        <div key={index}>
                          <p>{developer.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.infosBox}>
                  <p className={styles.infosTitle}>Age rating</p>
                  <p>{data.esrb_rating.name}</p>
                </div>
              </div>
            </div>

            <div className={styles.infosBoxLast}>
              <p className={styles.infosTitle}>About</p>
              <div className={styles.infosBoxLastDescription}>
                {data.description_raw}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
