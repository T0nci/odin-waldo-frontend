import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import styles from "./Dropdown.module.css";

const Dropdown = ({
  coordinates,
  characters,
  guessCharacter,
  turnOffDropdown,
  setGuessResult,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = async (id) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/game/guess/" + id,
        {
          credentials: "include",
          body: JSON.stringify({ x: coordinates[0], y: coordinates[1] }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      const json = await response.json();

      if (json.result === "Incorrect guess") turnOffDropdown();
      else if (json.result === "Correct guess") {
        guessCharacter(id);
        turnOffDropdown();
      } else if (json.result === "Game over") return navigate("/name");
      else if (json.error) json.result = json.error;

      setGuessResult(json.result);
    } catch (error) {
      console.error(error);
      setGuessResult(`${error}`);
    }
  };

  return (
    <ul className={styles.dropdown} {...props}>
      {characters.map((char) => (
        <li key={char.id}>
          <button
            onClick={() => {
              handleClick(char.id);
            }}
            className={styles.character}
          >
            <img src={char.url} alt="" className={styles.image} />
            <p className={styles.name}>{char.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

Dropdown.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      guessed: PropTypes.bool,
      id: PropTypes.number,
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  guessCharacter: PropTypes.func.isRequired,
  turnOffDropdown: PropTypes.func.isRequired,
  setGuessResult: PropTypes.func.isRequired,
};

export default Dropdown;
