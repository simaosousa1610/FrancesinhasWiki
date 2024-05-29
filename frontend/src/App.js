import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from './Modal'; // Import the Modal component

const apiUrl = 'http://localhost:5000';

function App() {
  const [francesinhas, setFrancesinhas] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newFrancesinha, setNewFrancesinha] = useState({ ingredients: [] });
  const [newRestaurant, setNewRestaurant] = useState({});
  const [newIngredient, setNewIngredient] = useState({});
  const [message, setMessage] = useState(''); // State for message box

  useEffect(() => {
    fetchFrancesinhas();
    fetchRestaurants();
    fetchIngredients();
  }, []);

  const fetchFrancesinhas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/francesinhas`);
      setFrancesinhas(response.data);
    } catch (error) {
      console.error("Error fetching francesinhas:", error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${apiUrl}/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/ingredients`);
      setIngredients(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleCreateFrancesinha = async () => {
    try {
      await axios.post(`${apiUrl}/francesinhas`, newFrancesinha);
      setMessage('Francesinha created successfully');
      fetchFrancesinhas();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error creating francesinha: ${errorMessage}`);
      console.error("Error creating francesinha:", error);
    }
  };

  const handleCreateRestaurant = async () => {
    try {
      await axios.post(`${apiUrl}/restaurants`, newRestaurant);
      setMessage('Restaurant created successfully');
      fetchRestaurants();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error creating restaurant: ${errorMessage}`);
      console.error("Error creating restaurant:", error);
    }
  };

  const handleCreateIngredient = async () => {
    try {
      await axios.post(`${apiUrl}/ingredients`, newIngredient);
      setMessage('Ingredient created successfully');
      fetchIngredients();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error creating ingredient: ${errorMessage}`);
      console.error("Error creating ingredient:", error);
    }
  };

  const handleDeleteFrancesinha = async (id) => {
    try {
      await axios.delete(`${apiUrl}/francesinhas/${id}`);
      setMessage('Francesinha deleted successfully');
      fetchFrancesinhas();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error deleting francesinha: ${errorMessage}`);
      console.error("Error deleting francesinha:", error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`${apiUrl}/restaurants/${id}`);
      setMessage('Restaurant deleted successfully');
      fetchRestaurants();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error deleting restaurant: ${errorMessage}`);
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`${apiUrl}/ingredients/${id}`);
      setMessage('Ingredient deleted successfully');
      fetchIngredients();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error deleting ingredient: ${errorMessage}`);
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleRecoverFrancesinha = async (id) => {
    try {
      await axios.post(`${apiUrl}/francesinhas/${id}/recover`);
      setMessage('Francesinha recovered successfully');
      fetchFrancesinhas();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error recovering francesinha: ${errorMessage}`);
      console.error("Error recovering francesinha:", error);
    }
  };

  const handleRecoverRestaurant = async (id) => {
    try {
      await axios.post(`${apiUrl}/restaurants/${id}/recover`);
      setMessage('Restaurant recovered successfully');
      fetchRestaurants();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error recovering restaurant: ${errorMessage}`);
      console.error("Error recovering restaurant:", error);
    }
  };

  const handleRecoverIngredient = async (id) => {
    try {
      await axios.post(`${apiUrl}/ingredients/${id}/recover`);
      setMessage('Ingredient recovered successfully');
      fetchIngredients();
    } catch (error) {
      const errorMessage = error.response?.data?.error ? JSON.stringify(error.response.data.error) : 'Unknown error';
      setMessage(`Error recovering ingredient: ${errorMessage}`);
      console.error("Error recovering ingredient:", error);
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

  const handleCloseModal = () => {
    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Francesinha Wiki</h1>

        <Modal message={message} onClose={handleCloseModal} /> {/* Message Modal */}

        <section>
          <h2>Francesinhas</h2>
          <ul>
            {francesinhas.map(francesinha => (
              <li key={francesinha._id}>
                {francesinha.name} - {francesinha.price} - {francesinha.rating}
                <button onClick={() => handleDeleteFrancesinha(francesinha._id)}>Delete</button>
                <button onClick={() => handleRecoverFrancesinha(francesinha._id)}>Recover</button>
              </li>
            ))}
          </ul>
          <h3>Create Francesinha</h3>
          <input name="name" placeholder="Name" onChange={handleInputChange} />
          <input name="price" placeholder="Price" onChange={handleInputChange} />
          <input name="rating" placeholder="Rating" onChange={handleInputChange} />
          <div>
            <h4>Select Ingredients</h4>
            {ingredients.map(ingredient => (
              <label key={ingredient._id}>
                <input
                  type="checkbox"
                  value={ingredient.name}
                  onChange={handleIngredientChange}
                />
                {ingredient.name}
              </label>
            ))}
          </div>
          <div>
            <h4>Select Restaurant</h4>
            <select name="restaurant" onChange={handleSelectRestaurant}>
              <option value="">Select a restaurant</option>
              {restaurants.map(restaurant => (
                <option key={restaurant._id} value={restaurant.name}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleCreateFrancesinha}>Create</button>
        </section>

        <section>
          <h2>Restaurants</h2>
          <ul>
            {restaurants.map(restaurant => (
              <li key={restaurant._id}>
                {restaurant.name} - {restaurant.city} - {restaurant.country} - {restaurant.rating}
                <button onClick={() => handleDeleteRestaurant(restaurant._id)}>Delete</button>
                <button onClick={() => handleRecoverRestaurant(restaurant._id)}>Recover</button>
              </li>
            ))}
          </ul>
          <h3>Create Restaurant</h3>
          <input placeholder="Name" onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
          <input placeholder="Address" onChange={e => setNewRestaurant({ ...newRestaurant, address: e.target.value })} />
          <input placeholder="City" onChange={e => setNewRestaurant({ ...newRestaurant, city: e.target.value })} />
          <input placeholder="Country" onChange={e => setNewRestaurant({ ...newRestaurant, country: e.target.value })} />
          <input placeholder="Rating" onChange={e => setNewRestaurant({ ...newRestaurant, rating: e.target.value })} />
          <button onClick={handleCreateRestaurant}>Create</button>
        </section>

        <section>
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient._id}>
                {ingredient.name}
                <button onClick={() => handleDeleteIngredient(ingredient._id)}>Delete</button>
                <button onClick={() => handleRecoverIngredient(ingredient._id)}>Recover</button>
              </li>
            ))}
          </ul>
          <h3>Create Ingredient</h3>
          <input placeholder="Name" onChange={e => setNewIngredient({ ...newIngredient, name: e.target.value })} />
          <button onClick={handleCreateIngredient}>Create</button>
        </section>
      </header>
    </div>
  );
}

export default App;
