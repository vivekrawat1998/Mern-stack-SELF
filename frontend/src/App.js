import Home from "../src/components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "../src/components/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

