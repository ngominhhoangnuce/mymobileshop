import { HeaderOnly } from "src/components/Layout";
import Homepage from "~/pages/Homepage";
import Login from "~/pages/Login";
import ProductDetail from "~/pages/ProductDetail";
import Cart from "~/pages/Shopcart";
import Profile from "~/pages/Profile";

// public routers
const publicRoutes = [
  { path: "/", component: Homepage },
  { path: "/login", component: Login, layout: null },
  { path: "/product/:productId", component: ProductDetail, layout: HeaderOnly },
  { path: "/cart", component: Cart, layout: HeaderOnly },
  { path: "/profile", component: Profile, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
