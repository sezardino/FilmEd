import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';
import {useFull, useLoad} from '../../hooks/';
import {PersonWorksList} from '../app-components/lists';
import {sortByPopularity} from '../../services/utils';
import WorksList from '../works-list';
import {WORK_LIST_TYPE} from '../../const';

const PersonPage = (props) => {
	const {getPerson, data, language, credits = {}} = props;
	const {cast = [], crew = []} = credits;
	const {full, changeFull} = useFull();
	useLoad(getPerson, language);
	const {
		biography = '',
		birthday,
		deathday,
		gender,
		homepage,
		knownFor,
		name,
		placeOfBirth,
		photo,
	} = data;
	const biographyText = full
		? biography
		: biography.length > 0
		? `${biography.slice(0, 300)} ...`
		: `The are no information about this ${name}`;
	const showMore =
		biography.length < 600 || full ? null : (
			<button className="biography__more" onClick={changeFull}>
				Read more
			</button>
		);
	const hideMore = full ? (
		<button className="biography__more" onClick={changeFull}>
			Hide
		</button>
	) : null;
	return (
		<main className="person-page container">
			<h1 className="hidden">Person Page</h1>
			<section className="sidebar">
				<section className="information">
					<p className="img-wrapper information__image">
						<img src={`http://image.tmdb.org/t/p/w400${photo}`} alt="person" />
					</p>
					<ul className="social information__social">
						<li className="social__item">
							<a href={homepage} className="social__link">
								<img src="" alt="" />
							</a>
						</li>
						<li className="social__item">
							<a href="#" className="social__link">
								<img src="" alt="" />
							</a>
						</li>
						<li className="social__item">
							<a href="#" className="social__link">
								<img src="" alt="" />
							</a>
						</li>
						<li className="social__item">
							<a href="#" className="social__link">
								<img src="" alt="" />
							</a>
						</li>
					</ul>

					<div className="information__wrapper">
						<h2 className="information__title">Personal Data</h2>
						<ul className="info-list information__info-list">
							<li className="info-list__item">
								<span className="info-list__descr">Birth day </span>
								<span className="info-list__data">{birthday}</span>
							</li>
							{deathday && (
								<li className="info-list__item">
									<span className="info-list__descr">Dearth Year </span>
									<span className="info-list__data">{deathday}</span>
								</li>
							)}

							<li className="info-list__item">
								<span className="info-list__descr">Were are birth</span>
								<span className="info-list__data">{placeOfBirth}</span>
							</li>

							<li className="info-list__item">
								<span className="info-list__descr">Gender</span>
								<span className="info-list__data">{gender}</span>
							</li>

							<li className="info-list__item">
								<span className="info-list__descr">Known For </span>
								<span className="info-list__data">{knownFor}</span>
							</li>
						</ul>
					</div>
				</section>
			</section>
			<section className="mainbar">
				<section className="biography">
					<h2 className="biography__title">{name}</h2>
					<h3 className="biography__subtitle">Biography</h3>
					<p className="biography__text">{biographyText}</p>
					{showMore}
					{hideMore}
				</section>
				<section className="popularity">
					<h2 className="popularity__title">Known for</h2>
					<PersonWorksList data={[...cast, ...crew].sort(sortByPopularity)} />
				</section>
				{cast.length > 0 && <WorksList title={WORK_LIST_TYPE.ACTING} data={cast} />}
				{crew.length > 0 && <WorksList title={WORK_LIST_TYPE.CREW} data={crew} />}
			</section>
		</main>
	);
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonPage);
