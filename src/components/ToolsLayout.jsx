import React from 'react';
import AdPlaceholder from './AdPlaceholder';
import './ToolsLayout.css';

const ToolsLayout = ({ children }) => {
  return (
    <div className="tools-layout-container">
      <aside className="ad-sidebar ad-sidebar-left">
        <AdPlaceholder type="sidebar" />
      </aside>
      <main className="tools-content">
        {children}
      </main>
      <aside className="ad-sidebar ad-sidebar-right">
        <AdPlaceholder type="sidebar" />
      </aside>
      <footer className="ad-footer-banner">
        <AdPlaceholder type="banner" />
      </footer>
    </div>
  );
};

export default ToolsLayout;
