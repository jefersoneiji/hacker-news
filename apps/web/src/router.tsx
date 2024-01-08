import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { About } from './About'
import { ErrorPage } from "./error-page";

export const router = createBrowserRouter([
    { path: '/', element: <App />, errorElement: <ErrorPage/> },
    { path: '/about', element: <About />, errorElement: <ErrorPage/> },
  ])