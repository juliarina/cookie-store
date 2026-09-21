import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import { ScrollToTop } from "./components/ScrollToTop"
import { RequireAuth } from "./components/auth/RequireAuth"
import { AuthProvider } from "./context/AuthProvider"
import { BagProvider } from "./context/BagProvider"
import { OrderProvider } from "./context/OrderProvider"
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import CookieDetail from "./pages/CookieDetail"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import Orders from "./pages/Orders"
import Register from "./pages/Register"
import Settings from "./pages/Settings"

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <BagProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="menu/:id" element={<CookieDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route
                  path="orders"
                  element={
                    <RequireAuth>
                      <Orders />
                    </RequireAuth>
                  }
                />
                <Route
                  path="settings"
                  element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  }
                />
                <Route
                  path="checkout"
                  element={
                    <RequireAuth>
                      <Checkout />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BagProvider>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App