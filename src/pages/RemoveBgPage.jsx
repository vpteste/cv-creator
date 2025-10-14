import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiUpload, FiDownload } from 'react-icons/fi'; // Using react-icons for professional icons
import { FaMagic } from 'react-icons/fa';

// --- Main Page Component ---
const RemoveBgPage = () => {
  const [state, setState] = useState('initial');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [resultImage, setResultImage] = useState(null); // State for the final image URL

  // --- State Transitions ---
  useEffect(() => {
    if (state === 'processing') {
      const removeBackground = async () => {
        try {
          const response = await fetch('/api/remove-background', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: uploadedImage }),
          });

          if (!response.ok) {
            throw new Error('Failed to remove background');
          }

          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          setResultImage(imageUrl);
          setState('result');

        } catch (error) {
          console.error('Background removal failed:', error);
          // Optional: Add an error state to show a message to the user
          setState('initial'); // Reset on error for now
        }
      };

      removeBackground();
    }
  }, [state, uploadedImage]);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setState('processing');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = useCallback((e) => { e.preventDefault(); setState('drag-over'); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setState('initial'); }, []);
  const handleDrop = useCallback((e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files[0]); }, []);
  const handleReset = () => { setState('initial'); setUploadedImage(null); };

  const mainComponentVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

const handleDownload = () => {
    if (!resultImage) return;
    fetch(resultImage)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'background-removed.png';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(() => alert('An error occurred while downloading the image.'));
  };

  const renderMainComponent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        variants={mainComponentVariants}
        initial="exit"
        animate="initial"
        exit="exit"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="w-full"
      >
        {(() => {
          switch (state) {
            case 'processing':
              return (
                <div className="w-full text-center">
                  <motion.img src={uploadedImage} alt="Aperçu" className="max-h-60 mx-auto rounded-lg shadow-lg" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
                  <div className="mt-6 w-full bg-gray-200/50 rounded-full h-3 overflow-hidden">
                    <motion.div className="bg-blue-400 h-full" initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ duration: 3, ease: 'linear' }}></motion.div>
                  </div>
                  <p className="mt-4 text-gray-600">Notre IA efface l'arrière-plan...</p>
                </div>
              );
            case 'result':
              return (
                <div className="w-full text-center">
                  <h3 className="text-3xl font-bold mb-4">Et voilà !</h3>
                  <motion.div className="relative inline-block" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                     <img src={resultImage} alt="Résultat final" className="max-h-60 mx-auto rounded-lg shadow-lg bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAACJJREFUOE9jZGBgEGHAD97/B4MhgK4IZK4BUwZGBgYgdQAA3f4K/gM+2iUAAAAASUVORK5CYII=')]" />
                     <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 0] }} transition={{ delay: 0.5, duration: 1 }} className="absolute top-0 right-0 text-yellow-400 text-3xl">✨</motion.span>
                  </motion.div>
                  <motion.button onClick={handleDownload} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 bg-gradient-to-br from-green-400 to-cyan-400 text-white font-bold py-3 px-8 rounded-xl shadow-md">
                    Télécharger en HD
                  </motion.button>
                  <p className="mt-4 text-sm"><a href="#" onClick={(e) => {e.preventDefault(); handleReset();}} className="text-blue-500 hover:underline">Importer une autre image</a></p>
                </div>
              );
            case 'drag-over':
            case 'initial':
            default:
              return (
                <motion.div 
                  className={`w-full bg-white/50 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-8 transition-all duration-300 ${
                    state === 'drag-over' ? 'border-dashed border-blue-400 border-2 scale-105' : ''
                  }`}
                  onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}><FiUploadCloud className="w-12 h-12 text-gray-500" /></motion.div>
                    <p className="font-bold text-gray-700">{state === 'drag-over' ? 'Déposez pour commencer !' : 'Glissez-déposez votre image ici'}</p>
                    <p className="text-sm text-gray-500">— ou —</p>
                    <input type="file" className="hidden" id="file-upload" accept="image/*" onChange={(e) => handleFileChange(e.target.files[0])}/>
                    <motion.label htmlFor="file-upload" className="cursor-pointer bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold py-3 px-8 rounded-xl shadow-md" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                      Sélectionner un fichier
                    </motion.label>
                  </div>
                </motion.div>
              );
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="font-nunito min-h-screen w-full bg-gradient-to-r from-lavender via-sky-blue to-mint bg-[length:200%_200%] animate-gradient-bg text-gray-800 flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      

      <main className="flex-grow flex flex-col items-center justify-center text-center w-full">
        <div className="w-full max-w-2xl">
          <AnimatePresence>
            {(state === 'initial' || state === 'drag-over') && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <h1 className="text-4xl sm:text-5xl font-bold mb-3">Supprimez l'arrière-plan.</h1>
                <h2 className="text-lg sm:text-xl text-gray-600 mb-10">La douceur en plus. Importez votre image et laissez notre magie opérer.</h2>
              </motion.div>
            )}
          </AnimatePresence>
          {renderMainComponent()}
        </div>
      </main>

      <section id="how-it-works" className="w-full max-w-6xl mx-auto mt-20 sm:mt-32 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div whileHover={{ y: -5 }} className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-md border border-white/20"><div className="flex justify-center items-center mb-4"><FiUpload className="text-3xl text-blue-500"/></div><h4 className="text-xl font-bold mb-2">1. Uploadez votre Fichier</h4><p className="text-gray-600">Choisissez une image depuis votre appareil ou glissez-la simplement dans la zone.</p></motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-md border border-white/20"><div className="flex justify-center items-center mb-4"><FaMagic className="text-3xl text-purple-500"/></div><h4 className="text-xl font-bold mb-2">2. La Magie Opère</h4><p className="text-gray-600">Notre intelligence artificielle analyse et supprime l'arrière-plan avec précision.</p></motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-md border border-white/20"><div className="flex justify-center items-center mb-4"><FiDownload className="text-3xl text-green-500"/></div><h4 className="text-xl font-bold mb-2">3. Téléchargez et Créez</h4><p className="text-gray-600">Récupérez votre image en haute définition avec un fond transparent.</p></motion.div>
        </div>
      </section>
    </div>
  );
};

export default RemoveBgPage;
