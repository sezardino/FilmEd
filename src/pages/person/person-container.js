import React from 'react';
import Person from './person';
import {connect} from 'react-redux';
import {useLoad} from '../../hooks';
import {makeUniqueArr} from '../../services';
import {sortByPopularity} from '../../services/utils';
import {ThunkCreator} from '../../reducer';

const PersonContainer = (props) => {
	const {
		getData,
		language,
		credits: {cast = [], crew = []},
		id,
	} = props;
	useLoad(() => getData(id, language), language);

	const famousData = makeUniqueArr(cast, crew).sort(sortByPopularity);
	const castData = makeUniqueArr(cast).sort(sortByPopularity);
	const crewData = makeUniqueArr(crew).sort(sortByPopularity);

	return <Person {...props} famousData={famousData} castData={castData} crewData={crewData} />;
};

const mapStateToProps = ({person, logic}) => {
	return {
		language: logic.languages.activeLanguage,
		data: person.data,
		credits: person.credits,
		actingCredits: person.credits.cast,
		crewCredits: person.credits.cast,
	};
};

const mapDispatchToProps = {
	getData: ThunkCreator.getPersonData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonContainer);
