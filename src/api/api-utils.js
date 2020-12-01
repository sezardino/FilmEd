import {GENDER, TYPE} from '../const/const';

const _transformMovieData = (movie) => ({
	type: TYPE.MOVIE,
	id: movie.id,
	originalTitle: movie.original_title,
	title: movie.title,
	background: movie.backdrop_path,
	originalLanguage: movie.original_language,
	rating: movie.vote_average,
	poster: movie.poster_path,
	releaseDate: movie.release_date,
});

const _transformTVData = (movie) => ({
	type: TYPE.TV,
	id: movie.id,
	originalTitle: movie.original_name,
	title: movie.name,
	originalLanguage: movie.original_language,
	rating: movie.vote_average,
	poster: movie.poster_path,
	background: movie.backdrop_path,
	releaseDate: movie.first_air_date,
});

const _transformExternalIds = (data) => [
	{source: 'facebook', link: `https://www.facebook.com/${data.facebook_id}`},
	{source: 'instagram', link: `https://www.instagram.com/${data.instagram_id}`},
	{source: 'twitter', link: `https://twitter.com/${data.twitter_id}`},
];

const _transformData = (movie) => {
	if (movie.media_type === TYPE.MOVIE) {
		return _transformMovieData(movie);
	} else if (movie.media_type === TYPE.TV) {
		return _transformTVData(movie);
	}
};

const _transformTrendsData = (movie) => {
	if (movie.media_type === TYPE.MOVIE) {
		return _transformMovieData(movie);
	} else if (movie.media_type === TYPE.TV) {
		return _transformTVData(movie);
	}
};

const _transformMovieDetails = (movie) => ({
	type: 'movie',
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

const _transformDetails = (tv) => {
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

const _transformSearchData = (data) => {
	const {known_for = []} = data;
	return {
		id: data.id,
		name: data.name || data.title,
		poster: data.poster_path || data.profile_path,
		knownFor: {department: data.known_for_department, data: known_for.map(_transformData)},
		overview: data.overview,
		type: data.media_type,
	};
};

const _transformRecommendations = (tv, type) => ({
	type,
	id: tv.id,
	name: tv.name || tv.title,
	poster: tv.poster_path,
	rating: tv.vote_average,
});

const _transformPersonData = (person) => ({
	biography: person.biography,
	birthday: person.birthday,
	deathday: person.deathday,
	gender: GENDER[person.gender],
	homepage: person.homepage,
	id: person.id,
	knownFor: person.known_for_department,
	name: person.name,
	placeOfBirth: person.place_of_birth,
	popularity: person.popularity,
	photo: person.profile_path,
});

const _transformPersonCreditsData = (data) => {
	const cast = data.cast.map((item) => ({
		id: item.id,
		poster: item.poster_path,
		character: item.character,
		release: item.release_date,
		type: item.media_type,
		vote: item.vote_average,
		title: item.title || item.original_name,
		episodeCount: item.episode_count,
	}));
	const crew = data.crew.map((item) => ({
		id: item.id,
		type: item.type,
		poster: item.poster_path,
		release: item.release_date,
		title: item.title || item.original_name,
		vote: item.vote_average,
		job: item.job,
		department: item.department,
	}));
	return {cast, crew};
};

export {
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
};
