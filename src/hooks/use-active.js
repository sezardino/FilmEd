import {useState} from 'react';

const useActive = (current) => {
	const [active, setActive] = useState(current || false);
	const activeChange = (current) => {
		if (current !== active) {
			if (current) {
				setActive(current);
			} else {
				setActive((prev) => !prev);
			}
		}
	};
	return {active, activeChange};
};

export default useActive;
