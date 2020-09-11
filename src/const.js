const URL = {
	API: () => 'https://api.themoviedb.org/3',
	IMAGES: () => 'https://image.tmdb.org/t/p/original',
	SEARCH: () => '/search/multi',
	MOVIE: () => '/movie',
	TV: () => '/tv',
	POPULAR: () => '/popular',
	TOP_RATED: () => '/top_rated',
	UPCOMING: () => '/upcoming',
	ON_THE_AIR: () => '/on_the_air',
	TRENDING_WEEK: () => '/trending/all/week',
	TRENDING_DAY: () => '/trending/all/day',
};

const tabs = {
	POPULAR: {onTv: 'On TV', inTheaters: 'In Theaters'},
	TRENDS: {today: 'Today', thisWeek: 'This Week'},
};

const SOURCE = {POPULAR: 'POPULAR', TRENDS: 'TRENDS'};

const LANGUAGES = {EN: 'en-US', RU: 'ru-RU', POL: 'pl-PL'};

export {URL, tabs, SOURCE, LANGUAGES};
