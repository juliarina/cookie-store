import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import { RequireAuth } from "./components/auth/RequireAuth"
import { AuthProvider } from "./context/AuthProvider"
import { CartProvider } from "./context/CartProvider"
import { OrderProvider } from "./context/OrderProvider"
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
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
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
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
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App