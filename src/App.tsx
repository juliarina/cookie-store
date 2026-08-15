import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import { CartProvider } from "./context/CartProvider"
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Menu from "./pages/Menu"
import Register from "./pages/Register"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App