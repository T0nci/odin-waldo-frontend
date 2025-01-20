import { useState } from "react";
import { useData } from "../../hooks";
import { Navigate, useNavigate } from "react-router";
import styles from "./Name.module.css";
import Loading from "../partials/Loading/Loading";
import DataError from "../partials/DataError/DataError";

const Name = () => {
  const [game, loading, error] = useData(
    import.meta.env.VITE_API_URL + "/name",
    true,
  );
  const [name, setName] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  if (game instanceof Object && game.error) return <Navigate to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/name", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (json.error) return setFetchError(json.error);
      else if (json.result) return navigate("/");
      else return setFetchError("Unknown response");
    } catch (error) {
      console.error(error);
      setFetchError(error);
    }
  };

  return (
    <>
      {error ? (
        <DataError error={`${error}`} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          {fetchError && <DataError error={`${fetchError}`} />}

          <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.heading}>Congratulations!</h1>
            <p className={styles.info}>
              Your time on <span className={styles.highlight}>{game.map}</span>{" "}
              is{" "}
              <span className={styles.highlight}>
                {game.totalTimeInSeconds} seconds.
              </span>
            </p>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                autoFocus
                autoComplete="on"
                minLength={1}
                maxLength={30}
                value={name}
                onChange={(e) => {
                  if (/^[a-zA-Z0-9]*$/.test(e.target.value))
                    setName(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <button type="submit" className={styles.submit}>
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Name;
