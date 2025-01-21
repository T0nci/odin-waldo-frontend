import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Map.module.css";
import Dropdown from "../Dropdown/Dropdown";

const Map = ({ url, characters, guessCharacter, setGuessResult }) => {
  const [dropdown, setDropdown] = useState({
    active: false,
    coordinates: [],
    left: false,
    bottom: false,
  });

  const turnOffDropdown = () => {
    setDropdown({ active: false, coordinates: [], left: false, bottom: false });
  };
  const handleClick = (e) => {
    if (dropdown.active) turnOffDropdown();
    else {
      let left = false;
      let bottom = false;
      if (e.clientX * 2 > document.body.clientWidth) left = true;
      if (e.clientY * 2 > document.body.clientHeight) bottom = true;

      setDropdown({
        active: true,
        // these coordinates are relative to the element being clicked on, and since we are loading the full image without distortion these are accurate
        coordinates: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
        left,
        bottom,
      });
    }
  };

  return (
    <>
      <div className={styles.map}>
        <img src={url} alt="map" onClick={handleClick} />
        {dropdown.active && (
          <Dropdown
            style={{
              top: dropdown.coordinates[1],
              left: dropdown.coordinates[0],
              transform: `translate(${dropdown.left ? "-100%" : "0"}, ${dropdown.bottom ? "-100%" : "0"})`,
            }}
            coordinates={dropdown.coordinates}
            characters={characters}
            guessCharacter={guessCharacter}
            turnOffDropdown={turnOffDropdown}
            setGuessResult={setGuessResult}
          />
        )}
      </div>
    </>
  );
};

Map.propTypes = {
  url: PropTypes.string.isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      guessed: PropTypes.bool,
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  guessCharacter: PropTypes.func.isRequired,
  setGuessResult: PropTypes.func.isRequired,
};

export default Map;
