import React from 'react';
import { motion } from 'framer-motion';
import './InstructionsGuide.css';

const InstructionsGuide = ({ steps }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each item will appear 0.2s after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="instructions-guide">
      <h3 className="guide-title">Comment ça marche ?</h3>
      <motion.ol 
        className="steps-list"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => (
          <motion.li key={index} className="step-item" variants={itemVariants}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-text">
              <strong>{step.title}:</strong> {step.description}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
};

export default InstructionsGuide;
