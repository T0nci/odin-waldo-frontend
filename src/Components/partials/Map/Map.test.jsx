/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Map from "./Map";

global.fetch = vi.fn();

const hoisted = vi.hoisted(() => ({
  navigate: vi.fn(),
}));
vi.mock(import("react-router"), async (importOriginal) => {
  const mod = await importOriginal();

  const useNavigate = () => hoisted.navigate;

  return {
    ...mod,
    useNavigate,
  };
});

const characters = [
  {
    guessed: false,
    id: 1,
    name: "Test Character 1",
    url: "Test URL 3",
  },
  {
    guessed: false,
    id: 2,
    name: "Test Character 2",
    url: "Test URL 4",
  },
];

describe("Map Component", () => {
  it("renders", () => {
    const { container } = render(
      <Map
        url={"Test URL 6"}
        characters={characters}
        guessCharacter={() => {}}
        setGuessResult={() => {}}
      />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_map_d20351"
        >
          <img
            alt="map"
            src="Test URL 6"
          />
        </div>
      </div>
    `);
  });

  it("renders with dropdown", async () => {
    const { container } = render(
      <Map
        url={"Test URL 6"}
        characters={characters}
        guessCharacter={() => {}}
        setGuessResult={() => {}}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_map_d20351"
        >
          <img
            alt="map"
            src="Test URL 6"
          />
          <ul
            class="_dropdown_943d41"
            style="top: 0px; left: 0px;"
          >
            <li>
              <button
                class="_character_943d41"
              >
                <img
                  alt=""
                  class="_image_943d41"
                  src="Test URL 3"
                />
                <p
                  class="_name_943d41"
                >
                  Test Character 1
                </p>
              </button>
            </li>
            <li>
              <button
                class="_character_943d41"
              >
                <img
                  alt=""
                  class="_image_943d41"
                  src="Test URL 4"
                />
                <p
                  class="_name_943d41"
                >
                  Test Character 2
                </p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    `);
  });

  it("calls functions with a correct guess", async () => {
    const guessCharacter = vi.fn();
    const setGuessResult = vi.fn();
    const json = () => Promise.resolve({ result: "Correct guess" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Map
        url={"Test URL 6"}
        characters={characters}
        guessCharacter={guessCharacter}
        setGuessResult={setGuessResult}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));
    await user.click(screen.getAllByRole("button")[0]);

    expect(guessCharacter).toHaveBeenCalledWith(1);
    expect(setGuessResult).toHaveBeenCalledWith("Correct guess");
  });

  it("redirects to /name when game is over", async () => {
    const json = () => Promise.resolve({ result: "Game over" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Map
        url={"Test URL 6"}
        characters={characters}
        guessCharacter={() => {}}
        setGuessResult={() => {}}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));
    await user.click(screen.getAllByRole("button")[0]);

    expect(hoisted.navigate).toHaveBeenCalledWith("/name");
  });
});
