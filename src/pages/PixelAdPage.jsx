import React, { useState, useMemo } from 'react';
import './PixelAdPage.css';

const GRID_SIZE = 100;
const PIXEL_PRICE = 1; // 1€ per pixel
const MIN_PIXELS = 100;
const MAX_PIXELS = 10000;

// Generate some random sold pixels for demonstration
const generateSoldPixels = () => {
  const sold = new Set();
  for (let i = 0; i < 1500; i++) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    sold.add(`${x}-${y}`);
  }
  return sold;
};

const PixelAdPage = () => {
  const [selectedPixels, setSelectedPixels] = useState(new Set());
  const [soldPixels] = useState(generateSoldPixels());

  const handlePixelClick = (x, y) => {
    const pixelKey = `${x}-${y}`;
    if (soldPixels.has(pixelKey)) return; // Can't select sold pixels

    const newSelectedPixels = new Set(selectedPixels);
    if (newSelectedPixels.has(pixelKey)) {
      newSelectedPixels.delete(pixelKey);
    } else {
      newSelectedPixels.add(pixelKey);
    }
    setSelectedPixels(newSelectedPixels);
  };

  const totalPrice = selectedPixels.size * PIXEL_PRICE;
  const isPurchaseable = selectedPixels.size >= MIN_PIXELS && selectedPixels.size <= MAX_PIXELS;

  const handlePurchase = () => {
    if (selectedPixels.size < MIN_PIXELS) {
      alert(`Veuillez sélectionner au moins ${MIN_PIXELS} pixels.`);
      return;
    }
    if (selectedPixels.size > MAX_PIXELS) {
        alert(`Vous ne pouvez pas sélectionner plus de ${MAX_PIXELS} pixels.`);
        return;
    }
    const confirmation = window.confirm(
      `Vous êtes sur le point d'acheter ${selectedPixels.size} pixels pour un total de ${totalPrice}€.\n` +
      `Voulez-vous continuer ?`
    );
    if (confirmation) {
      // In a real app, this would trigger a payment process.
      alert('Merci pour votre achat ! (Ceci est une simulation)');
      // Here you would update the soldPixels state and clear the selection.
    }
  };

  const grid = useMemo(() => {
    let pixels = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const key = `${x}-${y}`;
        let className = 'pixel';
        if (soldPixels.has(key)) {
          className += ' sold';
        } else if (selectedPixels.has(key)) {
          className += ' selected';
        }
        pixels.push(
          <div
            key={key}
            className={className}
            onClick={() => handlePixelClick(x, y)}
            title={`Pixel (${x}, ${y})`}
          />
        );
      }
    }
    return pixels;
  }, [selectedPixels, soldPixels]);

  return (
    <div className="page-container pixel-page-container">
      <div className="pixel-page-header">
        <h2>Achetez un Morceau d'Histoire Numérique</h2>
        <p>Possédez un pixel sur notre grille pour seulement {PIXEL_PRICE}€ l'unité. Votre image ou lien y restera à jamais.</p>
      </div>
      <div className="pixel-grid-container">
        <div className="pixel-grid">{grid}</div>
      </div>
      <div className="purchase-summary">
        <div className="summary-item">
          <span>Pixels Sélectionnés</span>
          <span className="summary-value">{selectedPixels.size}</span>
        </div>
        <div className="summary-item">
          <span>Prix Total</span>
          <span className="summary-value">{totalPrice} €</span>
        </div>
        <div className="summary-legend">
          <div className="legend-item"><span className="pixel-legend sold"></span>Vendus</div>
          <div className="legend-item"><span className="pixel-legend selected"></span>Sélectionnés</div>
          <div className="legend-item"><span className="pixel-legend available"></span>Disponibles</div>
        </div>
        <button
          className="purchase-button"
          onClick={handlePurchase}
          disabled={!isPurchaseable && selectedPixels.size > 0}
        >
          Acheter les Pixels
        </button>
        {selectedPixels.size > 0 && !isPurchaseable && (
          <p className="purchase-error">
            Minimum {MIN_PIXELS} pixels, Maximum {MAX_PIXELS}.
          </p>
        )}
      </div>
    </div>
  );
};

export default PixelAdPage;
