import {useEffect, useCallback, useMemo} from 'react';

const useLoad = (fun, dep) => {
	const nDep = dep.length > 0 ? [...dep] : [dep];
	const newFunc = useCallback(fun);
	useEffect(() => {
		newFunc();
	}, nDep);
};

export default useLoad;
