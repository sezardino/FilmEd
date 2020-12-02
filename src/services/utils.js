import {TYPE} from '../const/const';

const findTab = (tabs, active) => {
	const values = Object.values(tabs);
	const keys = Object.keys(tabs);
	const index = values.findIndex((item) => item === active);
	const current = keys[index];
	return current;
};

const linkTo = (type, id) => {
	return type === TYPE.MOVIE
		? `/movie/${id}`
		: type === TYPE.TV
		? `/show/${id}`
		: type === TYPE.PERSON
		? `/person/${id}`
		: null;
};

const sortByPopularity = (a, b) => {
	if (a.vote < b.vote) {
		return 1;
	}
	if (a.vote > b.vote) {
		return -1;
	}
	return 0;
};

const sortByDate = (a, b) => {
	const dateA = new Date(a.release);
	const dateB = new Date(b.release);
	if (+dateA < +dateB) {
		return 1;
	}
	if (+dateA > +dateB) {
		return -1;
	}
	return 0;
};

const shownList = (data, showCount, count = 0) => {
	let [a, b] = showCount;
	a += count;
	b += count;
	const currentList = data.slice(a, b);

	return currentList;
};

const makeUniqueArr = (arr1 = [], arr2 = []) => {
	const newArr = [];
	[...arr1, ...arr2].map((item) => {
		const match = newArr.find((someItem) => someItem.id === item.id);
		if (!match) {
			newArr.push(item);
		}
	});
	return newArr;
};

export {findTab, sortByPopularity, shownList, sortByDate, linkTo, makeUniqueArr};
