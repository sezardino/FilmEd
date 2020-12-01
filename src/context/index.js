import React from 'react';
import {connect} from 'react-redux';
import Api from '../api';

const MovieContext = React.createContext();

const FilmsProvider = (props) => {
	const {children, language} = props;
	return <MovieContext.Provider value={new Api(language)}>{children}</MovieContext.Provider>;
};

const mapStateToProps = ({logic: {languages}}) => ({
	language: languages.activeLanguage,
});

export {MovieContext};
export default connect(mapStateToProps)(FilmsProvider);
