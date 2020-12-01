import React from 'react';
import Card from '../../../common/card';
import List from '../../../common/list';

const FamousList = (props) => {
	return (
		<List
			data={props.data}
			count={4}
			renderFunc={(item, index) => <Card item={item} key={index} />}
		/>
	);
};

export default FamousList;
