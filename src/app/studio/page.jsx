"use client";
import "./studio.css";

import { useState } from "react";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import BrochurePopup from "@/components/BrochurePopup/BrochurePopup";

const ongoingProjects = [
  { name: "THAKUR EMERALD", location: "KHARGHAR", img: "/spotlight/spotlight-img-1.jpg" },
  { name: "THAKUR NEELKAMAL", location: "DOMBIVLI", img: "/spotlight/spotlight-img-2.jpg" },
  { name: "ERAVATT", location: "UPPER KHARGHAR", img: "/spotlight/spotlight-img-3.png" },
];

const deliveredProjects = [
  { name: "SUKH SAGAR", location: "KHARGHAR", img: "/spotlight/spotlight-img-4.png" },
  { name: "THAKUR RESIDENCY", location: "KALYAN NX", img: "/spotlight/spotlight-img-5.png" },
  { name: "THAKUR HERITAGE", location: "PANVEL", img: "/spotlight/spotlight-img-6.png" },
  { name: "THAKUR PARADISE", location: "KHARGHAR", img: "/spotlight/spotlight-img-7.png", badge: "Ready Possession" },
  { name: "KSHIR SAGAR", location: "KHARGHAR", img: "/spotlight/spotlight-img-8.png", badge: "Ready Possession" },
  { name: "SAI SAGAR", location: "LONAVALA", img: "/spotlight/spotlight-img-9.png", badge: "Ready Possession" },
  { name: "THAKUR SKYVILLA", location: "KHARGHAR", img: "/spotlight/spotlight-img-10.jpeg" },
  { name: "THAKUR DEEPRAJ", location: "DOMBIVLI", img: "/spotlight/spotlight-img-11.jpeg" },
  { name: "THAKUR GALAXY", location: "PANVEL", img: "/spotlight/spotlight-img-12.jpeg" },
  { name: "THAKUR PATIO", location: "KALYAN", img: "/spotlight/spotlight-img-13.jpeg" },
];

const page = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <Nav />
      <div className="page studio">
        <div className="project-nav">
          <div className="container">
            <Copy delay={0.1}>
            <span onClick={() => scrollToSection("ongoing")} className="project-nav-link">
              Ongoing
            </span>
            </Copy>
            <Copy delay={0.1}>
            <span onClick={() => scrollToSection("delivered")} className="project-nav-link">
              Delivered
            </span>
            </Copy>
          </div>
        </div>
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  We see design as more than construction. It is an ongoing
                  dialogue between people, material, and place, shaped with
                  care, and built to endure.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  We exist to create spaces that feel honest, lived in,
                  and quietly transformative. Every project begins with
                  listening and ends with an environment.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img src="/studio/about-hero.png" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Years in the Industry</p>
                  <h2>25+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Ongoing Projects</p>
                  <h2>3+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Projects Delivered</p>
                  <h2>20+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Average Rating</p>
                  <h2>4.8 / 5</h2>
                </Copy>
              </div>
              {/* <div className="fact">
                <Copy delay={0.5}>
                  <p>Prototypes build</p>
                  <h2>724</h2>
                </Copy>
              </div> */}
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <section id="ongoing" className="projects-section">
          <div className="container">
            <div className="section-header">
              <div>
                <Copy delay={0.1}>
                  <h2 className="section-title">ONGOING PROJECTS</h2>
                </Copy>
                <Copy delay={0.15}>
                  <p className="section-subtitle">UNPARALLELED LANDMARKS, GLOBAL EXPERIENCES.</p>
                </Copy>
              </div>
            </div>
            <div className="projects-grid">
              {ongoingProjects.map((project, index) => (
                <div key={index} className="project-card" onClick={() => handleCardClick(project)}>
                  <div className="project-card-img">
                    <img src={project.img} alt={project.name} />
                  </div>
                  <div className="project-card-info">
                    <h3>{project.name}</h3>
                    <p>{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="delivered" className="projects-section">
          <div className="container">
            <div className="section-header">
              <div>
                <Copy delay={0.1}>
                  <h2 className="section-title">DELIVERED PROJECTS</h2>
                </Copy>
                <Copy delay={0.15}>
                  <p className="section-subtitle">CRAFTED WITH PRECISION, DELIVERED WITH PRIDE.</p>
                </Copy>
              </div>
            </div>
            <div className="projects-grid">
              {deliveredProjects.map((project, index) => (
                <div key={index} className="project-card project-card-static">
                  <div className="project-card-img">
                    <img src={project.img} alt={project.name} />
                    {project.badge && <span className="project-badge">{project.badge}</span>}
                  </div>
                  <div className="project-card-info">
                    <h3>{project.name}</h3>
                    <p>{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="The Archive"
          callout="Designs that speak through form"
          description="Each project tells a story material, and rhythm. Explore how ideas take shape and grow into lasting environments."
        />
        <Spotlight />
      </div>
      <ConditionalFooter />
      <BrochurePopup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        projectName={selectedProject?.name}
        projectImg={selectedProject?.img}
      />
    </>
  );
};

export default page;
