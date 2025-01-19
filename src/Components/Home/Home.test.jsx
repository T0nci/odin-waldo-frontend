/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import Home from "./Home";

global.fetch = vi.fn();

const maps = [
  {
    id: 1,
    name: "Test Map 1",
    url: "Test URL 1",
    characters: 2,
  },
  {
    id: 2,
    name: "Test Map 2",
    url: "Test URL 2",
    characters: 1,
  },
];

const PlaceHolder = () => {};
const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/play/:mapId",
        element: <PlaceHolder />,
      },
    ],
    { initialEntries: ["/"], initialIndex: 0 },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("Home Component", () => {
  it("renders", async () => {
    const json = () => Promise.resolve(maps);
    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul
          class="_maps_858d5c"
        >
          <li
            class="_map_858d5c"
          >
            <p
              class="_name_858d5c"
            >
              Test Map 1
            </p>
            <img
              alt="Test Map 1 map"
              class="_image_858d5c"
              src="Test URL 1"
            />
            <p>
              Characters to guess: 
              2
            </p>
            <button
              class="_select_858d5c"
            >
              Select
            </button>
          </li>
          <li
            class="_map_858d5c"
          >
            <p
              class="_name_858d5c"
            >
              Test Map 2
            </p>
            <img
              alt="Test Map 2 map"
              class="_image_858d5c"
              src="Test URL 2"
            />
            <p>
              Characters to guess: 
              1
            </p>
            <button
              class="_select_858d5c"
            >
              Select
            </button>
          </li>
        </ul>
        <button
          class="_play_4b4bfe"
        >
          Play
        </button>
      </div>
    `);
  });

  it("renders with error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("test error"));

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="_error_c84a52"
        >
          Error: test error
        </p>
      </div>
    `);
  });

  it("redirects when a game is selected to play", async () => {
    const json = () => Promise.resolve(maps);
    global.fetch.mockResolvedValueOnce({ json });

    let router = null;
    await act(() => {
      const { router: temp } = setupRouter();
      router = temp;
    });
    const user = userEvent.setup();

    await user.click(screen.getAllByRole("button", { name: "Select" })[0]);
    await user.click(screen.getByRole("button", { name: "Play" }));

    expect(router.state.location.pathname).toBe("/play/1");
  });
});
