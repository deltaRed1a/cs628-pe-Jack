
import React from 'react';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume">
      <div className="header">
        <h1>Jack Gilbert</h1>
        <p>Email: jgopssec@gmail.com</p>
      </div>

      <div className="section education">
        <h2>Education</h2>
        <h3>City University of Seattle</h3>
        <p>Master of Science in Computer Science</p>
        <h3>Texas A&M University</h3>
        <p>Bachelor of Science in IT/Economics</p>
      </div>

      <div className="section skills">
        <h2>Skills</h2>
        <ul>
          <li>React, JavaScript, Python</li>
          <li>Penetration Testing & AI Security</li>
          <li>Git, GitHub, Command Line</li>
        </ul>
      </div>

      <div className="section experience">
        <h2>Experience</h2>
        <h3>Senior AI Penetration Tester - Microsoft</h3>
        <ul>
          <li>Led offensive AI security assessments</li>
          <li>Developed internal red teaming tools</li>
        </ul>
      </div>

      <div className="section projects">
        <h2>Projects</h2>
        <h3>AI Copilot Security Analysis</h3>
        <p>Assessed RAI harms and model misbehavior in enterprise-grade AI copilots.</p>
        <h3>PyRIT Automation Framework</h3>
        <p>Built AI security automation tooling to assist red teams.</p>
      </div>
    </div>
  );
};

export default Resume;
