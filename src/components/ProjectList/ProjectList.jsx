import React, { useState } from "react";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import projectsData from "./projects.js"; // JavaScript 파일로부터 데이터 가져오기
import "./ProjectList.css";

const ProjectList = () => {
    const [projects] = useState(projectsData); // 데이터를 상태로 설정

    return (
        <div className="project-list-container">
            <h2 className="project-title">진행 프로젝트</h2>
            <div className="project-list">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;