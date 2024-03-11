import { Outlet, useParams } from "react-router-dom";
import PetMenu from "../../components/AccountComponents/PetsComponent/PetMenu";
import styles from "./PetPage.module.css";
import { useAppSelector } from "../../redux/hooks";
import GlassWrapper from "../../components/GlassWrapper/GlassWrapper";

export default function PetPage(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <GlassWrapper width="100%" style={{ height: "100%" }}>
          <PetMenu />
        </GlassWrapper>
      </div>
      <div className={styles.content}>
        <GlassWrapper width="90%">
          <Outlet />
        </GlassWrapper>
      </div>
    </div>
  );
}
