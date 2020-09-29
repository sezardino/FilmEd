import React from 'react';
import {Link} from 'react-router-dom';
import {TYPE} from '../../const';
import {sortByDate} from '../../services/utils';

const WorksList = ({data = [], title}) => {
	const dataWithRelease = data.filter((item) => item.release).sort(sortByDate);
	const dataWithoutRelease = data.filter((item) => !item.release);
	const years = [...new Set(dataWithRelease.map(({release = ''}) => release.slice(0, 4)))];
	return (
		<React.Fragment>
			<header className="works__header">
				<h2 className="works__title">{title}</h2>
				<span className="works__select">all</span>
			</header>
			<div className="works__wrapper">
				{years.map((item) => {
					return (
						<ul className="works__list" key={item}>
							{dataWithRelease
								.filter(({release = ''}) => release.slice(0, 4) === item)
								.map(({release = '', title, id, character, job, type}) => (
									<li className="works__list-item" key={id}>
										<span className="release">{release.slice(0, 4)}</span>
										<span className="dot">&middot;</span>
										<Link to={type === TYPE.TV ? `/show/${id}` : `/movie/${id}`} className="title">
											{title}{' '}
											{<span className="title title--character">how {character || job}</span>}
										</Link>
									</li>
								))}
						</ul>
					);
				})}
				<ul className="works__list works__list--no-date">
					{dataWithoutRelease.map(({title, id, character, job, type}) => {
						return (
							<li className="works__list-item " key={`${character}${id}`}>
								<span className="dot">&middot;</span>
								<Link to={type === TYPE.TV ? `/show/${id}` : `/movie/${id}`} className="title">
									{title}{' '}
									{(character || job) && (
										<span className="title title--character">how {character || job}</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</React.Fragment>
	);
};

// const WorksList = (props) => {
// 	const {data = {}} = props;
// 	const {crew = [], cast = []} = data;
// 	return (
// 		<React.Fragment>
// 			{cast.length > 0 && <List title={WORK_LIST_TYPE.ACTING} data={cast} />}
// 			{crew.length > 0 && <List title={WORK_LIST_TYPE.CREW} data={crew} />}
// 		</React.Fragment>
// 	);
// };

export default WorksList;
