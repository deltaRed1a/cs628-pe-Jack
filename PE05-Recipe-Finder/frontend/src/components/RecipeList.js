import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes, deleteRecipe } from '../services/api';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const data = await getAllRecipes();
            setRecipes(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch recipes');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(id);
                setRecipes(recipes.filter(recipe => recipe._id !== id));
            } catch (err) {
                alert('Failed to delete recipe');
            }
        }
    };

    if (loading) return <div className="loading">Loading recipes...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="recipe-list-container">
            <h2>All Recipes ({recipes.length})</h2>
            {recipes.length === 0 ? (
                <div className="no-recipes">
                    <p>No recipes found. <Link to="/add">Add your first recipe!</Link></p>
                </div>
            ) : (
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <div key={recipe._id} className="recipe-card">
                            <div className="recipe-header">
                                <h3>
                                    <Link to={`/recipe/${recipe._id}`} className="recipe-title">
                                        {recipe.name}
                                    </Link>
                                </h3>
                                <span className={`difficulty ${recipe.difficulty?.toLowerCase()}`}>
                                    {recipe.difficulty}
                                </span>
                            </div>
                            <div className="recipe-meta">
                                <span>⏱️ {recipe.prepTime} mins</span>
                                <span>🍽️ Serves {recipe.servings}</span>
                            </div>
                            <div className="recipe-ingredients">
                                <strong>Ingredients:</strong> {recipe.ingredients?.slice(0, 3).join(', ')}
                                {recipe.ingredients?.length > 3 && '...'}
                            </div>
                            <div className="recipe-actions">
                                <Link to={`/update/${recipe._id}`} className="btn btn-edit">
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(recipe._id)}
                                    className="btn btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;