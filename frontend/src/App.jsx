import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Layout from "./components/Layout";
import Test from "./pages/Test";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
}

export default App;
