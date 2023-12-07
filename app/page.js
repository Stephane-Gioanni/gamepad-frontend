/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import Header from "./Components/Header";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Images/gamepad.png";
import Loader from "./Components/Loader";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [orderingField, setOrderingField] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: "1682ef652d8e436f87287c77bc2c7abe",
          search: searchInput,
          ordering: orderingField,
          ordering: selectedOption,
          page: page,
        },
      });
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [orderingField, searchInput, page, selectedOption]);

  const handleOrderingChange = (newOrderingField) => {
    setOrderingField(newOrderingField);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <main className={styles.mainGeneral}>
      <div className={styles.main}>
        <Header></Header>
        <header className={styles.header}>
          <Image src={Logo} alt="logo"></Image>
          <input
            className={styles.headerInput}
            type="text"
            placeholder="Search for a game.."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          <select
            className={styles.filtersSelect}
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="name">Sort by name A-Z</option>
            <option value="-name"> Sort by name Z-A</option>
            <option value="-rating"> Best rating first</option>
            <option value="rating"> Worst rating first</option>
            <option value="released"> The oldest first</option>
            <option value="-released"> Most recent first</option>
          </select>
        </header>
        <div className={styles.body}>
          <div className={styles.topBody}>
            <p className={styles.h3}>All the games</p>
          </div>
          <div className={styles.listOfGame}>
            {data.results.map((game, index) => {
              return (
                <div key={game.id}>
                  <Link href={`/game/${game.slug}/${game.id}`}>
                    <div className={styles.gameCard}>
                      <p className={styles.gameLine}>{game.name}</p>

                      <img
                        className={styles.gameCardPicture}
                        src={game.background_image}
                        alt={game.id}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                }
              }}
            >
              ◀︎
            </button>
            <span className={styles.paginationButton}>{page}</span>
            <button
              className={styles.paginationButton}
              onClick={() => {
                if (data.next !== null) {
                  setPage(page + 1);
                } else {
                  alert("no more");
                }
              }}
            >
              ▶︎
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
