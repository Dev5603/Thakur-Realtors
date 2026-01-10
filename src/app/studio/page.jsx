"use client";
import "./studio.css";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";
import BrochurePopup from "@/components/BrochurePopup/BrochurePopup";
import { supabase } from "@/lib/supabase";

const page = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [deliveredProjects, setDeliveredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    
    const { data: ongoing, error: ongoingError } = await supabase
      .from("projects")
      .select("*")
      .eq("status", true)
      .order("created_at", { ascending: false });

    const { data: delivered, error: deliveredError } = await supabase
      .from("projects")
      .select("*")
      .eq("status", false)
      .order("created_at", { ascending: false });

    if (!ongoingError) setOngoingProjects(ongoing || []);
    if (!deliveredError) setDeliveredProjects(delivered || []);
    
    setLoading(false);
  };

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
              {loading ? (
                <p className="loading-text">Loading projects...</p>
              ) : ongoingProjects.length === 0 ? (
                <p className="empty-text">No ongoing projects found.</p>
              ) : (
                ongoingProjects.map((project) => (
                  <div key={project.id} className="project-card" onClick={() => handleCardClick(project)}>
                    <div className="project-card-img">
                      <img src={project.image_url} alt={project.name} />
                    </div>
                    <div className="project-card-info">
                      <h3>{project.name}</h3>
                      <p>{project.location}</p>
                    </div>
                  </div>
                ))
              )}
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
              {loading ? (
                <p className="loading-text">Loading projects...</p>
              ) : deliveredProjects.length === 0 ? (
                <p className="empty-text">No delivered projects found.</p>
              ) : (
                deliveredProjects.map((project) => (
                  <div key={project.id} className="project-card project-card-static">
                    <div className="project-card-img">
                      <img src={project.image_url} alt={project.name} />
                    </div>
                    <div className="project-card-info">
                      <h3>{project.name}</h3>
                      <p>{project.location}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <CTAWindow
          img="/studio/about-cta-window.jpg"
          header="The Archive"
          callout="Designs that speak through form"
          description="Each project tells a story material, and rhythm. Explore how ideas take shape and grow into lasting environments."
        />
      </div>
      <ConditionalFooter />
      <BrochurePopup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        projectName={selectedProject?.name}
        projectImg={selectedProject?.image_url}
        brochureUrl={selectedProject?.brochure_url}
      />
    </>
  );
};

export default page;
