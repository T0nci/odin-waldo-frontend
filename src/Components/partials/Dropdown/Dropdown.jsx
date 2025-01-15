import styles from "./Dropdown.module.css";

const Dropdown = ({ ...props }) => {
  return <ul className={styles.dropdown} {...props}></ul>;
};

export default Dropdown;
