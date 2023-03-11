export const MoviesGallery = ({ movies, deleteMovie, openModel }) => {
  return (
    <ul>
      {movies.map(({ title, id, votes, image }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <button
              type="button"
              onClick={() => openModel({ src: image, alt: title })}
            >
              Open Poster
            </button>
            <button
              type="button"
              onClick={() => {
                deleteMovie(id);
              }}
            >
              Delate
            </button>
          </li>
        );
      })}
    </ul>
  );
};
