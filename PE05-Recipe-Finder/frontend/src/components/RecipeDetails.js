import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/api';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const data = await getRecipeById(id);
            setRecipe(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch recipe details');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(id);
                navigate('/');
            } catch (err) {
                alert('Failed to delete recipe');
            }
        }
    };

    if (loading) return <div className="loading">Loading recipe...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!recipe) return <div className="error">Recipe not found</div>;

    return (
        <div className="recipe-details-container">
            <div className="recipe-header-section">
                <Link to="/" className="back-link">← Back to Recipes</Link>
                <div className="recipe-title-section">
                    <h1>{recipe.name}</h1>
                    <span className={`difficulty-badge ${recipe.difficulty?.toLowerCase()}`}>
                        {recipe.difficulty}
                    </span>
                </div>
                <div className="recipe-meta-section">
                    <div className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        <span>Prep Time: {recipe.prepTime} minutes</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-icon">🍽️</span>
                        <span>Serves: {recipe.servings} people</span>
                    </div>
                </div>
            </div>

            <div className="recipe-content">
                <div className="ingredients-section">
                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                        {recipe.ingredients?.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="instructions-section">
                    <h3>Instructions</h3>
                    <div className="instructions-content">
                        {recipe.instructions?.split('\n').map((step, index) => (
                            <p key={index} className="instruction-step">
                                <strong>Step {index + 1}:</strong> {step}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="recipe-actions-section">
                <Link to={`/update/${recipe._id}`} className="btn btn-primary">
                    Edit Recipe
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                    Delete Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeDetails;