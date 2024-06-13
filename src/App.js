import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";
import { Fragment } from "react";
import { UserProvider } from "./contexts/UserContext";
import Cart from "./pages/Shopcart"; // Đảm bảo import đúng đường dẫn của Cart

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
