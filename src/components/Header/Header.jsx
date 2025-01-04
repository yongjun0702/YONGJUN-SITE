import React from 'react';
import './Header.css';
import { AiFillCaretRight } from "react-icons/ai";

const Header = ({ step }) => {
    return (
        <header className="header">
            <p className={`fade-in small-text ${step >= 1 ? 'visible' : ''}`}>프론트엔드 개발자</p>
            <p className={`fade-in large-text ${step >= 2 ? 'visible' : ''}`}>조용준 입니다</p>
            <p className={`fade-in small-text ${step >= 3 ? 'visible' : ''}`}>다양한 플랫폼 생태계에 대한 관심을 바탕으로</p>
            <p className={`fade-in small-text ${step >= 3 ? 'visible' : ''}`}>일상의 가치를 더하는 개발에 흥미가 있습니다.</p>
            <div className={`fade-in ${step >= 3 ? 'visible' : ''}`}>
                <a
                    href="https://drive.google.com/file/d/1FbP2zhr_jb232QxKdyv0Od4-2wTRr59D/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-button"
                >
                    <span>이력서 보러가기</span>
                    <AiFillCaretRight />
                </a>
            </div>
        </header>
    );
};

export default Header;