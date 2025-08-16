import React from 'react';
import { useParams } from 'react-router-dom';

function CityDetails({ cities }) {
  const { id } = useParams();
  const city = cities.find(city => city.id === parseInt(id));

  if (!city) {
    return <div className="city-details">City not found</div>;
  }

  return (
    <div className="city-details">
      <h2>{city.name} Details</h2>
      <p><strong>Country:</strong> {city.country}</p>
      <p><strong>Population:</strong> {city.population.toLocaleString()}</p>
    </div>
  );
}

export default CityDetails;