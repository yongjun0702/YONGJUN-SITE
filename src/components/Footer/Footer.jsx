import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Footer.css";
import Button from "../Button/Button.jsx";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-icons">
                <a
                    href="https://linkedin.com/in/yongjun0702"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon linkedin"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://github.com/yongjun0702"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon github"
                >
                    <FaGithub />
                </a>
                <a
                    href="mailto:jo46453851@gmail.com"
                    className="footer-icon email"
                >
                    <FaEnvelope />
                </a>
            </div>
            <Button />
            <p className="footer-text">2025 ⓒ YONGJUN. All rights reserved.</p>
        </footer>
    );
};

export default Footer;