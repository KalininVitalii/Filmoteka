// import { Component } from 'react';
// import movies from '../data/movies.json';
import { MoviesGallery } from './MoviesGallery/MoviesGallery';
import { mapper } from 'utils/mapper';
import { Model } from './Model/Model';
import { getMovies } from 'api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { useState, useEffect } from 'react';

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [page, setPage] = useState(1);

  // state = {
  //   // movies: mapper(movies),
  //   movies: [],
  //   currentImage: null,
  //   page: 1,
  //   isLoading: false,
  //   error: null,
  //   isShown: false,
  // };
  useEffect(() => {
    if (isShown) {
      setIsLoading(true);
      getMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevMovies => [...prevMovies, ...mapper(results)]);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [page, isShown]);

  // componentDidUpdate(prevProps, prevState) {
  //   // const { movies } = this.state;
  //   // if (movies !== prevState.movies) {
  //   //   localStorage.setItem('movies', JSON.stringify(movies));
  //   // }
  //   const { isShown, page } = this.state;
  //   if ((prevState.isShown !== isShown && isShown) || prevState.page !== page) {
  //     this.fetchMovies();
  //   }
  // }

  //       fetchMovies = () => {
  //   const { page } = this.state;
  //   this.setState({ isLoading: true });
  //   fetchApi(page)
  //     .then(response => {
  //       // console.log(response);
  //       this.setState(prevState => ({
  //         movies: [...prevState.movies, ...mapper(response.data.results)],
  //       }));
  //     })
  //     .catch(error => {
  //       this.setState({ error: error.message });
  //     })
  //     .finally(() => this.setState({ isLoading: false }));
  // };

  // componentDidMount() {
  //   const movies = localStorage.getItem('movies');
  //   if (movies) {
  //     this.setState({ movies: JSON.parse(movies) });
  //   }
  // }

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
  }, []);

  const deleteMovie = movieId => {
    setMovies(prevMovies => prevMovies.filter(({ id }) => id !== movieId));
  };

  // deleteMovie = movieId => {
  //   const { movies } = this.state;
  //   const updateMovies = movies.filter(({ id }) => id !== movieId);
  //   this.setState({ movies: updateMovies });
  // };

  const updateCurrentImage = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const showMovies = () => {
    setIsShown(prevSetIsShown => !prevSetIsShown);
  };

  // fetchMovies = () => {
  //   const { page } = this.state;
  //   this.setState({ isLoading: true, error: null });
  //   fetchApi(`/api/movies?page=${page}`)
  //     .then(response => response.json())
  //     .then(movies => {
  //       this.setState({
  //         movies: [...movies, ...this.state.movies],
  //         isLoading: false,
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({ error, isLoading: false });
  //     });
  // };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Button
        text={!isShown ? 'Show movies' : 'Hide movies'}
        handlerClick={showMovies}
      />
      {isShown && (
        <>
          <MoviesGallery
            openModel={updateCurrentImage}
            movies={movies}
            deleteMovie={deleteMovie}
          />
          {!isLoading && !error && (
            <Button text="Load more" handlerClick={loadMore} />
          )}
          {isLoading && <Loader />}
          {error && <Notification message={error} />}
        </>
      )}
      {currentImage && <Model image={currentImage} closeModal={closeModal} />}
    </>
  );
};
