export const MoviesGallery = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ title, id, votes }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <button type="button">Delate</button>
          </li>
        );
      })}
    </ul>
  );
};
