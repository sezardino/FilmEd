const TV = {
	TV: () => '/tv',
	TV_ID: (id) => `/tv/${id}`,
	TV_KEYWORDS: (id) => `/tv/${id}/keywords`,
	TV_CAST: (id) => `/tv/${id}/credits`,
	TV_REVIEW: (id) => `/tv/${id}/reviews`,
	TV_EXTERNAL_IDS: (id) => `/tv/${id}/external_ids`,
	TV_RECOMMENDATIONS: (id) => `/tv/${id}/recommendations`,
};

const MOVIE = {
	MOVIE: () => '/movie',
	MOVIE_ID: (id) => `/movie/${id}`,
	MOVIE_KEYWORDS: (id) => `/movie/${id}/keywords`,
	MOVIE_CAST: (id) => `/movie/${id}/credits`,
	MOVIE_REVIEW: (id) => `/movie/${id}/reviews`,
	MOVIE_EXTERNAL_IDS: (id) => `/movie/${id}/external_ids`,
	MOVIE_RECOMMENDATIONS: (id) => `/movie/${id}/recommendations`,
};

const URL = {
	...TV,
	...MOVIE,
	API: () => 'https://api.themoviedb.org/3',
	IMAGES: () => 'https://image.tmdb.org/t/p/original',
	SEARCH: () => '/search/multi',
	POPULAR: () => '/popular',
	TOP_RATED: () => '/top_rated',
	UPCOMING: () => '/upcoming',
	ON_THE_AIR: () => '/on_the_air',
	TRENDING_WEEK: () => '/trending/all/week',
	TRENDING_DAY: () => '/trending/all/day',
};

const SHOW_TABS = {CAST: 'cast', REVIEWS: 'reviews', SEASONS: 'seasons'};

const TYPE = {
	MOVIE: 'movie',
	TV: 'tv',
};

const tabs = {
	POPULAR: {onTv: 'On TV', inTheaters: 'In Theaters'},
	TRENDS: {today: 'Today', thisWeek: 'This Week'},
};

const SOURCE = {POPULAR: 'POPULAR', TRENDS: 'TRENDS'};

const LANGUAGES = {EN: 'en-US', RU: 'ru-RU', POL: 'pl-PL'};

export {URL, tabs, SOURCE, LANGUAGES, TYPE, SHOW_TABS};
