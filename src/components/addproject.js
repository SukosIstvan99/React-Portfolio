import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { firestore } from '../firebase/firebaseConfig';
import 'animate.css';

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = firestore.collection('projects');
      const snapshot = await projectsCollection.get();
      const projectsData = snapshot.docs.map(doc => doc.data());
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <div>
              <h2>Projects</h2>
              <p>Lorem Ipsum...</p>
              <Row>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    imgUrl={project.imgUrl}
                  />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};
