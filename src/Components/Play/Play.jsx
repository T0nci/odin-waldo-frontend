import { useState } from "react";
import { useParams } from "react-router";
import { useMap } from "../../hooks";
import Loading from "../partials/Loading/Loading";
import MapInfo from "../partials/MapInfo/MapInfo";
import Map from "../partials/Map/Map";
import DataError from "../partials/DataError/DataError";

const Play = () => {
  const { mapId } = useParams();
  const [mapInfo, loading, error, guessCharacter] = useMap(mapId);
  const [guessResult, setGuessResult] = useState("");

  if (error) console.error(error);

  return (
    <>
      {error ? (
        <DataError error={`${error}`} />
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <MapInfo mapInfo={mapInfo} guessResult={guessResult} />
          <Map
            url={mapInfo.url}
            characters={mapInfo.characters.filter(
              (char) => char.guessed === false,
            )}
            guessCharacter={guessCharacter}
            setGuessResult={(err) => {
              setGuessResult(err);
              setTimeout(() => setGuessResult(""), 3 * 1000);
            }}
          />
        </>
      )}
    </>
  );
};

export default Play;
