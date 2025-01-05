import React from 'react';
import './Profile.css';
import circle from "../../assets/imgs/circle.png";

const Profile = () => {
    return (
        <div className="profile-container">
            <section className="profile">
                <div className="profile-title">학력/경력</div>
                <div className="profile-content">
                    <div className="profile-group">
                        <p className="content-title">가천대학교</p>
                        <p className="content-title">AI·소프트웨어학부 학사</p>
                        <p>학점 4.36/4.5</p>
                        <p>2024.03 - 재학 중</p>
                    </div>
                    <div className="profile-group">
                        <p className="content-title">AIIA</p>
                        <p className="content-title">(IT 플랫폼 탐구·개발 동아리)</p>
                        <p>Flutter Unit</p>
                        <p>2024.01 - 현재</p>
                    </div>
                    <div className="profile-group">
                    <p className="content-title">한국철도기술연구원</p>
                        <p className="content-title">(Korea Railroad Research Institute)</p>
                        <p>모빌리티 서비스 앱 개발</p>
                        <p>2025.02 - 인턴(계약직) </p>
                    </div>
                </div>
            </section>
            <div className="circle-image-container">
                <img src={circle} className="circle-image" />
            </div>
        </div>
    );
};

export default Profile;