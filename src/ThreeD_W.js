import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const ThreeD_W = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(300, 300);
    renderer.setClearColor(0xffffff, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    // Load font and create text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
      const textGeometry = new TextGeometry('W', {
        font: font,
        size: 2.5,
        height: 0.8,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.2,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 8
      });

      textGeometry.center();

      const textMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        specular: 0x666666,
        shininess: 100,
        flatShading: false
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(textMesh);

      // Adjusted camera position
      camera.position.z = 8;

      // Animation
      let time = 0;
      function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Smooth rotation
        textMesh.rotation.y = Math.sin(time) * 0.3 + Math.PI * 0.1;
        textMesh.rotation.x = Math.sin(time * 0.5) * 0.1;
        
        renderer.render(scene, camera);
      }

      animate();
    });

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
};

export default ThreeD_W; 