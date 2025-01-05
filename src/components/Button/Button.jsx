import React, { useState } from "react";
import "./Button.css";

const Button = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode", !darkMode);
    };

    return (
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? "라이트모드" : "다크모드"}
        </button>
    );
};

export default Button;