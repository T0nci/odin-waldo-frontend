/* eslint-disable no-undef */
import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import Leaderboard from "./Leaderboard";

global.fetch = vi.fn();
const fetchReturn = {
  leaderboard: [
    {
      id: 1,
      username: "Test User 1",
      mapName: "Test Map 1",
      totalTimeInSeconds: "10.001",
    },
    {
      id: 2,
      username: "Test User 2",
      mapName: "Test Map 2",
      totalTimeInSeconds: "12.345",
    },
    {
      id: 3,
      username: "Test User 3",
      mapName: "Test Map 1",
      totalTimeInSeconds: "7.556",
    },
  ],
  maps: [
    {
      id: 1,
      name: "Test Map 1",
    },
    {
      id: 2,
      name: "Test Map 2",
    },
  ],
};
const json = () => Promise.resolve(fetchReturn);
global.fetch.mockResolvedValue({ json });

const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
    { initialEntries: ["/leaderboard"], initialIndex: 0 },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("Leaderboard Component", () => {
  it("renders", async () => {
    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_btns_b46387"
        >
          <button
            class="_btn_b46387"
          >
            Test Map 1
          </button>
          <button
            class="_btn_b46387"
          >
            Test Map 2
          </button>
        </div>
      </div>
    `);
  });

  it("renders a map leaderboard", async () => {
    let container = null;
    await act(() => {
      const { container: temp } = setupRouter();
      container = temp;
    });

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Test Map 1" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_btns_b46387"
        >
          <button
            class="_button_b46387"
          >
            Test Map 1
          </button>
          <button
            class="_btn_b46387"
          >
            Test Map 2
          </button>
        </div>
        <table
          class="_table_d61b1a"
        >
          <caption
            class="_caption_d61b1a"
          >
            Leaderboard for 
            Test Map 1
          </caption>
          <thead>
            <tr>
              <th
                class="_th_d61b1a"
              >
                Ranking
              </th>
              <th
                class="_th_d61b1a"
              >
                Name
              </th>
              <th
                class="_th_d61b1a"
              >
                Total time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="_row_d61b1a"
            >
              <td
                class="_td_d61b1a"
              >
                1
              </td>
              <td
                class="_td_d61b1a"
              >
                Test User 3
              </td>
              <td
                class="_td_d61b1a"
              >
                7.556
                s
              </td>
            </tr>
            <tr
              class="_row_d61b1a"
            >
              <td
                class="_td_d61b1a"
              >
                2
              </td>
              <td
                class="_td_d61b1a"
              >
                Test User 1
              </td>
              <td
                class="_td_d61b1a"
              >
                10.001
                s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
  });

  it("renders fetch error", async () => {
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
});
