import PropTypes from "prop-types";
import styles from "./MapInfo.module.css";

const MapInfo = ({ mapInfo, guessResult }) => {
  return (
    <div>
      <p className={styles.map}>Map: {mapInfo.name}</p>
      <ul className={styles.characters}>
        {mapInfo.characters.map((character) => (
          <li key={character.id} className={styles.character}>
            <img src={character.url} alt="" className={styles.image} />
            <p className={styles.name}>
              {character.guessed ? <s>{character.name}</s> : character.name}
            </p>
          </li>
        ))}
      </ul>
      {guessResult && (
        <p className={styles.result} data-testid="result">
          {guessResult}
        </p>
      )}
    </div>
  );
};

MapInfo.propTypes = {
  mapInfo: PropTypes.shape({
    name: PropTypes.string,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        guessed: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
  guessResult: PropTypes.string.isRequired,
};

export default MapInfo;
