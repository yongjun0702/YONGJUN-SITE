import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title, period, tags, description, image, details }) => {
    return (
        <div className="project-card">
            <div className="project-header">
                <span className="project-title">{title}</span>
                <span className="project-period">{period}</span>
            </div>
            <div className="project-content">
                <img src={image} alt={`${title} 이미지`} className="project-image"/>
            </div>
            <div className="project-description">
                <p>{description}</p>
            </div>
            <div className="project-tags">
                {tags.map((tag, index) => (
                    <span key={index} className="project-tag">
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCard;