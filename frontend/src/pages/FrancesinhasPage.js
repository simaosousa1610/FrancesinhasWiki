import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FrancesinhaList from '../components/FrancesinhaList';
import FrancesinhaForm from '../components/FrancesinhaForm';
import Modal from '../components/Modal';
import './FrancesinhasPage.css';

const FrancesinhasPage = () => {
  const [francesinhas, setFrancesinhas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [newFrancesinha, setNewFrancesinha] = useState({ ingredients: [] });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFrancesinhas();
    fetchIngredients();
    fetchRestaurants();
  }, []);

  const fetchFrancesinhas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/francesinhas');
      setFrancesinhas(response.data);
    } catch (error) {
      console.error('Error fetching francesinhas:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFrancesinha({ ...newFrancesinha, [name]: value });
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;
    const updatedIngredients = checked
      ? [...newFrancesinha.ingredients, value]
      : newFrancesinha.ingredients.filter(ingredient => ingredient !== value);
    setNewFrancesinha({ ...newFrancesinha, ingredients: updatedIngredients });
  };

  const handleSelectRestaurant = (e) => {
    setNewFrancesinha({ ...newFrancesinha, restaurant: e.target.value });
  };

  const handlePictureUpload = (event) => {
    setNewFrancesinha({ ...newFrancesinha, image: event.target.files[0] });
  };

  const handleCreateFrancesinha = async () => {
    const formData = new FormData();
    for (const key in newFrancesinha) {
      if (Array.isArray(newFrancesinha[key])) {
        newFrancesinha[key].forEach(value => formData.append(key, value));
      } else {
        formData.append(key, newFrancesinha[key]);
      }
    }
    if (newFrancesinha.image) {
      formData.append('image', newFrancesinha.image);
    }
    try {
      await axios.post('http://localhost:5000/francesinhas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchFrancesinhas();
      setMessage('Francesinha created successfully!');
    } catch (error) {
      console.error('Error creating francesinha:', error);
      setMessage('Error creating francesinha.');
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/francesinhas/${id}`);
      fetchFrancesinhas();
      setMessage('Francesinha deleted successfully!');
    } catch (error) {
      console.error('Error deleting francesinha:', error);
      setMessage('Error deleting francesinha.');
    }
  };

  const handleCloseModal = () => {
    setMessage('');
  };

  return (
    <div className="francesinhas-container">
      <h2>Francesinhas</h2>
      <div className="list-container">
        <FrancesinhaList francesinhas={francesinhas} onDelete={handleOnDelete} />
      </div>
      <div className="form-container">
        <FrancesinhaForm
          newFrancesinha={newFrancesinha}
          ingredients={ingredients}
          restaurants={restaurants}
          handleInputChange={handleInputChange}
          handleIngredientChange={handleIngredientChange}
          handleSelectRestaurant={handleSelectRestaurant}
          handleCreateFrancesinha={handleCreateFrancesinha}
          handlePictureChange={handlePictureUpload}
        />
      </div>
      <Modal message={message} onClose={handleCloseModal} />
    </div>
  );
};

export default FrancesinhasPage;
