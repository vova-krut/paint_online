import React from "react";
import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/Toolbar";
import "./style/app.scss";

const App = () => {
    return (
        <div className="app">
            <SettingsBar />
            <ToolBar />
            <Canvas />
        </div>
    );
};

export default App;
