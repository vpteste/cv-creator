import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faGraduationCap, faLightbulb, faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faHeart, faArrowLeft, faStar, faTrophy, faCertificate, faCog, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './PreviewPanel.css';

const LanguageBar = ({ name, level }) => (
  <div className="language-bar">
    <span className="language-name">{name}</span>
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${level * 20}%` }}></div>
    </div>
  </div>
);

const TimelineItem = ({ title, subtitle, date, children }) => (
  <div className="timeline-item">
    <div className="timeline-dot"></div>
    <div className="timeline-content">
      <div className="timeline-header">
        <h4 className="timeline-title">{title}</h4>
        <span className="timeline-date">{date}</span>
      </div>
      <h5 className="timeline-subtitle">{subtitle}</h5>
      <div className="timeline-description">{children}</div>
    </div>
  </div>
);

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

const PreviewPanel = ({ cvData, template, onToggleMobileView, zoom, onZoomIn, onZoomOut }) => {
  const { 
    name, title, email, phone, address, photo, headerLayout, 
    profile, showProfile, experience, education, skills, languages, interests,
    strengths, achievements, certifications, // Destructure new sections
    font, titleFontSize, bodyFontSize, 
    backgroundColor, textColor, headerColor, sidebarColor, sidebarTextColor, // Destructure colors from cvData
    bandColor, showBands, showIcons, showEmojis 
  } = cvData;

  const handleBackClick = () => {
    onToggleMobileView();
  }

  const bodyStyle = {
    fontFamily: font,
    fontSize: `${bodyFontSize}px`,
    backgroundColor: backgroundColor,
    color: textColor
  };

  const renderContent = () => {
    if (template && template.layout === 'two-column') {
      return (
        <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
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
    } else if (template && template.layout === 'two-column-curve') {
      return (
        <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div id="cv-preview" className="a4-preview" style={bodyStyle}>
            <div className="cv-container-curve">
              <header className="header-curve" style={{ backgroundColor: sidebarColor }}>
                <div className="header-curve-left">
                  {photo && <div className="profile-photo-curve"><img src={photo} alt="Profile"/></div>}
                </div>
                <div className="header-curve-right">
                  <h1 style={{ color: headerColor }}>{name}</h1>
                  <h2 style={{ color: textColor, opacity: 0.8 }}>{title}</h2>
                </div>
                <div className="curve-svg-container">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 C60,100 40,0 100,0 L100,100 Z" fill="white" />
                  </svg>
                </div>
              </header>
              <div className="content-curve">
                <aside className="sidebar-curve" style={{ backgroundColor: sidebarColor, color: sidebarTextColor }}>
                  <CvSection title="COORDONNÉES" icon={faUser} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <p><FontAwesomeIcon icon={faPhone} /> {phone}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> {email}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</p>
                  </CvSection>
                  <CvSection title="LANGUES" icon={faGlobe} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    {languages.map(lang => <LanguageBar key={lang.id} name={lang.name} level={lang.level} />)}
                  </CvSection>
                  <CvSection title="COMPÉTENCES" icon={faLightbulb} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar">
                      {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                    </ul>
                  </CvSection>
                  <CvSection title="CENTRES D'INTÉRÊT" icon={faHeart} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar">
                      {interests.map(i => <li key={i.id}>{i.name}</li>)}
                    </ul>
                  </CvSection>
                </aside>
                <main className="main-content-curve" style={{ color: textColor }}>
                  <div className="timeline-container">
                    <CvSection title="FORMATION" icon={faGraduationCap} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                      {education.map(edu => (
                        <TimelineItem key={edu.id} title={edu.degree} subtitle={edu.school} date={edu.period} />
                      ))}
                    </CvSection>
                    <CvSection title="EXPÉRIENCE PROFESSIONNELLE" icon={faBriefcase} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                      {experience.map(exp => (
                        <TimelineItem key={exp.id} title={exp.title} subtitle={exp.company} date={exp.period}>
                          <p>{exp.description}</p>
                        </TimelineItem>
                      ))}
                    </CvSection>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template && template.layout === 'two-column-reversed') {
      return (
        <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div id="cv-preview" className="a4-preview" style={bodyStyle}>
            <div className="cv-container-bicolor reversed">
              <aside className="sidebar" style={{ backgroundColor: sidebarColor, color: sidebarTextColor }}>
                {photo && <div className="profile-photo-rect"><img src={photo} alt="Profile"/></div>}
                <CvSection title="COMPÉTENCES" icon={faLightbulb} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                  <ul className="skills-list-sidebar">
                    {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                  </ul>
                </CvSection>
                {strengths && 
                  <CvSection title="POINTS FORTS" icon={faStar} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar">
                      {strengths.map(s => <li key={s.id}>{s.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {achievements && 
                  <CvSection title="RÉUSSITES" icon={faTrophy} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar">
                      {achievements.map(a => <li key={a.id}>{a.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {interests && 
                  <CvSection title="CENTRES D'INTÉRÊT" icon={faHeart} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar">
                      {interests.map(i => <li key={i.id}>{i.name}</li>)}
                    </ul>
                  </CvSection>
                }
              </aside>
              <main className="main-content" style={{ color: textColor }}>
                <div className="header-reversed">
                  <h1 style={{ color: '#000000' }}>{name}</h1>
                  <h2 style={{ color: headerColor }}>{title}</h2>
                  <div className="contact-info-reversed">
                    <span><FontAwesomeIcon icon={faPhone} /> {phone}</span>
                    <span><FontAwesomeIcon icon={faEnvelope} /> {email}</span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {address}</span>
                  </div>
                </div>
                {showProfile && <CvSection title="PROFIL PROFESSIONNEL" icon={faUser} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}><p>{profile}</p></CvSection>}
                <CvSection title="EXPÉRIENCE PROFESSIONNELLE" icon={faBriefcase} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                  {experience.map(exp => (
                    <div key={exp.id} className="item-entry">
                      <h4 style={{color: headerColor, fontSize: '16px'}}>{exp.title}</h4>
                      <h5 style={{ fontStyle: 'italic', margin: '5px 0' }}>{exp.company} | {exp.period}</h5>
                      <p>{exp.description}</p>
                    </div>
                  ))}
                </CvSection>
                <CvSection title="FORMATION" icon={faGraduationCap} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                  {education.map(edu => (
                    <div key={edu.id} className="item-entry">
                      <h4 style={{color: headerColor, fontSize: '16px'}}>{edu.degree}</h4>
                      <h5 style={{ fontStyle: 'italic', margin: '5px 0' }}>{edu.school} | {edu.period}</h5>
                    </div>
                  ))}
                </CvSection>
                {certifications && 
                  <CvSection title="COURS ET CERTIFICATIONS" icon={faCertificate} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                    <ul className="certifications-list">
                      {certifications.map(c => <li key={c.id}>{c.name}</li>)}
                    </ul>
                  </CvSection>
                }
              </main>
            </div>
          </div>
        </div>
      );
    } else if (template && template.layout === 'two-column-right-sidebar') {
      return (
        <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div id="cv-preview" className="a4-preview" style={bodyStyle}>
            <div className="cv-container-bicolor">
              <main className="main-content" style={{ color: textColor, width: '65%' }}>
                <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                  <h1 style={{ color: headerColor, fontSize: '36px', fontWeight: 'bold', margin: '0' }}>{name}</h1>
                  <h2 style={{ color: textColor, fontSize: '20px', fontWeight: 'normal', margin: '5px 0' }}>{title}</h2>
                </div>
                {showProfile && <CvSection title="À PROPOS DE MOI" icon={faUser} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}><p>{profile}</p></CvSection>}
                <CvSection title="EXPÉRIENCE" icon={faBriefcase} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                  {experience.map(exp => (
                    <div key={exp.id} className="item-entry" style={{ display: 'flex', marginBottom: '15px' }}>
                      <div style={{ width: '100px', color: '#888' }}>{exp.period}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{color: headerColor, fontSize: '16px', fontWeight: 'bold'}}>{exp.company}</h4>
                        <h5 style={{ fontStyle: 'italic', margin: '2px 0 5px 0' }}>{exp.title}</h5>
                        <p style={{ fontSize: '14px' }}>{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </CvSection>
                <CvSection title="FORMATION" icon={faGraduationCap} showIcons={showIcons} titleColor={headerColor} titleFontSize={titleFontSize}>
                  {education.map(edu => (
                    <div key={edu.id} className="item-entry" style={{ display: 'flex', marginBottom: '15px' }}>
                      <div style={{ width: '100px', color: '#888' }}>{edu.period}</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{color: headerColor, fontSize: '16px', fontWeight: 'bold'}}>{edu.degree}</h4>
                        <h5 style={{ fontStyle: 'italic', margin: '2px 0 5px 0' }}>{edu.school}</h5>
                      </div>
                    </div>
                  ))}
                </CvSection>
                <div style={{ 
                  position: 'absolute', 
                  left: '-20px', 
                  bottom: '150px',
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'left top',
                  color: '#ccc',
                  fontSize: '10px',
                  whiteSpace: 'nowrap'
                }}>
                  Images non incluses
                </div>
              </main>
              <aside className="sidebar" style={{ backgroundColor: sidebarColor, color: sidebarTextColor, width: '35%', padding: '30px' }}>
                {photo && (
                  <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 30px auto' }}>
                    <img src={photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                  </div>
                )}
                <CvSection title="CONTACT" icon={faPhone} showIcons={false} titleColor={sidebarTextColor} layout="sidebar">
                  <div className="contact-info-sidebar" style={{ fontSize: '14px' }}>
                    <p><FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} /> {phone}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} /> {email}</p>
                    <p><FontAwesomeIcon icon={faGlobe} style={{ marginRight: '10px' }} /> {address} </p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px' }} /> {address}</p>
                  </div>
                </CvSection>
                {skills && skills.length > 0 &&
                  <CvSection title="COMPÉTENCES" icon={faLightbulb} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {skills.map(skill => <li key={skill.id} style={{ marginBottom: '5px' }}>{skill.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {languages && languages.length > 0 &&
                  <CvSection title="LANGUES" icon={faGlobe} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {languages.map(lang => <li key={lang.id} style={{ marginBottom: '5px' }}>{lang.name} ({lang.level})</li>)}
                    </ul>
                  </CvSection>
                }
                {interests && interests.length > 0 &&
                  <CvSection title="CENTRES D'INTÉRÊT" icon={faHeart} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {interests.map(i => <li key={i.id} style={{ marginBottom: '5px' }}>{i.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {strengths && strengths.length > 0 &&
                  <CvSection title="POINTS FORTS" icon={faStar} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {strengths.map(s => <li key={s.id} style={{ marginBottom: '5px' }}>{s.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {achievements && achievements.length > 0 &&
                  <CvSection title="RÉUSSITES" icon={faTrophy} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {achievements.map(a => <li key={a.id} style={{ marginBottom: '5px' }}>{a.name}</li>)}
                    </ul>
                  </CvSection>
                }
                {certifications && certifications.length > 0 &&
                  <CvSection title="CERTIFICATIONS" icon={faCertificate} showIcons={showIcons} titleColor={sidebarTextColor} layout="sidebar">
                    <ul className="skills-list-sidebar" style={{ listStyle: 'none', padding: 0 }}>
                      {certifications.map(c => <li key={c.id} style={{ marginBottom: '5px' }}>{c.name}</li>)}
                    </ul>
                  </CvSection>
                }
              </aside>
            </div>
          </div>
        </div>
      );
    
    

    // Fallback to original layout
    const headerTitleStyle = { color: headerColor || '#333333', fontSize: `${titleFontSize}px` };
    const headerSubtitleStyle = { color: headerColor || '#333333', fontSize: `${titleFontSize * 0.6}px`, opacity: 0.8 };

    return (
      <div className="a4-wrapper" style={{ transform: `scale(${zoom})` }}>
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

  return (
    <div className="preview-panel-container">
      <button className="mobile-back-btn" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Éditeur</span>
      </button>
      <div className="mobile-zoom-controls">
        <button onClick={onZoomOut}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={onZoomIn}>+</button>
      </div>
      {renderContent()}
    </div>
  );
};

export default PreviewPanel;
