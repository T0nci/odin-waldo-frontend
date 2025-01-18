import { useState, useEffect } from "react";

export const useData = (url) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (!isActive) return;

        setState(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [url]);

  return [state, loading, error];
};

export const useMap = (mapId) => {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const guessCharacter = (id) => {
    const newCharacters = state.characters.map((char) => {
      if (id === char.id) return { ...char, guessed: true };

      return char;
    });

    setState({ ...state, characters: newCharacters });
  };

  useEffect(() => {
    let isActive = true;

    fetch(import.meta.env.VITE_API_URL + "/game/start/" + mapId, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!isActive) return;

        if (res.name && res.url) {
          // not setting anything in localStorage because
          // if user wants to start new game he will be
          // constantly redirected to old game
          res.characters = res.characters.map((charObject) => ({
            ...charObject,
            guessed: false,
          }));
          setState(res);
          setLoading(false);
        } else {
          setError(res.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [mapId]);

  return [state, loading, error, guessCharacter];
};
