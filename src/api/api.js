import {URL, SOURCE, LANGUAGES, TYPE} from '../const/const';
import {
	_transformExternalIds,
	_transformTrendsData,
	_transformMovieDetails,
	_transformDetails,
	_transformRecommendations,
	_transformMovieData,
	_transformTVData,
	_transformPersonData,
	_transformPersonCreditsData,
	_transformSearchData,
} from './api-utils';
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
		return data.results.map(_transformMovieData);
	};

	getInTheater = async () => {
		const data = await this.getResources(`${URL.MOVIE()}${URL.UPCOMING()}`);
		return data.results.map(_transformMovieData);
	};

	getPopularTV = async () => {
		const data = await this.getResources(`${URL.TV()}${URL.POPULAR()}`);
		return data.results.map(_transformTVData);
	};

	getTrendsDay = async () => {
		const data = await this.getResources(`${URL.TRENDING_DAY()}`);
		return data.results.map(_transformTrendsData);
	};

	getTrendsWeek = async () => {
		const data = await this.getResources(`${URL.TRENDING_WEEK()}`);
		return data.results.map(_transformTrendsData);
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
				return _transformDetails(data);
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_ID(id));
				return _transformMovieDetails(data);
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
				return _transformExternalIds(data);
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_EXTERNAL_IDS(id));
				return _transformExternalIds(data);
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

	getTrailers = async (id, type) => {
		let data;
		switch (type) {
			case TYPE.TV:
				data = await this.getResources(URL.TV_TRAILERS(id));
				return data.results;
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_TRAILERS(id));
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
				return data.results.map((item) => _transformRecommendations(item, TYPE.TV));
			case TYPE.MOVIE:
				data = await this.getResources(URL.MOVIE_RECOMMENDATIONS(id));
				return data.results.map((item) => _transformRecommendations(item, TYPE.MOVIE));
			default:
				return;
		}
	};

	getSearch = async (query) => {
		const data = await this.getResources(`${URL.SEARCH()}`, query);
		const searchData = data.results.map(_transformSearchData);
		console.log(data);
		return {...data, results: [...searchData]};
	};

	getPerson = async (id) => {
		const data = await this.getResources(`${URL.PERSON_ID(id)}`);
		return _transformPersonData(data);
	};

	getPersonCredits = async (id) => {
		const data = await this.getResources(`${URL.PERSON_CREDITS(id)}`);
		return _transformPersonCreditsData(data);
	};
}

export default Api;
