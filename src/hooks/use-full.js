import {useState} from 'react';

const useFull = () => {
	const [full, setFull] = useState(false);

	const changeFull = () => {
		setFull((prev) => !prev);
	};

	return [full, changeFull];
};

export default useFull;
