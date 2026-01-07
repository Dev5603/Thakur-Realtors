"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>All spaces begin with intention</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;25</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>Reach Us On</p>
                    <p>info@thakurrealtors.com</p>
                    <p>+91 98330‑68888 / 88984-08888</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Office Address</p>
                    <p>606, Insignia, Plot No.195</p>
                    <p>sec-19, Ulwe - 410206</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Sales Lounge</p>
                    <p>Shop No.2, Thakur Emerald, Plot No.66</p>
                    <p>sec-8, Pushpak Nagar - 410206</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Social</p>
                    <a href="https://www.facebook.com/profile.php?id=61581734755828" target="_blank"><p style={{ color: "white" }}>Facebook</p></a>
                    <a href="https://www.instagram.com/thakur.realtors/" target="_blank"><p style={{ color: "white" }}>Instagram</p></a>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="/contact/contact.webp"
                  alt="Terrene studio workspace"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
