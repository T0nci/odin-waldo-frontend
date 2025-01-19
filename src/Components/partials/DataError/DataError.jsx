import PropTypes from "prop-types";
import styles from "./DataError.module.css";

const DataError = ({ error }) => {
  return <p className={styles.error}>{error}</p>;
};

DataError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default DataError;
