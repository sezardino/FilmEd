import {useEffect} from 'react';

const useRender = (action, deps = '') => {
	useEffect(() => {
		console.log(1);
		action();
	}, [deps]);
};

export default useRender;
