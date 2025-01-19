/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import Play from "./Play";

global.fetch = vi.fn();

const PlaceHolder = () => {};
const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/play/:mapId",
        element: <Play />,
      },
      {
        path: "/name",
        element: <PlaceHolder />,
      },
    ],
    { initialEntries: ["/play/1"], initialIndex: 0 },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

const mapInfo = {
  name: "Test Map 1",
  url: "Test URL 1",
  characters: [
    {
      id: 1,
      name: "Test Character 1",
      url: "Test URL 3",
    },
    {
      id: 2,
      name: "Test Character 2",
      url: "Test URL 4",
    },
  ],
};

describe("Play Component", () => {
  it("renders", async () => {
    const json = () => Promise.resolve(mapInfo);
    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

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
        <div
          class="_map_d20351"
        >
          <img
            alt="map"
            src="Test URL 1"
          />
        </div>
      </div>
    `);
  });

  it("renders with error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Test Error"));

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
          Error: Test Error
        </p>
      </div>
    `);
  });

  it("renders with dropdown", async () => {
    const json = () => Promise.resolve(mapInfo);
    global.fetch.mockResolvedValueOnce({ json });

    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));

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
        <div
          class="_map_d20351"
        >
          <img
            alt="map"
            src="Test URL 1"
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

  it("updates screen when incorrect guess", async () => {
    const json = vi.fn();
    json.mockResolvedValueOnce(mapInfo);
    json.mockResolvedValueOnce({ result: "Incorrect guess" });
    global.fetch.mockResolvedValueOnce({ json });
    global.fetch.mockResolvedValueOnce({ json });

    await act(() => setupRouter());
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));
    await user.click(screen.getAllByRole("button")[0]);

    expect(screen.getByTestId("result").textContent).toBe("Incorrect guess");
  });

  it("updates screen when correct guess", async () => {
    const json = vi.fn();
    json.mockResolvedValueOnce(mapInfo);
    json.mockResolvedValueOnce({ result: "Correct guess" });
    global.fetch.mockResolvedValueOnce({ json });
    global.fetch.mockResolvedValueOnce({ json });

    await act(() => setupRouter());
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));
    await user.click(screen.getAllByRole("button")[0]);

    expect(screen.getByTestId("result").textContent).toBe("Correct guess");
  });

  it("redirects to /name when game is over", async () => {
    const json = vi.fn();
    json.mockResolvedValueOnce(mapInfo);
    json.mockResolvedValueOnce({ result: "Game over" });
    global.fetch.mockResolvedValueOnce({ json });
    global.fetch.mockResolvedValueOnce({ json });

    let router = null;
    await act(() => {
      const { router: temp } = setupRouter();
      router = temp;
    });
    const user = userEvent.setup();

    await user.click(screen.getByAltText("map"));
    await user.click(screen.getAllByRole("button")[0]);

    expect(router.state.location.pathname).toBe("/name");
  });
});
