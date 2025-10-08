import React from 'react';
import EditableField from '../EditableField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// This is a dedicated component for a specific, complex template.
// It bypasses the generic engine for maximum design fidelity.

const Star = ({ filled }) => <span className={filled ? '' : 'empty'}>★</span>;

const StarRating = ({ level }) => {
  const totalStars = 5;
  const filledStars = Math.round(level / 100 * totalStars);
  const stars = Array.from({ length: totalStars }, (_, i) => <Star key={i} filled={i < filledStars} />);
  return <div className="stars">{stars}</div>;
};

const RedBannerTemplate = ({ cvData, onUpdateField, onUpdateItem, onFieldFocus, onFieldBlur, isReadOnly }) => {
  const { name, title, photo, profile, experience, education, softwareSkills, references, passions, languages, contact } = cvData;

  return (
    <div className="cv-container template-red-top-banner">
        <div className="top-red-header"></div>

        <div className="header-main">
            <div className="profile-photo-circle">
                {photo ? <img src={photo} alt="Photo de profil" /> : <img src="https://img.icons8.com/color/48/000000/gender-neutral-user.png" alt="Photo de profil" />}
            </div>
            <div className="header-info">
                <EditableField tagName="h1" className="name-title" html={name} onChange={v => onUpdateField('name', v)} isReadOnly={isReadOnly} />
                <EditableField tagName="p" className="job-title-header" html={title} onChange={v => onUpdateField('title', v)} isReadOnly={isReadOnly} />
            </div>
        </div>

        <div className="main-content">
            <div className="left-column">
                <div className="section-left">
                    <h2>ABOUT ME</h2>
                    <EditableField tagName="p" className="about-me-text" html={profile} onChange={v => onUpdateField('profile', v)} isReadOnly={isReadOnly} />
                </div>

                <div className="section-left">
                    <h2>WORK EXPERIENCE</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="work-item">
                            <EditableField tagName="p" className="work-duration" html={exp.period} onChange={v => onUpdateItem('experience', exp.id, 'period', v)} isReadOnly={isReadOnly} />
                            <EditableField tagName="p" className="job-position" html={exp.title} onChange={v => onUpdateItem('experience', exp.id, 'title', v)} isReadOnly={isReadOnly} />
                            <EditableField tagName="p" className="company-name" html={exp.company} onChange={v => onUpdateItem('experience', exp.id, 'company', v)} isReadOnly={isReadOnly} />
                            <EditableField tagName="p" className="work-description" html={exp.description} onChange={v => onUpdateItem('experience', exp.id, 'description', v)} isReadOnly={isReadOnly} />
                        </div>
                    ))}
                </div>

                <div className="section-left">
                    <h2>SOFTWARE SKILL</h2>
                    <ul className="skill-list">
                        {softwareSkills.map(skill => (
                            <li key={skill.id}>
                                <EditableField tagName="span" html={skill.name} onChange={v => onUpdateItem('softwareSkills', skill.id, 'name', v)} isReadOnly={isReadOnly} />
                                <StarRating level={skill.level} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="section-left">
                    <h2>REFERENCE</h2>
                    <div className="reference-grid">
                        {references.map(ref => (
                            <div key={ref.id} className="reference-item">
                                <EditableField tagName="p" className="ref-name" html={ref.name} onChange={v => onUpdateItem('references', ref.id, 'name', v)} isReadOnly={isReadOnly} />
                                <EditableField tagName="p" html={ref.company} onChange={v => onUpdateItem('references', ref.id, 'company', v)} isReadOnly={isReadOnly} />
                                <EditableField tagName="p" html={ref.phone} onChange={v => onUpdateItem('references', ref.id, 'phone', v)} isReadOnly={isReadOnly} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="right-column">
                <div className="section-right">
                    <h2>EDUCATION</h2>
                    {education.map(edu => (
                        <div key={edu.id} className="education-item">
                            <EditableField tagName="p" className="edu-duration" html={edu.period} onChange={v => onUpdateItem('education', edu.id, 'period', v)} isReadOnly={isReadOnly} />
                            <EditableField tagName="p" className="edu-major" html={edu.degree} onChange={v => onUpdateItem('education', edu.id, 'degree', v)} isReadOnly={isReadOnly} />
                            <EditableField tagName="p" className="edu-school" html={edu.school} onChange={v => onUpdateItem('education', edu.id, 'school', v)} isReadOnly={isReadOnly} />
                        </div>
                    ))}
                </div>

                <div className="section-right">
                    <h2>LANGUAGE</h2>
                    {languages.map(lang => (
                        <div key={lang.id} className="language-item">
                            <EditableField tagName="span" html={lang.name} onChange={v => onUpdateItem('languages', lang.id, 'name', v)} isReadOnly={isReadOnly} />
                            <div className="language-bar-container"><div className="language-bar" style={{width: `${lang.level}%`}}></div></div>
                        </div>
                    ))}
                </div>

                <div className="section-right">
                    <h2>CONTACT</h2>
                    <div className="contact-right-item">
                        <div className="icon">📞</div>
                        <EditableField tagName="span" html={cvData.phones[0]?.number} onChange={v => onUpdateItem('phones', cvData.phones[0].id, 'number', v)} isReadOnly={isReadOnly} />
                    </div>
                    <div className="contact-right-item">
                        <div className="icon">📍</div>
                        <EditableField tagName="span" html={cvData.address} onChange={v => onUpdateField('address', v)} isReadOnly={isReadOnly} />
                    </div>
                    <div className="contact-right-item">
                        <div className="icon">✉</div>
                        <EditableField tagName="span" html={cvData.email} onChange={v => onUpdateField('email', v)} isReadOnly={isReadOnly} />
                    </div>
                </div>

                <div className="section-right">
                    <h2>PASSION</h2>
                    <ul className="passion-list">
                        {passions.map(passion => (
                            <li key={passion.id}>
                                <EditableField tagName="span" html={passion.name} onChange={v => onUpdateItem('passions', passion.id, 'name', v)} isReadOnly={isReadOnly} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default RedBannerTemplate;
