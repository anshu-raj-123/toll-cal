import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <div className="education-container">
      <h2>Toll Calculation Education</h2>
      <p>
        Welcome to our Toll Calculator! This feature is designed to help you understand how toll calculations work.
      </p>
      <div className="tooltip">
        Hover over toll-related terms for more information.
        <span className="tooltiptext">
          Toll costs are influenced by several factors, including:
          <ul>
            <li>
              <strong>Distance:</strong> The length of your route affects toll costs. Longer distances generally result in higher toll expenses.
            </li>
            <li>
              <strong>Vehicle Type:</strong> Different types of vehicles may have varying toll rates. For example, commercial trucks often pay higher tolls than passenger cars.
            </li>
            <li>
              <strong>Toll Rates:</strong> Each toll booth on your route has specific toll rates. These rates can vary based on location, time, and type of vehicle.
            </li>
          </ul>
          <p>
            <strong>Additional Factors:</strong> Other factors, such as toll discounts, time-of-day pricing, and special vehicle categories, can further impact toll costs.
          </p>
          <p>
            <strong>Planning Tips:</strong> To optimize your toll expenses, consider exploring alternative routes, adjusting your travel times, and understanding any available discounts.
          </p>
          <p>
            <strong>Real-time Updates:</strong> Keep in mind that toll rates and conditions can change. Our Toll Calculator provides real-time updates to ensure accurate and current information.
          </p>
          <p>
            <strong>Environmental Impact:</strong> Some tolls aim to reduce congestion and environmental impact by encouraging the use of specific routes or modes of transportation.
          </p>
          Understanding these factors can help you plan your route more effectively, make informed decisions, and estimate toll expenses accurately.
        </span>
      </div>
      <p>
        Explore the toll calculator to see how these factors impact the overall toll costs for your journey.
      </p>
      <p>
        Additionally, visualize your route on the map below to get a better understanding of the toll locations.
      </p>
    </div>
  );
};

export default Education;
