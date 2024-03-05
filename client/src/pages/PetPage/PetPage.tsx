import { Outlet } from "react-router-dom";
import PetMenu from "../../components/AccountComponents/PetsComponent/PetMenu";
import styles from "./PetPage.module.css";

export default function PetPage() {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <PetMenu />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
