import React from "react";
import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/Toolbar";
import "./style/app.scss";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route
                path="/:id"
                element={
                    <>
                        <div className="app">
                            <SettingsBar />
                            <ToolBar />
                            <Canvas />
                        </div>
                    </>
                }
            ></Route>
        </Routes>
    );
};

export default App;
