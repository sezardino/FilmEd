import React from 'react';
import {FamousList, WorksList} from './components';
import {WORK_LIST_TYPE} from '../../const/const';
import {useFull} from '../../hooks';

const PersonPage = (props) => {
	const {data, castData, crewData, famousData} = props;
	const {biography = '', birthday, deathday, gender, knownFor, name, placeOfBirth, photo} = data;
	const [full, changeFull] = useFull();

	const biographyText =
		!full && biography.length > 300 ? `${biography.slice(0, 300)}...` : biography;

	const showMore =
		biography.length > 300 && !full ? (
			<button className="biography__more" onClick={changeFull}>
				Read more
			</button>
		) : null;
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
					{/* <ul className="social information__social">
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
					</ul> */}

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
					<FamousList data={famousData} />
				</section>
				{castData.length > 0 && <WorksList title={WORK_LIST_TYPE.ACTING} data={castData} />}
				{crewData.length > 0 && <WorksList title={WORK_LIST_TYPE.CREW} data={crewData} />}
			</section>
		</main>
	);
};

export default PersonPage;
