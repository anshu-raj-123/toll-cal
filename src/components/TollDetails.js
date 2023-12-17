import React from 'react';

const TollDetails = ({ tollInfo }) => {
  return (
    <div className="toll-details">
      <h3>Toll Details</h3>
      <ul>
        {tollInfo.map((toll, index) => (
          <li key={index}>
            <strong>Toll Booth:</strong> {toll.boothName}, <strong>Cost:</strong> {toll.cost}
            {toll.additionalInfo && (
              <span>, <strong>Additional Info:</strong> {toll.additionalInfo}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TollDetails;
