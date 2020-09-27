import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

const LanguageBar = (props) => {
	const {languages, changeLanguage, active, clickHandler, currentLanguage} = props;
	if (!active) {
		return (
			<div className="nav__language language" tabIndex="1" onClick={clickHandler}>
				{currentLanguage}
			</div>
		);
	}

	return (
		<form
			className="nav__language language"
			tabIndex="1"
			onChange={(evt) => {
				evt.preventDefault();
				const value = evt.target.value;
				changeLanguage(value);
				clickHandler();
			}}
			onMouseLeave={() =>
				setTimeout(() => {
					clickHandler();
				}, 2000)
			}>
			{languages.map((item, index) => {
				return (
					<label className="language__label" htmlFor={item} key={`${index}-${item}`}>
						{item}
						<input type="radio" name="language" value={item} id={item} />
					</label>
				);
			})}
		</form>
	);
};

const mapStateToProps = ({logic: {languages}}) => ({
	currentLanguage: languages.activeLanguage,
	languages: languages.languages,
});

const mapDispatchToProps = (dispatch) => ({
	changeLanguage: (language) => dispatch(ActionCreator.CHANGE_LANGUAGE(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageBar);
