import {useState} from 'react';

const useActive = (current) => {
	const [active, setActive] = useState(current || false);
	const activeChange = () => {
		if (current) {
			setActive(current);
		} else {
			setActive((prev) => !prev);
		}
	};

	const returned = current ? current : active;
	return {returned, activeChange};
};

export default useActive;
