import { ACTORS, DIRECTORS, GENRES, KEYWORDS, MOVIES, MOVIE_RATINGS, PRODUCTION_COMPANIES } from "../table-names";

export const selectActorByName = (fullName: string): string => {
  return `select id, full_name FROM ${ACTORS} where full_name = '${fullName}'`
};

export const selectKeyword = (keyword: string): string => {
  return `select id, keyword FROM ${KEYWORDS} where keyword = '${keyword}'`
};

export const selectDirector = (director: string): string => {
  return `select id, full_name FROM ${DIRECTORS} where full_name = '${director}'`
};

export const selectGenre = (genre: string): string => {
  return `select id, genre FROM ${GENRES} where genre = '${genre}'`
};

export const selectProductionCompany = (company: string): string => {
  return `select id, company_name FROM ${PRODUCTION_COMPANIES} where company_name = '${company}'`
};

export const selectMovieById = (id: number): string => {
  return `SELECT id, imdb_id, popularity, budget, budget_adjusted, 
  revenue, revenue_adjusted, original_title, homepage, tagline, 
  overview, runtime, release_date 
  FROM ${MOVIES} 
  WHERE id = ${id}`
};

export const selectGenreById = (id: number): string => {
  return `SELECT id, genre
  FROM ${GENRES}
  WHERE id = ${id}`
};

export const selectDirectorById = (id: number): string => {
  return `SELECT id, full_name
  FROM ${DIRECTORS}
  WHERE id = ${id}`
};

export const selectActorById = (id: number): string => {
  return `SELECT id, full_name
  FROM ${ACTORS}
  WHERE id = ${id}`
};

export const selectKeywordById = (id: number): string => {
  return `SELECT id, keyword
  FROM ${KEYWORDS}
  WHERE id = ${id}`
};

export const selectProductionCompanyById = (id: number): string => {
  return `SELECT id, company_name
  FROM ${PRODUCTION_COMPANIES}
  WHERE id = ${id}`
};

export const selectMovie = (imdbId: string): string => {
  return `SELECT id, imdb_id, popularity, budget,
  budget_adjusted, revenue, revenue_adjusted, original_title,
  homepage, tagline, overview, runtime, release_date
  FROM ${MOVIES}
  WHERE imdb_id = '${imdbId}'`
};

export const selectMovieId = (imdbId: string): string => {
  return `SELECT id
  FROM ${MOVIES}
  WHERE imdb_id = '${imdbId}'`
};

export const selectRatingsByUserID = (userId: number): string => {
  return `SELECT user_id, movie_id, rating, time_created
  FROM ${MOVIE_RATINGS}
  WHERE user_id = ${userId}`
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `select g.genre from movie_genres mg join genres g on g.id = mg.genre_id where mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `select a.full_name from movie_actors ma join actors a on a.id = ma.actor_id where ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `select d.full_name from movie_directors md join directors d on d.id = md.director_id where md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `select k.keyword from movie_keywords mk join keywords k on k.id = mk.keyword_id where mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `select pc.company_name from movie_production_companies mpc join production_companies pc on pc.id = mpc.company_id where mpc.movie_id = ${movieId}`;
};

/**
 * select count as c, because an object is returned and expected property name is c
 */
export const selectCount = (table: string): string => {
  return `SELECT COUNT(*) as c FROM ${table}`
};
