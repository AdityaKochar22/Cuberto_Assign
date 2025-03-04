import React from 'react';
import bgVideo from './3d.mp4'; // Make sure to add your video file

const WaveBackground = () => {
  return (
    <div className="wave-background">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay"></div>
    </div>
  );
};

export default WaveBackground; 