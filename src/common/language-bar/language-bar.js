import React from 'react';

const LanguageBar = (props) => {
	const {languages, changeLanguage, active, clickHandler, currentLanguage} = props;

	if (!active) {
		return (
			<div className="nav__language language" tabIndex="1" onClick={clickHandler}>
				{currentLanguage}
			</div>
		);
	}

	const formHandler = () => {
		setTimeout(() => {
			clickHandler();
		}, 2000);
	};

	const formChangeHandler = (evt) => {
		evt.preventDefault();
		const value = evt.target.value;
		changeLanguage(value);
		clickHandler();
	};

	return (
		<form
			className="nav__language language"
			tabIndex="1"
			onChange={formChangeHandler}
			onMouseLeave={formHandler}>
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

export default LanguageBar;
