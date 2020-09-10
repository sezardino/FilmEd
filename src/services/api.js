import {URL, SOURCE} from '../const';

class Api {
	constructor(language = 'ru-RU') {
		this.key = '777b90ee2268c6946e784ffda7072fd3';
		this.language = language;
	}

	getResources = async (url) => {
		const response = await fetch(`${URL.API()}${url}?api_key=${this.key}&${this.language}`);
		if (!response.ok) {
			throw new Error(`Error status ${response.status}`);
		}

		const data = await response.json();
		return data;
	};

	getPopularMovies = async () => {
		const data = await this.getResources(`${URL.MOVIE()}${URL.POPULAR()}`);
		return data.results.map(this._transformMovieData);
	};

	getInTheater = async () => {
		const data = await this.getResources(`${URL.MOVIE()}${URL.UPCOMING()}`);
		return data.results.map(this._transformMovieData);
	};

	getPopularTV = async () => {
		const data = await this.getResources(`${URL.TV()}${URL.POPULAR()}`);
		return data.results.map(this._transformTVData);
	};
	getTrendsDay = async () => {
		const data = await this.getResources(`${URL.TRENDING_DAY()}`);
		return data.results.map(this._transformTrendsData);
	};
	getTrendsWeek = async () => {
		const data = await this.getResources(`${URL.TRENDING_WEEK()}`);
		return data.results.map(this._transformTrendsData);
	};

	getPopular = async () => {
		const onTv = await this.getPopularTV();
		const inTheaters = await this.getInTheater();

		return {
			popularData: {onTv, inTheaters},
			source: SOURCE.POPULAR,
		};
	};

	getTrends = async () => {
		const today = await this.getTrendsDay();
		const thisWeek = await this.getTrendsWeek();

		return {trendsData: {today, thisWeek}, source: SOURCE.TRENDS};
	};

	_transformTrendsData = (movie) => {
		if (movie.media_type === 'movie') {
			return this._transformMovieData(movie);
		} else {
			return this._transformTVData(movie);
		}
	};

	_transformMovieData = (movie) => ({
		id: movie.id,
		originalTitle: movie.original_title,
		title: movie.title,
		background: `${URL.IMAGES()}${movie.backdrop_path}`,
		originalLanguage: movie.original_language,
		rating: movie.vote_average,
		poster: `${URL.IMAGES()}${movie.poster_path}`,
		releaseDate: movie.release_date,
	});

	_transformTVData = (movie) => ({
		id: movie.id,
		originalTitle: movie.original_name,
		title: movie.name,
		background: `${URL.IMAGES()}${movie.backdrop_path}`,
		originalLanguage: movie.original_language,
		rating: movie.vote_average,
		poster: `${URL.IMAGES()}${movie.poster_path}`,
		releaseDate: movie.first_air_date,
	});
}

export default Api;
