import React from 'react';
import Person from './person';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useLoad} from '../../hooks';
import {makeUniqueArr} from '../../services';
import {sortByPopularity} from '../../services/utils';

const PersonContainer = (props) => {
	const {
		getPerson,
		language,
		credits: {cast = [], crew = []},
	} = props;
	useLoad(getPerson, language);

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

const mapDispatchToProps = (dispatch, ownProps) => {
	const {context, id} = ownProps;
	return {
		getPerson: () => {
			context.getPerson(id).then((data) => dispatch(ActionCreator.GET_PERSON(data)));
			context.getPersonCredits(id).then((data) => dispatch(ActionCreator.GET_PERSON_CREDITS(data)));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonContainer);
