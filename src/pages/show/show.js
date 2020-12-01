import React from 'react';
import {connect} from 'react-redux';
import {useActive, useLoad} from '../../hooks';
import {SHOW_TABS, TYPE} from '../../const/const';
import {getData} from '../../services';

import {Hero, Cast, Seasons, Reviews, RecommendationsList} from './components';
import {PageTabs, Tab} from '../../common/page-tabs';

const ShowPage = (props) => {
	const {data, getData, dataId, language, recommendations = [], cast, reviews, trailers} = props;
	const {seasons} = data;
	const [active, activeChange] = useActive('cast');
	useLoad(getData, [language, dataId]);
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

const mapStateToProps = ({
	logic,
	show: {data, keywords, externalIds, cast, reviews, recommendations, trailers},
}) => ({
	data: {...data, keywords, externalIds},
	cast: cast,
	reviews: reviews,
	recommendations: recommendations,
	language: logic.languages.activeLanguage,
	trailers: trailers,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: () => {
		const {
			dataId,
			context,
			history: {
				location: {pathname},
			},
		} = ownProps;
		let type;
		if (pathname.includes('show')) {
			type = TYPE.TV;
		} else if (pathname.includes('movie')) {
			type = TYPE.MOVIE;
		}
		getData(dataId, type, context, dispatch);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
