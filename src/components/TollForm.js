import React, { useState } from 'react';

const TollForm = ({ onCalculateToll }) => {
  const [startPoint, setStartPoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');

  const handleCalculateToll = () => {
   
    if (startPoint && destinationPoint) {
      onCalculateToll(startPoint, destinationPoint);
    } else {
      alert('Please enter both starting and destination points.');
    }
  };

  return (
    <div>
      <label>
        Starting Point:
        <input type="text" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} />
      </label>
      <br />
      <label>
        Destination Point:
        <input type="text" value={destinationPoint} onChange={(e) => setDestinationPoint(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCalculateToll}>Calculate Toll</button>
    </div>
  );
};

export default TollForm;
