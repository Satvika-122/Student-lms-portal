import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = ({ showContent = true }) => {
  const collageImages = [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
  ];

  return (
    <div className="hero-section">
      {/* Collage Background Grid */}
      <div className="hero-collage">
        {collageImages.map((img, index) => (
          <div key={index} className="hero-collage-item">
            <img
              src={img}
              alt={`Collage ${index + 1}`}
              className="hero-collage-img"
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="hero-overlay"></div>

      {/* Center Content - Only show if showContent is true */}
      {showContent && (
        <div className="hero-content">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-logo-wrapper"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="hero-logo"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/128/6a82fb/ffffff?text=Logo";
              }}
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hero-heading"
          >
            Next Gen Computing And Networking
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hero-subtitle"
          >
            Research at the Edge of Computing & Networking
          </motion.p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hero-button"
          >
            Learn more
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
