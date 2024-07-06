import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

import { db } from '../firebase';
import { useState, useEffect } from 'react';
import 'animate.css';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectDescription, setProjectDescription] = useState('');

  const fetchPost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProjects(newData);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

    const fetchProjectDescription = async () => {
      try {
        const docRef = doc(db, "projektdesc", "description");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectDescription(docSnap.data().text);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching project description: ", error);
      }
    };

    useEffect(() => {
      fetchPost();
      fetchProjectDescription();
    }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <div>
              <h2>Projects</h2>
              <p>{projectDescription}</p>
              <Row>
                {projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    {...project}
                  />
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  )
}
