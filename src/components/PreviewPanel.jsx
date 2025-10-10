import React, { useState, useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import EditableField from './EditableField';
import './PreviewPanel.css';
import { sectionComponentMap } from './cv-sections/sectionComponentMap';
import { sectionTitles } from '../templates/cv-templates.js';
import CvSection from './cv-sections/CvSection';


import { sectionIconMap } from '../utils/iconMap';

// --- Layout Components --- //
const SingleColumnLayout = ({ children, cvData }) => (
  <>
    <div className={`cv-header photo-pos-${cvData.photoPosition}`}>
      {children.header}
    </div>
    <div className="cv-body">
      {children.main}
    </div>
  </>
);

const TwoColumnLayout = ({ children, layout, template, cvData }) => (
  <div className={`cv-container-bicolor template-${template.id} ${layout.sidebar === 'right' ? 'reversed' : ''}`}>
    <aside className="sidebar" style={{ width: layout.sidebarWidth, backgroundColor: cvData.sidebarColor, color: cvData.sidebarTextColor }}>
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

const BannerLayout = ({ children, template, cvData }) => (
  <div className={`template-${template.id} photo-pos-${cvData.photoPosition}`}>

    <div className="header-main">
        <div className="profile-photo-circle">
            {children.photo}
        </div>
        <div className="header-info">
            {children.header}
        </div>
    </div>
    <div className="banner-body">
        {children.main}
    </div>
  </div>
);

const ModernHeaderLayout = ({ children, template, cvData }) => (
  <div className={`template-${template.id}`}>
    <div className="header-main">
      <div className="profile-photo-container">
        <div className="profile-photo-circle-outline">
          {children.photo}
        </div>
      </div>
      <div className="header-info">
        {/* The HeaderSection component renders h1 and p tags */}
        {children.header}
      </div>
    </div>
    <div className="cv-body">
      <div className="left-column-body">
        {children.left}
      </div>
      <div className="right-column-body">
        {children.right}
      </div>
    </div>
  </div>
);

// --- Main Preview Panel --- //
const PreviewPanel = ({ cvData, template, onToggleMobileView, zoom, onZoomIn, onZoomOut, isTemplateLoading, ...props }) => {
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



    // Generic engine for all other templates
    if (!template.structure) return <div>Chargement du template...</div>;

    const renderSection = (sectionInfo) => {
      // Support both simple string IDs and object-based definitions for more flexibility
      const sectionId = typeof sectionInfo === 'string' ? sectionInfo : sectionInfo.section;
      const componentName = typeof sectionInfo === 'string' ? sectionId : sectionInfo.component || sectionId;

      const Component = sectionComponentMap[componentName];
      if (!Component) return <div key={sectionId}>Composant inconnu: {componentName}</div>;

      // Simplified rendering for atomic components that don't need a <CvSection> wrapper
      if (['photo', 'contact', 'header', 'infoTags'].includes(sectionId)) { // Added infoTags here
        if (sectionId === 'photo' && (template.id === 'stylish-teal-orange')) return null;
        return <Component key={sectionId} cvData={cvData} template={template} {...props} />;
      }

      const sectionData = cvData[sectionId];
      const sectionProps = { ...props, template, headerColor, cvData, items: sectionData, [sectionId]: sectionData, sectionName: sectionId };
      const isList = Array.isArray(sectionData);
      const icon = (template.id === 'default' || template.id === 'stylish-teal-orange' || template.id === 'red-top-banner') ? sectionIconMap[sectionId] : null;

      return (
        <CvSection 
          key={sectionId} 
          title={sectionTitles[sectionId] || sectionId.toUpperCase()} 
          icon={icon}
          actions={isList ? [{label: `Ajouter`, onClick: () => props.onAddItem(sectionId)}] : undefined}
          showIcons={showIcons} 
          showBands={showBands} 
          bandColor={bandColor} 
          titleColor={headerColor} 
          titleFontSize={titleFontSize}
        >
          <Component {...sectionProps} />
        </CvSection>
      );
    };

    const contentFor = (key) => template.structure[key] ? template.structure[key].filter(item => {
      const sectionId = typeof item === 'string' ? item : item.section;
      // Filter logic: hide section if its visibility is set to false
      if (cvData.sectionVisibility && cvData.sectionVisibility[sectionId] === false) {
        return false;
      }
      // Filter logic: hide profile if showProfile is false, hide photo if showPhoto is false
      if (sectionId === 'profile' && !cvData.showProfile) return false;
      if (sectionId === 'photo' && !cvData.showPhoto) return false;
      return true;
    }).map(renderSection) : [];

    if (template.layout.type === 'single-column') {
      return <SingleColumnLayout cvData={cvData}>{ { main: contentFor('main'), header: contentFor('header') } }</SingleColumnLayout>;
    } else if (template.layout.type === 'two-column') {
      return <TwoColumnLayout layout={template.layout} template={template} cvData={cvData}>{ { main: contentFor('main',), sidebar: contentFor('sidebar') } }</TwoColumnLayout>;
    } else if (template.layout.type === 'banner') {
        return <BannerLayout template={template} cvData={cvData}>{ { header: contentFor('header'), photo: contentFor('photo'), main: contentFor('main') } }</BannerLayout>;
    } else if (template.layout.type === 'modern-header') {
        return <ModernHeaderLayout template={template} cvData={cvData}>{ { header: contentFor('header'), photo: contentFor('photo'), left: contentFor('left'), right: contentFor('right') } }</ModernHeaderLayout>;
    }

    return <div>Layout de template non supporté: {template.layout.type}</div>;
  };

  const handleBackClick = () => onToggleMobileView();
  const bodyStyle = { fontFamily: font, fontSize: `${bodyFontSize}px`, backgroundColor: backgroundColor, color: textColor };
  const previewStyle = { ...bodyStyle, boxSizing: 'border-box', width: props.pageSettings.width + 'px', minHeight: props.pageSettings.height + 'px', padding: 0 }; // Padding is handled by templates now

  return (
    <div className="preview-panel-container">
      {isTemplateLoading && (
        <div className="loading-overlay">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      )}
      <button className="mobile-back-btn" onClick={handleBackClick}><FontAwesomeIcon icon={faArrowLeft} /><span>Éditeur</span></button>
      <div className="mobile-zoom-controls"><button onClick={onZoomOut}>-</button><span>{Math.round(zoom * 100)}%</span><button onClick={onZoomIn}>+</button></div>
      <div className="scroll-wrapper" ref={scrollContainerRef} onScroll={handleScroll}>
        <div className="zoom-wrapper" style={{ transform: `scale(${zoom})` }}>
          <div id="cv-preview" ref={cvPreviewRef} className={`a4-preview cv-container-${template?.id}`} style={previewStyle}>
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