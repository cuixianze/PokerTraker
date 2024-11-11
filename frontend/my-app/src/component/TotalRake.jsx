import React from "react";

function TotalRake({ totalRake }) {
  return (
    <div className="totalRake">
      <h3 className="totalRake_h3">Total Rake for the Month : {totalRake}</h3>
    </div>
  );
}

export default TotalRake;
