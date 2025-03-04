import React, { useRef, useState } from 'react';
import project1 from '../photo3.png';
import project2 from '../photo1.png';
import project3 from '../photo6.png';
import project4 from '../photo1.png';
import project5 from '../photo3.png';

const projects = [
  { id: 1, image: project1, tag: 'Cuberto' },
  { id: 2, image: project2, tag: 'Cuberto' },
  { id: 3, image: project3, tag: 'Cuberto' },
  { id: 4, image: project4, tag: 'Cuberto' },
  { id: 5, image: project5, tag: 'Cuberto' }
];

const ProjectGallery = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const startDragging = (e) => {
    setIsDragging(true);
    setIsGrabbing(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
    setIsGrabbing(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const distance = (x - startX) * 1.5; // Increased sensitivity
    scrollRef.current.scrollLeft = scrollLeft - distance;
  };

  return (
    <div 
      className={`gallery-container ${isGrabbing ? 'grabbing' : ''}`}
      ref={scrollRef}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={onDrag}
    >
      {projects.map((project) => (
        <div 
          key={project.id} 
          className={`gallery-item ${isGrabbing ? 'grabbing' : ''}`}
        >
          <img src={project.image} alt={project.tag} />
          <div className="project-info">
            <span className="project-tag">{project.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery; 