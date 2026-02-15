import { RouterProvider } from "@tanstack/react-router";
import { router } from "./features/pages/router";

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
