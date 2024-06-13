import { DefaultLayout } from "~/components/Layout";

import Homepage from "~/pages/Homepage";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";
import Cart from "~/pages/Shopcart";
import Profile from "~/pages/Profile";

// public routers
const publicRoutes = [
  { path: "/", component: Homepage },
  { path: "/login", component: Login, layout: null },
  {
    path: "/product/:productId",
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: "/cart", component: Cart, layout: DefaultLayout },
  { path: "/profile", component: Profile, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
