import React from 'react';
import Card from '../../../common/card';
import List from '../../../common/list';

const RecommendationsList = (props) => {
	return (
		<List
			title="Recommendations"
			data={props.data}
			count={5}
			renderFunc={(item, index) => <Card item={item} key={index} />}
		/>
	);
};

export default RecommendationsList;
