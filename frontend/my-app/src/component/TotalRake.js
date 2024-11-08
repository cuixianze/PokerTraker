import React from 'react';

function TotalRake({ totalRake }) {
  return (
    <div className="total-rake">
      <h3>Total Rake for the Month</h3>
      <p>{totalRake}</p>
    </div>
  );
}

export default TotalRake;
