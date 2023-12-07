import styles from "./loader.module.css";
import { FaHourglassHalf } from "react-icons/fa";
import Header from "./Header";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Header></Header>
      <div className={styles.loaderBox}>
        <p>Loading...</p>
        <FaHourglassHalf />
      </div>
    </div>
  );
}
