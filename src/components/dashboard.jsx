import React, { useState } from 'react';
import './dashboard.css';
import Dashboard from './dashboard'; // Import the Dashboard component

const Apps = () => {
  const [cardName, setCardName] = useState('');
  const [showCustomBlock, setShowCustomBlock] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [cards, setCards] = useState([]);
  const [workspaceDropdown, setWorkspaceDropdown] = useState([]);

  const handleAddCard = () => {
    if (cardName.trim() !== '' && !cards.includes(cardName)) {
      setCards([...cards, cardName]);
      setWorkspaceDropdown([...workspaceDropdown, cardName]);
      setCardName('');
      setShowCustomBlock(false);
    }
  };

  const handleDeleteCard = (name) => {
    setCards(cards.filter((card) => card !== name));
    setWorkspaceDropdown(workspaceDropdown.filter((option) => option !== name));
    setShowConfirmationPopup(false);
  };

  return (
    <>
      <nav>
        <button onClick={() => setShowCustomBlock(true)} title="Add Card">+</button>
        <button className="return-btn" onClick={() => alert('Returning to Login Page')} title="Return to Login Page">Return to Login Page</button>
      </nav>

      <div className="workspace-dropdown">
        {workspaceDropdown.map((option, index) => (
          <a key={index} href="#" onClick={() => setShowConfirmationPopup(option)}>{option}</a>
        ))}
      </div>

      <div className="container">
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-img"></div>
              <div className="card-footer">{card}</div>
            </div>
          ))}
        </div>
      </div>

      {showCustomBlock && (
        <div className="custom-overlay" onClick={() => setShowCustomBlock(false)}></div>
      )}
      {showCustomBlock && (
        <div className="custom-block">
          <label htmlFor="cardName">Enter Card Name:</label>
          <input type="text" id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Card Name" />
          <button onClick={handleAddCard}>Add Card</button>
          <button onClick={() => setShowCustomBlock(false)}>Cancel</button>
        </div>
      )}

      {showConfirmationPopup && (
        <div className="confirmation-popup">
          <label>Are you sure you want to delete this card?</label>
          <div className="confirmation-popup-buttons">
            <button className="confirm" onClick={() => handleDeleteCard(showConfirmationPopup)}>Confirm</button>
            <button className="cancel" onClick={() => setShowConfirmationPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Render the Dashboard component */}
      <Dashboard />
    </>
  );
};

export default Apps;
