import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <NotesListPage />,
      },
      {
        path: "notes/:id",
        element: <NotePage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
