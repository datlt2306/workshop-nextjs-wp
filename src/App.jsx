import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DemoUseEffect from "./pages/demo-useEffect";
import DemoReactQuery from "./pages/demo-reactQuery";
function App() {
    return (
        <>
            <Routes>
                <Route path="client-state" element={<DemoUseEffect />} />
                <Route path="server-state" element={<DemoReactQuery />} />
            </Routes>
        </>
    );
}

export default App;
