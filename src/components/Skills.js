import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/bg.jpg";

export const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      // Lekérdezés a 'skills' gyűjteményből a képekért
      const skillsCollection = collection(db, 'skills');
      const skillsSnapshot = await getDocs(skillsCollection);
      const skillsList = skillsSnapshot.docs.map(doc => doc.data());
      setSkills(skillsList);

      // Lekérdezés a 'skill' gyűjteményből a leírásért
      const skillCollection = collection(db, 'skill');
      const skillSnapshot = await getDocs(skillCollection);
      const descriptionDoc = skillSnapshot.docs.find(doc => doc.id === 'description');
      if (descriptionDoc) {
        setDescription(descriptionDoc.data().text);
      }
    };

    fetchSkills();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>{description}</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                {skills.map((skill, index) => (
                  <div className="item" key={index}>
                    <img src={skill.image} alt="Image" />
                    <h5>{skill.skill}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};
