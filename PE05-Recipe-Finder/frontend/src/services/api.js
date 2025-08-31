const API_BASE_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

export const getAllRecipes = async () => {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    return handleResponse(response);
};

export const getRecipeById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    return handleResponse(response);
};

export const createRecipe = async (recipe) => {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });
    return handleResponse(response);
};

export const updateRecipe = async (id, recipe) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });
    return handleResponse(response);
};

export const deleteRecipe = async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};