import React from 'react';

function SharkFish({ shark, fish }) {
  return (
    <div className="shark-fish">
      <h3>This Month's Shark and Fish</h3>
      <p>Shark: {shark}</p>
      <p>Fish: {fish}</p>
    </div>
  );
}

export default SharkFish;
