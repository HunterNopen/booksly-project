import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../components/exceptions/NotFound";
import Bookmarked from "../pages/Bookmarked";
import ListRandomBooks from "../pages/ListRandomBooks";
import Search from "../pages/Search";
import InternalError from "../components/exceptions/InternalError";
import Library from "../pages/Library";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Home />},
            { path: "random", element: <ListRandomBooks />},
            { path: "bookmarked", element: <Bookmarked />},
            { path: "search", element: <Search />},
            {path: "library/:genreName", element: <Library />}
        ]
    },
    {
        path: "501",
        element: <InternalError />
    },
    {
        path: "*",
        element: <NotFound />
    },
])