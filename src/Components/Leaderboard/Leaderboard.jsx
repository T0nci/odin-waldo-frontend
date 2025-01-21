import { useState } from "react";
import { useData } from "../../hooks";
import styles from "./Leaderboard.module.css";
import Loading from "../partials/Loading/Loading";
import DataError from "../partials/DataError/DataError";
import TableList from "../partials/TableList/TableList";

const Leaderboard = () => {
  const [data, loading, error] = useData(
    import.meta.env.VITE_API_URL + "/leaderboard",
  );
  const [selectedMap, setSelectedMap] = useState(null);

  return (
    <>
      {error ? (
        <DataError error={`${error}`} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.btns}>
            {data.maps.map((map) => (
              <button
                key={map.id}
                onClick={() => setSelectedMap(map.name)}
                className={
                  selectedMap === map.name ? styles.button : styles.btn
                }
              >
                {map.name}
              </button>
            ))}
          </div>
          {selectedMap && (
            <TableList
              users={data.leaderboard
                .filter((user) => user.mapName === selectedMap)
                .sort(
                  (a, b) =>
                    Number(a.totalTimeInSeconds) - Number(b.totalTimeInSeconds),
                )
                .map((user, index) => ({ ...user, num: index + 1 }))}
              map={selectedMap}
            />
          )}
        </>
      )}
    </>
  );
};

export default Leaderboard;
