import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {SHOW_TABS} from '../../const';
import {getData} from '../../services';

import Hero from '../hero-description';
import PageTabs, {Tab} from '../page-tabs';
import Cast from '../cast';
import Seasons from '../seasons';
import Reviews from '../reviews';
import Recommendations from '../recommendations';

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
						<Recommendations data={recommendations} />
					</div>
				</div>
			</section>
		</main>
	);
};

const mapStateToProps = ({data, show}) => ({
	data: show.data,
	cast: show.cast,
	reviews: show.reviews,
	recommendations: show.recommendations,
	language: data.languages.activeLanguage,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getData: (id) => {
		const {context} = ownProps;
		getData(id, context, dispatch);
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
