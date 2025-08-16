import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, Navigate, Outlet } from 'react-router-dom';
import './App.css';

// Sample initial data
const initialCities = [
  { id: 1, name: 'New York', country: 'USA', population: 8419000 },
  { id: 2, name: 'London', country: 'UK', population: 8982000 }
];

// Navigation Component
function Navigation() {
  return (
    <nav className="nav-menu">
      <Link to="/cities" className="nav-link">Cities List</Link>
      <Link to="/add-city" className="nav-link">Add City</Link>
    </nav>
  );
}

// City Details Component
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

// Cities List Component with Outlet for nested routing
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
      {/* Outlet will render the nested CityDetails component */}
      <Outlet />
    </div>
  );
}

// Add City Component
function AddCity({ onAddCity }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    population: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.country && formData.population) {
      const newCity = {
        id: Date.now(),
        name: formData.name,
        country: formData.country,
        population: parseInt(formData.population)
      };
      onAddCity(newCity);
      
      // Reset form
      setFormData({
        name: '',
        country: '',
        population: ''
      });
      
      // Redirect to cities list using useNavigate
      navigate('/cities');
    }
  };

  return (
    <div className="add-city-container">
      <h2>Add City</h2>
      <form onSubmit={handleSubmit} className="add-city-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter city name"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter country"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Population:</label>
          <input
            type="number"
            name="population"
            value={formData.population}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter population"
            required
          />
        </div>
        
        <button type="submit" className="add-city-btn">
          Add City
        </button>
      </form>
    </div>
  );
}

// Wrapper component to pass cities prop to CityDetails
function CityDetailsWrapper({ cities }) {
  return <CityDetails cities={cities} />;
}

// Main App Component
function App() {
  const [cities, setCities] = useState(initialCities);

  const addCity = (newCity) => {
    setCities([...cities, newCity]);
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Cities Application</h1>
          <Navigation />
        </header>
        
        <main className="main-content">
          <Routes>
            {/* Default redirect to cities */}
            <Route path="/" element={<Navigate to="/cities" replace />} />
            
            {/* Cities route with nested city details */}
            <Route path="/cities" element={<CitiesList cities={cities} />}>
              <Route path=":id" element={<CityDetailsWrapper cities={cities} />} />
            </Route>
            
            {/* Add city route */}
            <Route path="/add-city" element={<AddCity onAddCity={addCity} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;