import {useState} from 'react';

const useToggle = () => {
	const [active, setActive] = useState(false);
	const activeChange = () => {
		setActive((prev) => !prev);
	};
	return [active, activeChange];
};

export default useToggle;
