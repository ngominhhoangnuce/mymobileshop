import { HeaderOnly } from "src/components/Layout";
import Homepage from "~/pages/Homepage";
import login from "~/pages/Login";
import product from "~/pages/Shopproduct";
import cart from "~/pages/Shopcart";
import search from "~/pages/Search";
import profile from "~/pages/Profile";
// public routers
const publicRoutes = [
  { path: "/", component: Homepage },
  { path: "/login", component: login, layout: null },
  { path: "/search", component: search, layout: null },
  { path: "/product", component: product, layout: HeaderOnly },
  { path: "/cart", component: cart, layout: HeaderOnly },
  { path: "/profile", component: profile, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
