import React, { useState, useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './PreviewPanel.css';
import { sectionComponentMap } from './cv-sections/sectionComponentMap';
import CvSection from './cv-sections/CvSection';
import RedBannerTemplate from './cv-templates/RedBannerTemplate';

// --- Layout Components --- //
const SingleColumnLayout = ({ children }) => (
  <div className="cv-body">{children.main}</div>
);

const TwoColumnLayout = ({ children, layout, template, cvData }) => (
  <div className={`cv-container-bicolor template-${template.id} ${layout.sidebar === 'right' ? 'reversed' : ''}`}>
    <aside className="sidebar" style={{ width: layout.sidebarWidth, backgroundColor: template.styles.sidebarColor, color: template.styles.sidebarTextColor }}>
      {template.id === 'stylish-teal-orange' && (
        <>
          <div className="top-orange-banner" style={{ backgroundColor: template.styles.headerColor }}></div>
          <div className="profile-photo-container">
            {cvData.photo ? <img src={cvData.photo} alt="Profile" className="profile-photo"/> : <div className="profile-photo"></div>}
          </div>
        </>
      )}
      {children.sidebar}
    </aside>
    <main className="main-content">
      {children.main}
    </main>
  </div>
);

const RedBannerLayout = ({ children, template, cvData }) => (
  <div className={`template-${template.id}`}>
    <div className="top-red-header" style={{ backgroundColor: template.styles.headerColor }}></div>
    <div className="header-main">
        <div className="profile-photo-circle">
            {cvData.photo ? <img src={cvData.photo} alt="Profile"/> : <img src="https://img.icons8.com/color/48/000000/gender-neutral-user.png" alt="Profile"/>}
        </div>
        <div className="header-info">
            {children.header}
        </div>
    </div>
    <div className="main-content">
        <div className="left-column" style={{ width: '65%' }}>
            {children.left}
        </div>
        <div className="right-column" style={{ width: '35%', backgroundColor: template.styles.sidebarColor, color: template.styles.sidebarTextColor }}>
            {children.right}
        </div>
    </div>
  </div>
);

// --- Main Preview Panel --- //
const PreviewPanel = ({ cvData, template, onToggleMobileView, zoom, onZoomIn, onZoomOut, ...props }) => {
  const { font, titleFontSize, bodyFontSize, backgroundColor, textColor, headerColor, sidebarColor, sidebarTextColor, bandColor, showBands, showIcons } = cvData;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollContainerRef = useRef(null);
  const cvPreviewRef = useRef(null);
  const A4_HEIGHT_MM = 297;

  useLayoutEffect(() => {
    const calculatePages = () => {
      if (cvPreviewRef.current) {
        const contentHeight = cvPreviewRef.current.scrollHeight;
        const pageHeight = A4_HEIGHT_MM * 3.78;
        const pages = Math.max(1, Math.ceil(contentHeight / pageHeight));
        if (pages !== totalPages) setTotalPages(pages);
      }
    };
    const debounce = setTimeout(calculatePages, 250);
    window.addEventListener('resize', calculatePages);
    return () => {
      clearTimeout(debounce);
      window.removeEventListener('resize', calculatePages);
    };
  }, [cvData, zoom, totalPages]);

  const handleScroll = () => { /* ... as before ... */ };
  const renderPageBreaks = () => { /* ... as before ... */ };

  const renderContent = () => {
    if (!template) return <div>Chargement du template...</div>;

    // Handle special-cased templates that have their own full component
    if (template.id === 'red-top-banner') {
      return <RedBannerTemplate cvData={cvData} {...props} />;
    }

    // Generic engine for all other templates
    if (!template.structure) return <div>Chargement du template...</div>;

    const renderSection = (sectionId) => {
      const Component = sectionComponentMap[sectionId];
      if (!Component) return <div key={sectionId}>Section inconnue: {sectionId}</div>;

      if (['photo', 'contact', 'header'].includes(sectionId)) {
        if (sectionId === 'photo' && (template.id === 'stylish-teal-orange' || template.id === 'red-top-banner')) return null;
        return <Component key={sectionId} cvData={cvData} {...props} />;
      }

      const sectionData = cvData[sectionId];
      const sectionProps = { ...props, headerColor, cvData, items: sectionData, [sectionId]: sectionData, sectionName: sectionId };
      const isList = ['experience', 'education', 'skills', 'languages', 'interests', 'strengths', 'achievements', 'certifications', 'references', 'hobbies', 'passions', 'softwareSkills'].includes(sectionId);

      return (
        <CvSection 
          key={sectionId} 
          title={sectionId.toUpperCase()} 
          actions={isList ? [{label: `Ajouter`, onClick: () => props.onAddItem(sectionId)}] : undefined}
          showIcons={showIcons} showBands={showBands} bandColor={bandColor} titleColor={headerColor} titleFontSize={titleFontSize}
        >
          <Component {...sectionProps} />
        </CvSection>
      );
    };

    const contentFor = (key) => template.structure[key] ? template.structure[key].filter(id => id !== 'profile' || cvData.showProfile).map(renderSection) : [];

    if (template.layout.type === 'single-column') {
      return <SingleColumnLayout>{ { main: contentFor('main') } }</SingleColumnLayout>;
    } else if (template.layout.type === 'two-column') {
      return <TwoColumnLayout layout={template.layout} template={template} cvData={cvData}>{ { main: contentFor('main',), sidebar: contentFor('sidebar') } }</TwoColumnLayout>;
    } else if (template.layout.type === 'red-banner') {
        return <RedBannerLayout template={template} cvData={cvData}>{ { header: contentFor('header'), left: contentFor('left'), right: contentFor('right') } }</RedBannerLayout>;
    }

    return <div>Layout de template non supporté: {template.layout.type}</div>;
  };

  const handleBackClick = () => onToggleMobileView();
  const bodyStyle = { fontFamily: font, fontSize: `${bodyFontSize}px`, backgroundColor: backgroundColor, color: textColor };
  const previewStyle = { ...bodyStyle, boxSizing: 'border-box', width: props.pageSettings.width + 'px', minHeight: props.pageSettings.height + 'px', padding: 0 }; // Padding is handled by templates now

  return (
    <div className="preview-panel-container">
      <button className="mobile-back-btn" onClick={handleBackClick}><FontAwesomeIcon icon={faArrowLeft} /><span>Éditeur</span></button>
      <div className="mobile-zoom-controls"><button onClick={onZoomOut}>-</button><span>{Math.round(zoom * 100)}%</span><button onClick={onZoomIn}>+</button></div>
      <div className="scroll-wrapper" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="zoom-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div id="cv-preview" ref={cvPreviewRef} className="a4-preview" style={previewStyle}>
            {renderContent()}
            {renderPageBreaks()}
          </div>
        </div>
      </div>
      {totalPages > 1 && <div className="page-indicator">Page {currentPage} sur {totalPages}</div>}
    </div>
  );
};

export default PreviewPanel;