import { Outlet, Link } from "react-router";
import styles from "./Nav.module.css";
import Footer from "../partials/Footer/Footer";

const Nav = () => {
  return (
    <div className={styles["main-container"]}>
      <nav className="floating">
        <ul className={"floating-child " + styles.nav}>
          <li>
            <Link to="/" className={styles["nav-link"]}>
              Play
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={styles["nav-link"]}>
              Leaderboard
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nav;
