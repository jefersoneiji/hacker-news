import { createBrowserRouter } from "react-router-dom";

import { About } from './About'
import { ErrorPage } from "./error-page";
import { Home } from "./modules/home/feed";

export const router = createBrowserRouter([
    { path: '/', element: <Home />, errorElement: <ErrorPage/> },
    { path: '/about', element: <About />, errorElement: <ErrorPage/> },
  ])