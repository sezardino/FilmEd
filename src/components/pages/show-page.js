import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {SHOW_TABS, TYPE} from '../../const';
import {getData} from '../../services';

import Hero from '../hero-description';
import PageTabs, {Tab} from '../page-tabs';
import Cast from '../cast';
import Seasons from '../seasons';
import Reviews from '../reviews';
import {RecommendationsList} from '../app-components';

const ShowPage = (props) => {
	const {data, getData, dataId, language, recommendations, cast, reviews} = props;
	const {seasons} = data;
	const [activeTab, setActiveTab] = useState('cast');

	const tabHandler = (field) => {
		setActiveTab(field);
	};

	useEffect(() => {
		getData(dataId);
	}, [dataId, language, getData]);
	return (
		<main className="show-page">
			<Hero data={data} />
			<section className="content">
				<div className="container content__wrapper">
					<PageTabs>
						<Tab field="cast" label="Cast" activeTab={activeTab} onTabClick={tabHandler} />
						{dataId < 100000 && (
							<Tab field="seasons" label="Seasons" activeTab={activeTab} onTabClick={tabHandler} />
						)}
						<Tab field="reviews" label="Reviews" activeTab={activeTab} onTabClick={tabHandler} />
					</PageTabs>

					<div className="content__content-wrapper">
						{activeTab === SHOW_TABS.CAST && <Cast data={cast} />}
						{activeTab === SHOW_TABS.SEASONS && <Seasons data={seasons} />}
						{activeTab === SHOW_TABS.REVIEWS && <Reviews data={reviews} />}
						<RecommendationsList data={recommendations} />
					</div>
				</div>
			</section>
		</main>
	);
};

const mapStateToProps = ({
	data: ldata,
	show: {data, keywords, externalIds, cast, reviews, recommendations},
}) => ({
	data: {...data, keywords, externalIds},
	cast: cast,
	reviews: reviews,
	recommendations: recommendations,
	language: ldata.languages.activeLanguage,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: (id) => {
		const {
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
		getData(id, type, context, dispatch);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
