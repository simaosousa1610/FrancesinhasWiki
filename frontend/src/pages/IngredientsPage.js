import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientList from '../components/IngredientList';
import IngredientForm from '../components/IngredientForm';
import Modal from '../components/Modal';

const IngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      setMessage('Error fetching ingredients.');
    }
  };

  const handleInputChange = (e, field) => {
    setNewIngredient({ ...newIngredient, [field]: e.target.value });
  };

  const handleCreateIngredient = async () => {
    try {
      await axios.post('http://localhost:5000/ingredients', newIngredient);
      fetchIngredients();
      setMessage('Ingredient created successfully!');
    } catch (error) {
      console.error('Error creating ingredient:', error);
      setMessage('Error creating ingredient.');
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ingredients/${id}`);
      fetchIngredients();
      setMessage('Ingredient deleted successfully!');
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      setMessage('Error deleting ingredient.');
    }
  };

  const handleCloseModal = () => {
    setMessage('');
  };

  return (
    <div>
      <h2>Ingredients</h2>
      <IngredientList ingredients={ingredients} onDelete={handleOnDelete} />
      <IngredientForm
        newIngredient={newIngredient}
        handleInputChange={handleInputChange}
        handleCreateIngredient={handleCreateIngredient}
      />
      <Modal message={message} onClose={handleCloseModal} />
    </div>
  );
};

export default IngredientsPage;
