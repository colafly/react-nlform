import React, { useState } from 'react';
import { NLForm, NLSelect, NLInput } from './NLForm';

const ExampleUsage = () => {
  const [formData, setFormData] = useState({
    foodType: '1',
    restaurantType: '1',
    time: '1',
    city: ''
  });

  const foodOptions = [
    { value: '1', label: 'any food' },
    { value: '2', label: 'Indian' },
    { value: '3', label: 'French' },
    { value: '4', label: 'Japanese' },
    { value: '5', label: 'Italian' }
  ];

  const restaurantOptions = [
    { value: '1', label: 'standard' },
    { value: '2', label: 'fancy' },
    { value: '3', label: 'hip' },
    { value: '4', label: 'traditional' },
    { value: '5', label: 'romantic' }
  ];

  const timeOptions = [
    { value: '1', label: 'anytime' },
    { value: '2', label: '7 p.m.' },
    { value: '3', label: '8 p.m.' },
    { value: '4', label: '9 p.m.' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleFoodChange = (value) => {
    setFormData(prev => ({ ...prev, foodType: value }));
  };

  const handleRestaurantChange = (value) => {
    setFormData(prev => ({ ...prev, restaurantType: value }));
  };

  const handleTimeChange = (value) => {
    setFormData(prev => ({ ...prev, time: value }));
  };

  const handleCityChange = (value) => {
    setFormData(prev => ({ ...prev, city: value }));
  };

  return (
    <div className="container demo-1">
      <header>
        <h1>Natural Language Form <span>React Version</span></h1>
      </header>
      <div className="main clearfix">
        <NLForm onSubmit={handleSubmit}>
          I feel to eat{' '}
          <NLSelect 
            options={foodOptions}
            value={formData.foodType}
            onChange={handleFoodChange}
          />
          <br />
          in a{' '}
          <NLSelect 
            options={restaurantOptions}
            value={formData.restaurantType}
            onChange={handleRestaurantChange}
          />
          {' '}restaurant
          <br />
          at{' '}
          <NLSelect 
            options={timeOptions}
            value={formData.time}
            onChange={handleTimeChange}
          />
          {' '}in{' '}
          <NLInput
            type="text"
            value={formData.city}
            placeholder="any city"
            subline="For example: <em>Los Angeles</em> or <em>New York</em>"
            onChange={handleCityChange}
          />
          <div className="nl-submit-wrap">
            <button className="nl-submit" type="submit">
              Find a restaurant
            </button>
          </div>
        </NLForm>
      </div>
    </div>
  );
};

export default ExampleUsage;