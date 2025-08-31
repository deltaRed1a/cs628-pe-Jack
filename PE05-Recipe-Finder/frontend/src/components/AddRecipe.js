import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/api';

const AddRecipe = () => {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        prepTime: '',
        servings: '',
        difficulty: 'Easy'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await createRecipe(recipe);
            navigate('/');
        } catch (error) {
            alert('Failed to add recipe. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="add-recipe-container">
            <h2>Add New Recipe</h2>
            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label htmlFor="name">Recipe Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={recipe.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter recipe name"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="prepTime">Prep Time (minutes) *</label>
                        <input
                            type="number"
                            id="prepTime"
                            name="prepTime"
                            value={recipe.prepTime}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="30"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="servings">Servings *</label>
                        <input
                            type="number"
                            id="servings"
                            name="servings"
                            value={recipe.servings}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="4"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty *</label>
                        <select
                            id="difficulty"
                            name="difficulty"
                            value={recipe.difficulty}
                            onChange={handleChange}
                            required
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients *</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Enter ingredients separated by commas (e.g., 2 cups flour, 1 tsp salt, 3 eggs)"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instructions">Cooking Instructions *</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Enter step-by-step cooking instructions (separate steps with new lines)"
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="btn btn-cancel"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        {loading ? 'Adding Recipe...' : 'Add Recipe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRecipe;