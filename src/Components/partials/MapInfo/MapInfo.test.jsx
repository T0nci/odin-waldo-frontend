import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MapInfo from "./MapInfo";

const mapInfo = {
  name: "Test Map 1",
  url: "Test URL 1",
  characters: [
    {
      name: "Test Character 1",
      url: "Test URL 3",
    },
    {
      name: "Test Character 2",
      url: "Test URL 4",
    },
  ],
};

describe("MapInfo Component", () => {
  it("renders", () => {
    const { container } = render(
      <MapInfo mapInfo={mapInfo} guessResult={""} />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <p
            class="_map_59a237"
          >
            Map: 
            Test Map 1
          </p>
          <ul
            class="_characters_59a237"
          >
            <li
              class="_character_59a237"
            >
              <img
                alt=""
                class="_image_59a237"
                src="Test URL 3"
              />
              <p
                class="_name_59a237"
              >
                Test Character 1
              </p>
            </li>
            <li
              class="_character_59a237"
            >
              <img
                alt=""
                class="_image_59a237"
                src="Test URL 4"
              />
              <p
                class="_name_59a237"
              >
                Test Character 2
              </p>
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  it("renders with error", () => {
    const { container } = render(
      <MapInfo mapInfo={mapInfo} guessResult={"Test"} />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <p
            class="_map_59a237"
          >
            Map: 
            Test Map 1
          </p>
          <ul
            class="_characters_59a237"
          >
            <li
              class="_character_59a237"
            >
              <img
                alt=""
                class="_image_59a237"
                src="Test URL 3"
              />
              <p
                class="_name_59a237"
              >
                Test Character 1
              </p>
            </li>
            <li
              class="_character_59a237"
            >
              <img
                alt=""
                class="_image_59a237"
                src="Test URL 4"
              />
              <p
                class="_name_59a237"
              >
                Test Character 2
              </p>
            </li>
          </ul>
          <p
            class="_result_59a237"
          >
            Test
          </p>
        </div>
      </div>
    `);
  });
});
