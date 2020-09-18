import {URL, SOURCE, LANGUAGES, TYPE} from '../const';

class Api {
	constructor(language) {
		this.key = '777b90ee2268c6946e784ffda7072fd3';
		this.language = LANGUAGES[language];
	}

	getResources = async (url, query) => {
		const response = await fetch(
			`${URL.API()}${url}?api_key=${this.key}&language=${this.language}&query=${query}`
		);
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

	getDetails = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_ID(id));
				return this._transformDetails(data);
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_ID(id));
				return this._transformMovieDetails(data);
			default:
				return;
		}
	};

	getKeywords = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_KEYWORDS(id));
				return data.results;
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_KEYWORDS(id));
				return data.keywords;
			default:
				return;
		}
	};

	getExternalIds = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_EXTERNAL_IDS(id));
				return this._transformExternalIds(data);
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_EXTERNAL_IDS(id));
				return this._transformExternalIds(data);
			default:
				return;
		}
	};

	getCast = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_CAST(id));
				return data;
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_CAST(id));
				return data;
			default:
				return;
		}
	};

	getReviews = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_REVIEW(id));
				return data.results;
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_REVIEW(id));
				return data.results;
			default:
				return;
		}
	};

	getRecommendations = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_RECOMMENDATIONS(id));
				return data.results.map(this._transformRecommendations);
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_RECOMMENDATIONS(id));
				return data.results.map(this._transformRecommendations);
			default:
				return;
		}
	};

	getSearch = async (query) => {
		const data = await this.getResources(`${URL.SEARCH()}`, query);
		return data.results;
	};

	_transformExternalIds = (data) => [
		{source: 'facebook', link: `https://www.facebook.com/${data.facebook_id}`},
		{source: 'instagram', link: `https://www.instagram.com/${data.instagram_id}`},
		{source: 'twitter', link: `https://twitter.com/${data.twitter_id}`},
	];

	_transformTrendsData = (movie) => {
		if (movie.media_type === 'movie') {
			return this._transformMovieData(movie);
		} else {
			return this._transformTVData(movie);
		}
	};

	_transformMovieDetails = (movie) => ({
		background: movie.backdrop_path,
		genres: movie.genres,
		homepage: movie.homepage,
		id: movie.id,
		language: movie.original_language,
		name: movie.title,
		overview: movie.overview,
		poster: movie.poster_path,
		firstAir: movie.release_date,
		runTime: movie.runtime,
		rating: movie.vote_average,
	});

	_transformDetails = (tv) => {
		const creatorsTransform = (data) => {
			return {
				id: data.id,
				creditId: data.credit_id,
				gender: data.gender,
				name: data.name,
				profilePath: data.profile_path,
			};
		};
		const seasonsTransform = (data) => {
			return {
				id: data.id,
				name: data.name,
				airDate: data.air_date,
				episodeCount: data.episode_count,
				overview: data.overview,
				poster: data.poster_path,
				seasonNumber: data.season_number,
			};
		};
		return {
			background: tv.backdrop_path,
			creators: tv.created_by.map(creatorsTransform),
			runTime: tv.episode_run_time[0],
			firstAir: tv.first_air_date,
			genres: tv.genres,
			homepage: tv.homepage,
			id: tv.id,
			inProduction: tv.in_production,
			language: tv.original_language,
			lastAirDate: tv.last_air_date,
			name: tv.name,
			episodes: tv.number_of_episodes,
			originalName: tv.original_name,
			overview: tv.overview,
			poster: tv.poster_path,
			seasons: tv.seasons.map(seasonsTransform),
			status: tv.status,
			type: tv.type,
			rating: tv.vote_average,
		};
	};

	_transformRecommendations = (tv) => ({
		id: tv.id,
		name: tv.name || tv.title,
		background: tv.backdrop_path,
		rating: tv.vote_average,
	});

	_transformMovieData = (movie) => ({
		id: movie.id,
		originalTitle: movie.original_title,
		title: movie.title,
		background: movie.backdrop_path,
		originalLanguage: movie.original_language,
		rating: movie.vote_average,
		poster: movie.poster_path,
		releaseDate: movie.release_date,
	});

	_transformTVData = (movie) => ({
		id: movie.id,
		originalTitle: movie.original_name,
		title: movie.name,
		background: movie.backdrop_path,
		originalLanguage: movie.original_language,
		rating: movie.vote_average,
		poster: movie.poster_path,
		releaseDate: movie.first_air_date,
	});
}

export default Api;
