import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      
      setFormData({
        name: '',
        country: '',
        population: ''
      });
      
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

export default AddCity;