import {useState, useEffect} from 'react';
import {shownList} from '../services';

const useList = (list = [], count) => {
	const [currentList, setCurrentList] = useState([]);
	const [showCount, setShowCount] = useState([0, count]);
	useEffect(() => {
		setCurrentList(shownList(list, showCount));
	}, [list, showCount]);
	const arrowHolder = (n) => {
		setShowCount((prevCount) => {
			let [a, b] = prevCount;
			const showCountOnStart = [0, count];
			const showCountOnEnd = [list.length - count, list.length];
			a += n * count;
			b += n * count;
			if (a >= list.length) {
				return showCountOnStart;
			}
			if (b <= 0) {
				return showCountOnEnd;
			}
			return [a, b];
		});
	};

	return [currentList, arrowHolder];
};

export default useList;
