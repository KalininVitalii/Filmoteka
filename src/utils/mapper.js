export const mapper = movies => {
  return movies.map(
    ({ title, id, backdrop_path: image, vote_count: votes }) => ({
      title,
      id,
      image,
      votes,
    })
  );
};
