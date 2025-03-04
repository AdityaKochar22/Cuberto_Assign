import './App.css';
import React, { useEffect, useRef } from 'react';
import letterLogo from './letter.png';
import circleVideo from './video.mp4';
import ThreeD_W from './ThreeD_W';
import { HashRouter as Router } from 'react-router-dom';
import WaveBackground from './WaveBackground';
import ProjectGallery from './components/ProjectGallery';

function App() {
  const videoRef = useRef(null);
  const firstPageRef = useRef(null);
  const projectsPageRef = useRef(null);
  const contactPageRef = useRef(null);

  useEffect(() => {
    // Ensure video plays
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play error:", error);
      });
    }

    // Updated Intersection Observer for bi-directional animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class when entering viewport
          entry.target.classList.add('visible');
        } else {
          // Remove visible class when leaving viewport
          entry.target.classList.remove('visible');
          // Reset the animation by removing and adding the class
          void entry.target.offsetWidth; // Trigger reflow
        }
      });
    }, observerOptions);

    // Observe all page sections
    [firstPageRef, projectsPageRef, contactPageRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <div>
        {/* First Page */}
        <div ref={firstPageRef} className="page-section app-container">
          <main className="main-content">
            <div className="left-section">
              <div className="logo-container">
                <img 
                  src={letterLogo} 
                  alt="Cuberto Logo" 
                  className="cuberto-logo"
                />
              </div>
            </div>
            
            <div className="right-section">
              <div className="text-content">
                <h1 className="heading">
                  <div className="heading-line">We are a digital</div>
                  <div className="heading-line">
                    <span className="oval-video-container">
                      <video 
                        ref={videoRef}
                        src={circleVideo}
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="oval-video"
                        onError={(e) => console.error("Video error:", e)}
                      >
                      </video>
                    </span>
                    design and
                  </div>
                  <div className="heading-line">motion agency</div>
                </h1>
                
                <button className="what-we-do-button">
                  What we do
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* Projects Page */}
        <div ref={projectsPageRef} className="page-section projects-page">
          <div className="projects-header">
            <div className="scroll-wrapper">
              {/* First copy of the text */}
              <div className="header-text">
                <span className="text-with-video">Inspo</span>
                <span className="green-circle">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="circle-video"
                  >
                    <source src={circleVideo} type="video/mp4" />
                  </video>
                </span>
                <span className="text-end">New Day </span>
              </div>
              {/* Second copy of the text for seamless loop */}
              <div className="header-text">
                <span className="text-with-video"> New Inspo</span>
                <span className="green-circle">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="circle-video"
                  >
                    <source src={circleVideo} type="video/mp4" />
                  </video>
                </span>
                <span className="text-end">New Day</span>
              </div>
            </div>
          </div>
          <ProjectGallery />
        </div>

        {/* Contact Page */}
        <div ref={contactPageRef} className="page-section contact-page">
          <WaveBackground />
          <div className="contact-content">
            <h1>
              Have
              <br />
              an idea?
            </h1>
            <button className="tell-us-button">TELL US</button>
            <div className="contact-info">
              <a href="mailto:INFO@CUBERTO.COM">INFO@CUBERTO.COM</a>
              <a href="tel:+13015499309">+91 31234567</a>
            </div>
            <div className="privacy-policy">
              <a href="/privacy">PRIVACY POLICY</a>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
