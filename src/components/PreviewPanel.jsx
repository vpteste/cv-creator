
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faGraduationCap, faLightbulb, faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faHeart, faArrowLeft, faStar, faTrophy, faCertificate } from '@fortawesome/free-solid-svg-icons';
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

const PreviewPanel = ({ cvData, template, onToggleMobileView }) => {
  const { 
    name, title, email, phone, address, photo, headerLayout, 
    profile, showProfile, experience, education, skills, languages, interests,
    strengths, achievements, certifications, // Destructure new sections
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
  } else if (template && template.layout === 'two-column-curve') {
    return (
      <div className="preview-panel-container">
        <button className="mobile-back-btn" onClick={onToggleMobileView}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Éditeur</span>
        </button>
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
      <div className="preview-panel-container">
        <button className="mobile-back-btn" onClick={onToggleMobileView}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Éditeur</span>
        </button>
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
  } else if (template && template.layout === 'modern-orange') {
  const { borderColor, bandColor, headerColor, showEmojis, backgroundColor, textColor, font, bodyFontSize } = cvData;

  return (
    <div className="preview-panel-container">
      <button className="mobile-back-btn" onClick={onToggleMobileView}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Éditeur</span>
      </button>
      <div id="cv-preview" className="a4-preview modern-orange" style={{ fontFamily: font, fontSize: `${bodyFontSize}px`, backgroundColor: backgroundColor, color: textColor, border: `10px solid ${borderColor}` }}>
        <div className="mo-decorative-shapes">
          <div className="mo-circle1" style={{backgroundColor: bandColor}}></div>
          <div className="mo-curve1" style={{backgroundColor: bandColor}}></div>
        </div>
        <header className="mo-header">
          <div className="mo-header-left">
            <h1>{name}</h1>
            <h2 style={{ color: headerColor }}>{title}</h2>
            <div className="mo-contact-info">
              <span><FontAwesomeIcon icon={faPhone} style={{ color: headerColor }} /> {phone}</span>
              <span><FontAwesomeIcon icon={faEnvelope} style={{ color: headerColor }} /> {email}</span>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: headerColor }} /> {address}</span>
            </div>
            <p>{profile}</p>
          </div>
          <div className="mo-header-right" style={{borderColor: borderColor}}>
            {photo && <img src={photo} alt="Profile" />}
          </div>
        </header>
        <div className="mo-body">
          <main className="mo-main">
            <section className="mo-section">
              <h3 style={{color: headerColor}}><FontAwesomeIcon icon={faBriefcase} /> Expérience professionnelle {showEmojis && '💼'}</h3>
              {experience.map(exp => (
                <div key={exp.id} className="mo-item">
                  <div className="mo-item-left">
                    <h4>{exp.title}</h4>
                    <h5>{exp.company}</h5>
                    <ul>
                      {exp.description.split('\n').map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                  <div className="mo-item-right">
                    <span>{exp.period}</span>
                  </div>
                </div>
              ))}
            </section>
            <section className="mo-section">
              <h3 style={{color: headerColor}}><FontAwesomeIcon icon={faGraduationCap} /> Diplômes et formations {showEmojis && '🎓'}</h3>
              {education.map(edu => (
                <div key={edu.id} className="mo-item">
                  <div className="mo-item-left">
                    <h4>{edu.degree}</h4>
                    <h5>{edu.school}</h5>
                  </div>
                  <div className="mo-item-right">
                    <span>{edu.period}</span>
                  </div>
                </div>
              ))}
            </section>
          </main>
          <aside className="mo-sidebar">
            <section className="mo-sidebar-section">
              <h4 style={{ color: headerColor }}>Certificats {showEmojis && '📜'}</h4>
              <ul>
                {certifications.map(cert => <li key={cert.id}>{cert.name}</li>)}
              </ul>
            </section>
            <section className="mo-sidebar-section">
              <h4 style={{ color: headerColor }}>Compétences {showEmojis && '💡'}</h4>
              <ul>
                {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
              </ul>
            </section>
            <section className="mo-sidebar-section">
              <h4 style={{ color: headerColor }}>Langues {showEmojis && '🌐'}</h4>
              <ul>
                {languages.map(lang => <li key={lang.id}>{lang.name} ({lang.level})</li>)}
              </ul>
            </section>
            <section className="mo-sidebar-section">
              <h4 style={{ color: headerColor }}>Centres d'intérêt {showEmojis && '❤️'}</h4>
              <ul>
                {interests.map(interest => <li key={interest.id}>{interest.name}</li>)}
              </ul>
            </section>
          </aside>
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
