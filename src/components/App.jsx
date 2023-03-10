import { Component } from 'react';
import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { mapper } from 'utils/mapper';

export class App extends Component {
  state = {
    movies: mapper(movies),
  };
  componentDidUpdate(prevProps, prevState) {
    const { movies } = this.state;
    if (movies !== prevState.movies) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }
  componentDidMount() {
    const { movies } = this.state;
    if (movies) {
      this.setState({ movies: JSON.parse(movies) });
    }
  }

  render() {
    const { movies } = this.state;
    return <MoviesGallery movies={movies} />;
  }
}
