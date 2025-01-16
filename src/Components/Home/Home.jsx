import { useState } from "react";
import { useData } from "../../hooks";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import MapList from "../partials/MapList/MapList";
import Loading from "../partials/Loading/Loading";

const Home = () => {
  const [maps, loading, error] = useData(
    import.meta.env.VITE_API_URL + "/maps",
  );
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  if (error) console.error(error);

  const handleClick = () => {
    if (selected === null) return;

    navigate("/play/" + selected);
  };

  return (
    <>
      {error ? (
        <p className={styles.error}>{`${error}`}</p>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <MapList
            maps={maps}
            handleClick={(id) => setSelected(id)}
            selected={selected}
          />
          <button onClick={handleClick} className={styles.play}>
            Play
          </button>
        </>
      )}
    </>
  );
};

export default Home;
