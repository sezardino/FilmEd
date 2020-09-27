import {useContext} from 'react';
import {MovieContext} from '../context';

const useMovieContext = () => {
	return useContext(MovieContext);
};

export default useMovieContext;
