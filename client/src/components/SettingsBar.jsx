import React from "react";
import toolState from "../store/toolState";
import "../style/toolbar.scss";

const SettingsBar = () => {
    return (
        <div className="settingsbar">
            <label style={{ margin: "0 5px" }} htmlFor="line-width">
                Line width
            </label>
            <input
                onChange={(e) => toolState.setLineWidth(e.target.value)}
                style={{ margin: "0 10px" }}
                id="line-width"
                type="number"
                defaultValue={1}
                min={1}
                max={50}
            />
        </div>
    );
};

export default SettingsBar;
