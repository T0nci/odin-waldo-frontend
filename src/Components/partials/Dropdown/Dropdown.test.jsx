/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

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

describe("Dropdown Component", () => {
  it("renders", () => {
    const { container } = render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={() => {}}
        turnOffDropdown={() => {}}
        setGuessResult={() => {}}
      />,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul
          class="_dropdown_943d41"
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
    `);
  });

  it("calls function with fetch error", async () => {
    const setGuessResult = vi.fn();
    global.fetch.mockRejectedValueOnce(new Error("Test Error"));

    render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={() => {}}
        turnOffDropdown={() => {}}
        setGuessResult={setGuessResult}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button")[0]);

    expect(setGuessResult).toHaveBeenCalledWith("Error: Test Error");
  });

  it("calls function with server error", async () => {
    const setGuessResult = vi.fn();
    const json = () => Promise.resolve({ error: "500: Internal Server Error" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={() => {}}
        turnOffDropdown={() => {}}
        setGuessResult={setGuessResult}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button")[0]);

    expect(setGuessResult).toHaveBeenCalledWith("500: Internal Server Error");
  });

  it("calls functions with incorrect guess", async () => {
    const turnOffDropdown = vi.fn();
    const setGuessResult = vi.fn();
    const json = () => Promise.resolve({ result: "Incorrect guess" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={() => {}}
        turnOffDropdown={turnOffDropdown}
        setGuessResult={setGuessResult}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button")[0]);

    expect(turnOffDropdown).toHaveBeenCalled();
    expect(setGuessResult).toHaveBeenCalledWith("Incorrect guess");
  });

  it("calls functions with correct guess", async () => {
    const turnOffDropdown = vi.fn();
    const guessCharacter = vi.fn();
    const setGuessResult = vi.fn();
    const json = () => Promise.resolve({ result: "Correct guess" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={guessCharacter}
        turnOffDropdown={turnOffDropdown}
        setGuessResult={setGuessResult}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button")[0]);

    expect(turnOffDropdown).toHaveBeenCalled();
    expect(guessCharacter).toHaveBeenCalledWith(1);
    expect(setGuessResult).toHaveBeenCalledWith("Correct guess");
  });

  it("redirects to /name when game is over", async () => {
    const json = () => Promise.resolve({ result: "Game over" });
    global.fetch.mockResolvedValueOnce({ json });

    render(
      <Dropdown
        coordinates={[0, 0]}
        characters={characters}
        guessCharacter={() => {}}
        turnOffDropdown={() => {}}
        setGuessResult={() => {}}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button")[0]);

    expect(hoisted.navigate).toHaveBeenCalledWith("/name");
  });
});
