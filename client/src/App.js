import React from "react";
import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import ToolBar from "./components/Toolbar";
import "./style/app.scss";

const App = () => {
    return (
        <div className="app">
            <ToolBar />
            <SettingsBar />
            <Canvas />
        </div>
    );
};

export default App;
