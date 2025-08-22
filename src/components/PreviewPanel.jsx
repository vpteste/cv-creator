
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faGraduationCap, faLightbulb, faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faHeart, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './PreviewPanel.css';

const CvSection = ({ title, icon, showIcons, titleColor, children, layout = 'default', titleFontSize }) => {

  const titleStyle = {
    color: titleColor,
    fontSize: layout === 'sidebar' ? '16px' : `${titleFontSize * 0.6}px`,
    borderBottom: layout === 'sidebar' ? '1px solid #fff' : `2px solid ${titleColor}`,
    paddingBottom: layout === 'sidebar' ? '5px' : '5px',
    marginBottom: layout === 'sidebar' ? '10px' : '15px',
    textTransform: layout === 'sidebar' ? 'uppercase' : 'none',
  };

  const titleContent = (
    <>
      {showIcons && <FontAwesomeIcon icon={icon} className="section-icon" />}
      {title}
    </>
  );

  return (
    <section className={layout === 'sidebar' ? "cv-section-sidebar" : "cv-section"}>
      <h3 style={titleStyle}>{titleContent}</h3>
      <div className={layout === 'sidebar' ? "section-content-sidebar" : "section-content"}>{children}</div>
    </section>
  );
};

const PreviewPanel = ({ cvData, template, onToggleMobileView }) => {
  const { 
    name, title, email, phone, address, photo, headerLayout, 
    profile, showProfile, experience, education, skills, languages, interests,
    font, titleFontSize, bodyFontSize, 
    backgroundColor, textColor, headerColor, sidebarColor, sidebarTextColor, // Destructure colors from cvData
    bandColor, showBands, showIcons, showEmojis 
  } = cvData;

  const bodyStyle = {
    fontFamily: font,
    fontSize: `${bodyFontSize}px`,
    backgroundColor: backgroundColor,
    color: textColor
  };

  if (template && template.layout === 'two-column') {
    return (
      <div className="preview-panel-container">
        <button className="mobile-back-btn" onClick={onToggleMobileView}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Éditeur</span>
        </button>
        <div id="cv-preview" className="a4-preview" style={bodyStyle}>
          <div className="cv-container-bicolor">
            <aside className="sidebar" style={{ backgroundColor: sidebarColor, color: sidebarTextColor }}>
              {photo && <div className="profile-photo-bicolor"><img src={photo} alt="Profile"/></div>}
              <div className="contact-info-bicolor">
                <h1 style={{ color: headerColor, fontSize: '32px', margin: '10px 0 0 0' }}>{name}</h1>
                <h2 style={{ color: sidebarTextColor, fontSize: '18px', fontWeight: 'normal', margin: '5px 0 15px 0', opacity: 0.9 }}>{title}</h2>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</p>
                <p><FontAwesomeIcon icon={faPhone} /> {phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> {email}</p>
              </div>
              <CvSection title="Compétences" icon={faLightbulb} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                <ul className="skills-list-sidebar">
                  {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                </ul>
              </CvSection>
              {languages && 
                <CvSection title="Langues" icon={faGlobe} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                  <ul className="languages-list-sidebar">
                    {languages.map(lang => <li key={lang.id}><strong>{lang.name}:</strong> {lang.level}</li>)}
                  </ul>
                </CvSection>
              }
            </aside>
            <main className="main-content" style={{ color: textColor }}>
              {showProfile && <CvSection title="Profil Professionnel" icon={faUser} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}><p>{profile}</p></CvSection>}
              <CvSection title="Parcours Professionnel" icon={faBriefcase} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                {experience.map(exp => (
                  <div key={exp.id} className="item-entry">
                    <h4 style={{color: headerColor, fontSize: '16px'}}>{exp.title}</h4>
                    <h5 style={{ fontStyle: 'italic', margin: '5px 0' }}>{exp.company} | {exp.period}</h5>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </CvSection>
              <CvSection title="Formation" icon={faGraduationCap} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                {education.map(edu => (
                  <div key={edu.id} className="item-entry">
                    <h4 style={{color: headerColor, fontSize: '16px'}}>{edu.degree}</h4>
                    <h5 style={{ fontStyle: 'italic', margin: '5px 0' }}>{edu.school} | {edu.period}</h5>
                  </div>
                ))}
              </CvSection>
              {interests && 
                <CvSection title="Centres d'intérêt" icon={faHeart} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                  <ul className="interests-list">
                    {interests.map(interest => <li key={interest.id}>{interest.name}</li>)}
                  </ul>
                </CvSection>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to original layout
  const headerTitleStyle = { color: headerColor || '#333333', fontSize: `${titleFontSize}px` };
  const headerSubtitleStyle = { color: headerColor || '#333333', fontSize: `${titleFontSize * 0.6}px`, opacity: 0.8 };

  return (
    <div className="preview-panel-container">
      <button className="mobile-back-btn" onClick={onToggleMobileView}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Éditeur</span>
      </button>
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
              titleColor={headerColor}
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
            titleColor={headerColor}
            titleFontSize={titleFontSize}
          >
            {experience.map(exp => (
              <div key={exp.id} className="item-entry">
                <h4 style={{color: headerColor}}>{exp.title}</h4>
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
            titleColor={headerColor}
            titleFontSize={titleFontSize}
          >
            {education.map(edu => (
              <div key={edu.id} className="item-entry">
                <h4 style={{color: headerColor}}>{edu.degree}</h4>
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
            titleColor={headerColor}
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
