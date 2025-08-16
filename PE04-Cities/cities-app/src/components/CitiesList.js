import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function CitiesList({ cities }) {
  return (
    <div className="cities-container">
      <div className="cities-list-section">
        <h2>Cities List</h2>
        <div className="cities-list">
          {cities.map(city => (
            <div key={city.id} className="city-item">
              <Link to={`/cities/${city.id}`} className="city-link">
                {city.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default CitiesList;