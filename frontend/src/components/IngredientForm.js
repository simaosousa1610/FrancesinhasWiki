import React from 'react';

const IngredientForm = ({ newIngredient, handleInputChange, handleCreateIngredient }) => (
  <div>
    <h3>Create Ingredient</h3>
    <input placeholder="Name" onChange={e => handleInputChange(e, 'name')} />
    <button onClick={handleCreateIngredient}>Create</button>
  </div>
);

export default IngredientForm;
