import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/api';

const UpdateRecipe = () => {
    const { id } = useParams();
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
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const data = await getRecipeById(id);
            setRecipe({
                name: data.name,
                ingredients: Array.isArray(data.ingredients) ? data.ingredients.join(', ') : data.ingredients,
                instructions: data.instructions,
                prepTime: data.prepTime.toString(),
                servings: data.servings.toString(),
                difficulty: data.difficulty
            });
            setFetchLoading(false);
        } catch (error) {
            alert('Failed to fetch recipe details');
            navigate('/');
        }
    };

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
            await updateRecipe(id, recipe);
            navigate(`/recipe/${id}`);
        } catch (error) {
            alert('Failed to update recipe. Please try again.');
            setLoading(false);
        }
    };

    if (fetchLoading) return <div className="loading">Loading recipe...</div>;

    return (
        <div className="update-recipe-container">
            <h2>Update Recipe</h2>
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
                        placeholder="Enter ingredients separated by commas"
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
                        placeholder="Enter step-by-step cooking instructions"
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        onClick={() => navigate(`/recipe/${id}`)}
                        className="btn btn-cancel"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        {loading ? 'Updating Recipe...' : 'Update Recipe'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateRecipe;