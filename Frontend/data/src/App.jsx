import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";

import Home from "./Home";
import Weather from "./Weather";
import Todo from "./Todo";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            MAIN PORTFOLIO
        ========================= */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            PROJECTS
        ========================= */}
        <Route
          path="/weather"
          element={<Weather />}
        />

        <Route
          path="/todo"
          element={<Todo />}
        />


        {/* =========================
            UNKNOWN URL
        ========================= */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;