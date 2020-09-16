import React, {useState} from 'react';

import noImage from './no-image.svg';

const Cast = ({data = []}) => {
	const {cast = [], crew = []} = data;

	const [fullCast, setFullCast] = useState(false);

	return (
		<section className="cast">
			<h2 className="cast__title">Series Cast</h2>

			<ul className="cast__cast-list cast-list">
				{cast.map((item, index) => {
					const count = fullCast ? cast.length : 5;
					if (index <= count) {
						return (
							<li className="cast-list__item actor" key={item.id}>
								<p className="img-wrapper actor__img">
									{item.profile_path ? (
										<img
											src={`//image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`}
											alt="item.name"
										/>
									) : (
										<img src={noImage} alt="no image" />
									)}
								</p>
								<div className="actor__wrapper">
									<p className="actor__name">
										<a href="#" className="actor__link">
											{item.name}
										</a>
									</p>
									<p className="actor__character">{item.character}</p>
								</div>
							</li>
						);
					}
				})}
			</ul>

			{fullCast && (
				<React.Fragment>
					<h3 className="cast__title">Crew</h3>
					<ul className="cast__cast-list cast-list">
						{crew.map((item) => {
							return (
								<li className="cast-list__item actor" key={item.credit_id}>
									<p className="img-wrapper actor__img">
										{item.profile_path ? (
											<img
												src={`//image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`}
												alt="item.name"
											/>
										) : (
											<img src={noImage} alt="no image" />
										)}
									</p>
									<div className="actor__wrapper">
										<p className="actor__name">
											<a href="#" className="actor__link">
												{item.name}
											</a>
										</p>
										<p className="actor__character">{item.character}</p>
										<p className="actor__episodes-count">16 Episodes</p>
									</div>
								</li>
							);
						})}
					</ul>
				</React.Fragment>
			)}

			{!fullCast && (
				<button href="#" className="cast__see-more" onClick={() => setFullCast(true)}>
					Full Cast & Crew
				</button>
			)}
			{fullCast && (
				<button href="#" className="cast__see-more" onClick={() => setFullCast(false)}>
					Hide
				</button>
			)}
		</section>
	);
};

export default Cast;
