import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import LanguageBar from './language-bar';

const LanguageBarContainer = (props) => {
	return <LanguageBar {...props} />;
};

const mapStateToProps = ({logic: {languages}}) => ({
	currentLanguage: languages.activeLanguage,
	languages: languages.languages,
});

const mapDispatchToProps = (dispatch) => ({
	changeLanguage: (language) => dispatch(ActionCreator.CHANGE_LANGUAGE(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBarContainer);
