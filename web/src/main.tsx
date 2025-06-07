import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { IndexRoute } from "./routes";
import { HelpRoute } from "./routes/help";
import { LanguageHelpRoute } from "./routes/help/language";
import { ListHelpRoute } from "./routes/help/list";
import { MapHelpRoute } from "./routes/help/map";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: IndexRoute,
      },
      {
        path: "help",
        children: [
          {
            index: true,
            Component: HelpRoute,
          },
          {
            path: "language",
            Component: LanguageHelpRoute,
          },
          {
            path: "list",
            Component: ListHelpRoute,
          },
          {
            path: "map",
            Component: MapHelpRoute,
          },
        ],
      },
    ],
  },
]);

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
