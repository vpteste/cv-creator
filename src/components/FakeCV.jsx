import React from 'react';
import './FakeCV.css';

const FakeCV = ({ sidebarColor, headerColor, textColor }) => {
  return (
    <div className="fake-cv">
      <div className="fake-sidebar" style={{ backgroundColor: sidebarColor }}>
        <div className="fake-photo" style={{ backgroundColor: headerColor, opacity: 0.5 }}></div>
        <div className="fake-line long" style={{ backgroundColor: textColor, opacity: 0.2 }}></div>
        <div className="fake-line short" style={{ backgroundColor: textColor, opacity: 0.2 }}></div>
        <div className="fake-line long" style={{ backgroundColor: textColor, opacity: 0.2, marginTop: '30px' }}></div>
        <div className="fake-line short" style={{ backgroundColor: textColor, opacity: 0.2 }}></div>
      </div>
      <div className="fake-main">
        <div className="fake-line long" style={{ backgroundColor: headerColor, height: '12px' }}></div>
        <div className="fake-line short" style={{ backgroundColor: headerColor, height: '12px', width: '40%', marginBottom: '30px' }}></div>
        <div className="fake-line long" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
        <div className="fake-line long" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
        <div className="fake-line short" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
        <div className="fake-line long" style={{ backgroundColor: textColor, opacity: 0.3, marginTop: '30px' }}></div>
        <div className="fake-line short" style={{ backgroundColor: textColor, opacity: 0.3 }}></div>
      </div>
    </div>
  );
};

export default FakeCV;
