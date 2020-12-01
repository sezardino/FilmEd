import React from 'react';
import {useActive} from '../../hooks';
import {SHOW_TABS} from '../../const/const';

import {Hero, Cast, Seasons, Reviews, RecommendationsList} from './components';
import {PageTabs, Tab} from '../../common/page-tabs';

const ShowPage = (props) => {
	const {data, dataId, recommendations = [], cast, reviews, trailers} = props;
	const {seasons} = data;
	const [active, activeChange] = useActive('cast');
	return (
		<main className="show-page">
			<Hero data={data} trailers={trailers} />

			<section className="content">
				<div className="container content__wrapper">
					<PageTabs>
						<Tab field="cast" label="Cast" activeTab={active} onTabClick={activeChange} />
						{dataId < 100000 && (
							<Tab field="seasons" label="Seasons" activeTab={active} onTabClick={activeChange} />
						)}
						<Tab field="reviews" label="Reviews" activeTab={active} onTabClick={activeChange} />
					</PageTabs>

					<div className="content__content-wrapper">
						{active === SHOW_TABS.CAST && <Cast data={cast} />}
						{active === SHOW_TABS.SEASONS && <Seasons data={seasons} />}
						{active === SHOW_TABS.REVIEWS && <Reviews data={reviews} />}
						{recommendations.length > 0 && <RecommendationsList data={recommendations} />}
					</div>
				</div>
			</section>
		</main>
	);
};

export default ShowPage;
