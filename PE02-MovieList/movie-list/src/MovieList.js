import React, { useState } from 'react';

const moviesData = [
  { title: 'Inception', genre: 'Sci-Fi', releaseYear: 2010 },
  { title: 'Titanic', genre: 'Romance', releaseYear: 1997 },
  { title: 'The Matrix', genre: 'Sci-Fi', releaseYear: 1999 },
  { title: 'The Notebook', genre: 'Romance', releaseYear: 2004 },
  { title: 'The Godfather', genre: 'Crime', releaseYear: 1972 },
];

function MovieList() {
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  const genres = ['All Genres', ...new Set(moviesData.map(movie => movie.genre))];

  const filteredMovies =
    selectedGenre === 'All Genres'
      ? moviesData
      : moviesData.filter(movie => movie.genre === selectedGenre);

  const handleClick = (title) => {
    alert(`You clicked on "${title}"`);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <label>Filter by Genre: </label>
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        {genres.map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.title} onClick={() => handleClick(movie.title)}>
            <strong>{movie.title}</strong> - {movie.genre} ({movie.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
