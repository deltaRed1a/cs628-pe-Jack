const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const recipes = await db.collection('recipes').find({}).toArray();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const recipe = await db.collection('recipes')
            .findOne({ _id: new ObjectId(req.params.id) });
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new recipe
router.post('/', async (req, res) => {
    try {
        const { name, ingredients, instructions, prepTime, servings, difficulty } = req.body;
        const db = getDB();
        
        const newRecipe = {
            name,
            ingredients: ingredients.split(',').map(i => i.trim()),
            instructions,
            prepTime,
            servings: parseInt(servings),
            difficulty,
            createdAt: new Date()
        };
        
        const result = await db.collection('recipes').insertOne(newRecipe);
        res.status(201).json({ _id: result.insertedId, ...newRecipe });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update recipe
router.put('/:id', async (req, res) => {
    try {
        const { name, ingredients, instructions, prepTime, servings, difficulty } = req.body;
        const db = getDB();
        
        const updateData = {
            name,
            ingredients: ingredients.split ? ingredients.split(',').map(i => i.trim()) : ingredients,
            instructions,
            prepTime,
            servings: parseInt(servings),
            difficulty,
            updatedAt: new Date()
        };
        
        const result = await db.collection('recipes')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
            
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.json({ _id: req.params.id, ...updateData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete recipe
router.delete('/:id', async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('recipes')
            .deleteOne({ _id: new ObjectId(req.params.id) });
            
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;