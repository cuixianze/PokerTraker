import React from "react";

function SharkFish({ shark, fish }) {
  return (
    <div className="shark-fish">
      <p className="shark_data">{shark}</p>
      <p className="fish_data">{fish}</p>
    </div>
  );
}

export default SharkFish;
