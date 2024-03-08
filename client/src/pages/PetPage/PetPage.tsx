import { Outlet, useParams } from "react-router-dom";
import PetMenu from "../../components/AccountComponents/PetsComponent/PetMenu";
import styles from "./PetPage.module.css";
import { useAppSelector } from "../../redux/hooks";

export default function PetPage(): JSX.Element {
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
