import { useState } from "react";
import styles from "./Map.module.css";

const Map = () => {
  const [dropdown, setDropdown] = useState({
    active: false,
    coordinates: [],
  });

  const handleClick = (e) => {
    if (dropdown.active) setDropdown({ active: false, coordinates: [] });
    else {
      console.log(`Offset: ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);

      setDropdown({
        active: true,
        // these coordinates are relative to the element being clicked on, and since we are loading the full image these are accurate
        coordinates: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
      });
    }
  };

  return (
    <>
      <div className={styles.map}>
        <img
          src="https://res.cloudinary.com/dyi9mrxgm/image/upload/v1736456545/terraria-map-1_fdytsc.jpg"
          alt="..."
          onClick={handleClick}
        />
        {dropdown.active && (
          <ul
            className={styles.dropdown}
            style={{
              top: dropdown.coordinates[1],
              left: dropdown.coordinates[0],
            }}
          ></ul>
        )}
      </div>
    </>
  );
};

export default Map;
