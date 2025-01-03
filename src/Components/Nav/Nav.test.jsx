import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import Nav from "./Nav";

const PlaceHolder = () => {};

const setupRouter = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Nav />,
        children: [{ path: "/leaderboard", element: <PlaceHolder /> }],
      },
    ],
    {
      initialEntries: ["/"],
      initialIndex: 0,
    },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("Nav component", () => {
  it("renders", () => {
    const { container } = setupRouter();

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_main-container_5b014f"
        >
          <nav
            class="floating"
          >
            <ul
              class="floating-child _nav_5b014f"
            >
              <li>
                <a
                  class="_nav-link_5b014f"
                  data-discover="true"
                  href="/"
                >
                  Play
                </a>
              </li>
              <li>
                <a
                  class="_nav-link_5b014f"
                  data-discover="true"
                  href="/leaderboard"
                >
                  Leaderboard
                </a>
              </li>
            </ul>
          </nav>
          <main>
            <div
              class="container"
            />
          </main>
          <footer
            class="floating"
          >
            <div
              class="_footer_b16bb0 floating-child"
            >
              <a
                class="_link_b16bb0"
                href="https://github.com/T0nci/"
              >
                <img
                  alt="Tonci's GitHub"
                  src="/src/assets/github.svg"
                />
                T0nci
              </a>
            </div>
          </footer>
        </div>
      </div>
    `);
  });

  it("goes to leaderboard and back to home", async () => {
    const { router } = setupRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: "Leaderboard" }));
    expect(router.state.location.pathname).toBe("/leaderboard");

    await user.click(screen.getByRole("link", { name: "Play" }));
    expect(router.state.location.pathname).toBe("/");
  });
});
