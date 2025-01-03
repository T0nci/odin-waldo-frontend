import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter, Link } from "react-router";
import ErrorPage from "./ErrorPage";

const Home = () => {
  return (
    <>
      <Link to="404">404</Link>
    </>
  );
};
const ComponentError = () => {
  throw new Error("Test error");
};

const setupRouter = (componentError) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/component-error",
        element: <ComponentError />,
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: [componentError === true ? "/component-error" : "/"],
      initialIndex: 0,
    },
  );

  const { container } = render(<RouterProvider router={router} />);

  return { router, container };
};

describe("ErrorPage component", () => {
  it("renders with component error", () => {
    const { container } = setupRouter(true);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="container"
        >
          <p
            class="_error_804c82"
          >
            Error: Test error
          </p>
          <a
            class="_link_804c82"
            data-discover="true"
            href="/"
          >
            Go back to home
          </a>
        </div>
      </div>
    `);
  });

  it("renders with React Router error", async () => {
    const { container } = setupRouter();
    const user = userEvent.setup();

    await user.click(screen.getByRole("link", { name: "404" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="container"
        >
          <p
            class="_error_804c82"
          >
            404: Not Found
          </p>
          <a
            class="_link_804c82"
            data-discover="true"
            href="/"
          >
            Go back to home
          </a>
        </div>
      </div>
    `);
  });

  it("renders a clickable link which redirects to home", async () => {
    const { container } = setupRouter(true);
    const user = userEvent.setup();

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="container"
        >
          <p
            class="_error_804c82"
          >
            Error: Test error
          </p>
          <a
            class="_link_804c82"
            data-discover="true"
            href="/"
          >
            Go back to home
          </a>
        </div>
      </div>
    `);

    await user.click(screen.getByRole("link", { name: "Go back to home" }));

    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          data-discover="true"
          href="/404"
        >
          404
        </a>
      </div>
    `);
  });
});
