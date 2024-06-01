import React from 'react';
import './FrancesinhaForm.css';

const FrancesinhaForm = ({ newFrancesinha, ingredients, restaurants, handleInputChange, handleIngredientChange, handleSelectRestaurant, handleCreateFrancesinha, handlePictureChange }) => (
  <form>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={newFrancesinha.name || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input type="number" name="price" id="price" value={newFrancesinha.price || ''} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label htmlFor="rating">Rating</label>
      <input type="number" name="rating" id="rating" value={newFrancesinha.rating || ''} onChange={handleInputChange} min="1" max="5" />
    </div>
    <div className="form-group">
      <label>Ingredients</label>
      {ingredients.map((ingredient) => (
        <div key={ingredient._id}>
          <input type="checkbox" id={`ingredient-${ingredient._id}`} value={ingredient.name} onChange={handleIngredientChange} />
          <label htmlFor={`ingredient-${ingredient._id}`}>{ingredient.name}</label>
        </div>
      ))}
    </div>
    <div className="form-group">
      <label htmlFor="restaurant">Restaurant</label>
      <select name="restaurant" id="restaurant" value={newFrancesinha.restaurant || ''} onChange={handleSelectRestaurant}>
        {restaurants.map((restaurant) => (
          <option key={restaurant._id} value={restaurant.name}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="image">Picture</label>
      <input type="file" name="image" id="image" onChange={handlePictureChange} />
    </div>
    <button type="button" onClick={handleCreateFrancesinha}>Create</button>
  </form>
);

export default FrancesinhaForm;
