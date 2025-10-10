import React from 'react';
import './FloatingActions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo, faTrashAlt, faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';

const FloatingActions = ({ onSave, onRestore, onReset, onDownloadPdf, isDownloading, mobileView, isDesktop }) => {
  return (
    <div className="floating-actions-container">
      {(isDesktop || mobileView === 'preview') && (
        <button onClick={onDownloadPdf} className="action-button download" title="Télécharger en PDF" disabled={isDownloading}>
          {isDownloading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faDownload} />}
        </button>
      )}
      
      {(isDesktop || mobileView === 'editor') && (
        <>
          <button onClick={onSave} className="action-button save" title="Sauvegarder">
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button onClick={onRestore} className="action-button restore" title="Restaurer la sauvegarde">
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button onClick={onReset} className="action-button reset" title="Réinitialiser">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </>
      )}
    </div>
  );
};

export default FloatingActions;
