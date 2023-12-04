import { Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";

import { Toaster } from "react-hot-toast";

import "./App.css";
import { useContext } from "react";
import { UserContext } from "./component/Context";

function App() {
  const { userData } = useContext(UserContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
