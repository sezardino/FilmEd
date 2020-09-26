import {useEffect, useCallback} from 'react';

const useLoad = (fun, ...dep) => {
	const newFunc = useCallback(fun);
	useEffect(() => {
		newFunc();
	}, [...dep]);
};

export default useLoad;
