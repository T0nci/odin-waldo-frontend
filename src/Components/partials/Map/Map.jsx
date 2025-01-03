import { useState } from "react";
import styles from "./Map.module.css";

const Map = () => {
  const [dropdown, setDropdown] = useState({
    active: false,
    coordinates: [],
    dropdownCoordinates: [],
  });

  const handleClick = (e) => {
    if (dropdown.active)
      setDropdown({ active: false, coordinates: [], dropdownCoordinates: [] });
    else {
      console.log(`Offset: ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);

      setDropdown({
        active: true,
        coordinates: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
      });
    }
  };

  return (
    <>
      <div className={styles.map} onClick={handleClick}>
        <img
          src="https://res-console.cloudinary.com/dyi9mrxgm/thumbnails/v1/image/upload/v1731330901/Y2xkLXNhbXBsZS0z/drilldown"
          alt="..."
        />
        {dropdown.active && (
          <div
            className={styles.dropdown}
            style={{
              // using these coords because we want the dropdown to follow where the user clicked(these are relative to parent container)
              top: dropdown.coordinates[1],
              left: dropdown.coordinates[0],
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default Map;
