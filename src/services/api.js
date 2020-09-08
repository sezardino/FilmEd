const URL = {
	API: () => 'https://api.themoviedb.org/3',
	MOVIE: () => '/movie',
	TV: () => '/tv',
	POPULAR: () => '/popular',
	TOP_RATED: () => '/top_rated',
	UPCOMING: () => '/upcoming',
	NOW_PLAYING: () => '/now_playing',
	ON_THE_AIR: () => '/on_the_air',
};

class Api {
	constructor(language) {
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
		return data.result;
	};

	getNowPlayingMovies = async () => {
		const data = await this.getResources(`${URL.MOVIE()}${URL.NOW_PLAYING()}`);
		return data.result;
	};

	getPopularTV = async () => {
		const data = await this.getResources(`${URL.TV()}${URL.POPULAR()}`);
		return data.result;
	};
}

export default Api;
