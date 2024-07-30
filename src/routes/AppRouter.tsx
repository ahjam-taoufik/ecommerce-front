import {
  AboutUs,
  Home,
  Categories,
  Products,
  Login,
  Register,
} from "@pages/index";
import { MainLayout } from "@layouts/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "@pages/Error";
import Cart from "@pages/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categorie/products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", { status: 400 });
          }

          return true;
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
