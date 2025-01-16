import PropTypes from "prop-types";
import styles from "./MapList.module.css";

const MapList = ({ maps, handleClick, selected }) => {
  return (
    <ul className={styles.maps}>
      {maps.map((map) => (
        <li key={map.id} className={styles.map}>
          <p className={styles.name}>{map.name}</p>
          <img src={map.url} alt={map.name + " map"} className={styles.image} />
          <p>Characters to guess: {map.characters}</p>
          <button
            onClick={() => handleClick(map.id)}
            className={map.id === selected ? styles.selected : styles.select}
          >
            {map.id === selected ? "Selected" : "Select"}
          </button>
        </li>
      ))}
    </ul>
  );
};

MapList.propTypes = {
  maps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
      characters: PropTypes.number,
    }),
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.number,
};

export default MapList;
