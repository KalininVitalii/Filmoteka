import { Component } from 'react';
// import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { mapper } from 'utils/mapper';
import { Model } from './Model/Model';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    // movies: mapper(movies),
    movies: [],
    currentImage: null,
    page: 1,
    isLoading: false,
    error: null,
    isShown: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { movies } = this.state;
    if (movies !== prevState.movies) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }
  componentDidMount() {
    const movies = localStorage.getItem('movies');
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }

  deleteMovie = movieId => {
    const { movies } = this.state;
    const updateMovies = movies.filter(({ id }) => id !== movieId);
    this.setState({ movies: updateMovies });
  };

  updateCurrentImage = image => {
    this.setState({ currentImage: image });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  showMovies = () => {
    this.setState(prevState => ({ isShown: !prevState.isShown }));
  };

  fetchMovies = () => {
    const { page } = this.state;
    this.setState({ isLoading: true, error: null });
    fetchApi(`/api/movies?page=${page}`)
      .then(response => response.json())
      .then(movies => {
        this.setState({
          movies: [...movies, ...this.state.movies],
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  render() {
    const { movies, currentImage, isShown } = this.state;
    return (
      <>
        <Button
          text={!isShown ? 'Show movies' : 'Hide movies'}
          handlerClick={this.showMovies}
        />
        {isShown && (
          <MoviesGallery
            openModel={this.updateCurrentImage}
            movies={movies}
            deleteMovie={this.deleteMovie}
          />
        )}
        {currentImage && (
          <Model image={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
