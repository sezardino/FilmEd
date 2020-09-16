import React from 'react';

const Media = () => {
	return (
		<section className="media">
			<header className="media__header">
				<h2 className="media__title">Media</h2>
				<ul className="media__media-list media-list">
					<li className="media-list__item media-list__item--active">Most Popular</li>
					<li className="media-list__item">
						Videos <span className="media-list__item-count">8</span>
					</li>
					<li className="media-list__item">
						Backdrops <span className="media-list__item-count">17</span>
					</li>
					<li className="media-list__item">
						Posters <span className="media-list__item-count">23</span>
					</li>
				</ul>
			</header>
			<ul className="media__items-list items-list">
				<li className="items-list__item">
					<img src="#" alt="" />
				</li>
				<li className="items-list__item">
					<img src="#" alt="" />
				</li>
				<li className="items-list__item">
					<img src="#" alt="" />
				</li>
			</ul>
		</section>
	);
};
