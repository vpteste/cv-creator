import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faGraduationCap, faLightbulb, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './PreviewPanel.css';

const CvSection = ({ title, icon, emoji, showIcons, showEmojis, bandColor, showBands, titleColor, titleFontSize, children }) => {
  const titleStyle = { color: titleColor, fontSize: `${titleFontSize * 0.6}px` };
  const bandStyle = { backgroundColor: bandColor, color: '#fff', fontSize: `${titleFontSize * 0.6}px` };

  const titleContent = (
    <>
      {showIcons && <FontAwesomeIcon icon={icon} className="section-icon" />}
      {title}
      {showEmojis && <span className="section-emoji">{emoji}</span>}
    </>
  );

  return (
    <section className="cv-section">
      {showBands ? (
        <h3 className="band-title" style={bandStyle}>{titleContent}</h3>
      ) : (
        <h3 className="simple-title" style={{...titleStyle, borderBottomColor: titleColor }}>{titleContent}</h3>
      )}
      <div className="section-content">{children}</div>
    </section>
  );
};

const PreviewPanel = ({ cvData }) => {
  const { 
    name, title, email, phone, address, photo, headerLayout, 
    profile, showProfile, experience, education, skills,
    font, titleFontSize, bodyFontSize, backgroundColor, titleColor, textColor, 
    bandColor, showBands, showIcons, showEmojis 
  } = cvData;

  const bodyStyle = {
    fontFamily: font,
    fontSize: `${bodyFontSize}px`,
    backgroundColor: backgroundColor,
    color: textColor
  };

  const headerTitleStyle = { color: titleColor, fontSize: `${titleFontSize}px` };
  const headerSubtitleStyle = { color: titleColor, fontSize: `${titleFontSize * 0.6}px`, opacity: 0.8 };

  return (
    <div className="preview-panel-container">
      <div id="cv-preview" className="a4-preview" style={bodyStyle}>
        <header className={`cv-header layout-${headerLayout}`}>
          {photo && <div className="profile-photo"><img src={photo} alt="Profile" className="photo-img"/></div>}
          <div className="header-main">
            <h1 style={headerTitleStyle}>{name}</h1>
            <h2 style={headerSubtitleStyle}>{title}</h2>
          </div>
          <div className="contact-info" style={{color: textColor}}>
            <span><FontAwesomeIcon icon={faEnvelope} /> {email}</span>
            <span><FontAwesomeIcon icon={faPhone} /> {phone}</span>
            <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</span>
          </div>
        </header>

        <main className="cv-body">
          {showProfile && (
            <CvSection 
              title="Profil Professionnel" 
              icon={faUser} 
              emoji="👤" 
              showBands={showBands}
              showIcons={showIcons}
              showEmojis={showEmojis}
              bandColor={bandColor}
              titleColor={titleColor}
              titleFontSize={titleFontSize}
            >
              <p>{profile}</p>
            </CvSection>
          )}

          <CvSection 
            title="Expérience Professionnelle" 
            icon={faBriefcase} 
            emoji="💼" 
            showBands={showBands}
            showIcons={showIcons}
            showEmojis={showEmojis}
            bandColor={bandColor}
            titleColor={titleColor}
            titleFontSize={titleFontSize}
          >
            {experience.map(exp => (
              <div key={exp.id} className="item-entry">
                <h4 style={{color: titleColor}}>{exp.title}</h4>
                <h5>{exp.company} | {exp.period}</h5>
                <p>{exp.description}</p>
              </div>
            ))}
          </CvSection>

          <CvSection 
            title="Formation" 
            icon={faGraduationCap} 
            emoji="🎓" 
            showBands={showBands}
            showIcons={showIcons}
            showEmojis={showEmojis}
            bandColor={bandColor}
            titleColor={titleColor}
            titleFontSize={titleFontSize}
          >
            {education.map(edu => (
              <div key={edu.id} className="item-entry">
                <h4 style={{color: titleColor}}>{edu.degree}</h4>
                <h5>{edu.school} | {edu.period}</h5>
              </div>
            ))}
          </CvSection>

          <CvSection 
            title="Compétences" 
            icon={faLightbulb} 
            emoji="💡" 
            showBands={showBands}
            showIcons={showIcons}
            showEmojis={showEmojis}
            bandColor={bandColor}
            titleColor={titleColor}
            titleFontSize={titleFontSize}
          >
            <ul className="skills-list">
              {skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </CvSection>
        </main>
      </div>
    </div>
  );
};

export default PreviewPanel;