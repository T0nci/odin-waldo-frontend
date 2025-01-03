import GithubIcon from "../../../assets/github.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className="floating">
      <div className={styles.footer + " floating-child"}>
        <a href="https://github.com/T0nci/" className={styles.link}>
          <img src={GithubIcon} alt="Tonci's GitHub" />
          T0nci
        </a>
      </div>
    </footer>
  );
};

export default Footer;
