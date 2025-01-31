import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import Profile from './components/Profile/Profile.jsx';
import ProjectList from './components/ProjectList/ProjectList.jsx';
import './index.css';
import Footer from "./components/Footer/Footer.jsx";

const App = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        // 스크롤 차단 및 복원
        if (step < 3) {
            document.body.classList.add('no-scroll'); // 스크롤 차단
        } else {
            document.body.classList.remove('no-scroll'); // 스크롤 복원
        }
    }, [step]);

    useEffect(() => {
        // 0.5초로 첫 번째 step
        const timeout = setTimeout(() => {
            setStep(1);

            // 1.2초 간격으로 step 증가
            const interval = setInterval(() => {
                setStep((prev) => (prev < 4 ? prev + 1 : prev));
            }, 1200);

            return () => clearInterval(interval);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="main">
            <Header step={step} />
            <div className={`fade-in ${step >= 3 ? 'visible' : ''}`}>
                <Profile />
                <ProjectList />
                <Footer />
            </div>
        </div>
    );
};

export default App;