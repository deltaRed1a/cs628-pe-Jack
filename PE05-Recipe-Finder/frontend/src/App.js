import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="app-header">
                    <h1>🍳 Recipe Finder</h1>
                    <nav className="main-nav">
                        <Link to="/" className="nav-link">All Recipes</Link>
                        <Link to="/add" className="nav-link">Add Recipe</Link>
                    </nav>
                </header>
                
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<RecipeList />} />
                        <Route path="/recipe/:id" element={<RecipeDetails />} />
                        <Route path="/add" element={<AddRecipe />} />
                        <Route path="/update/:id" element={<UpdateRecipe />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;