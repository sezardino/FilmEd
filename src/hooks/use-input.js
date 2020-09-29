const {useState} = require('react');

const useInput = (data) => {
	const [value, setValue] = useState(data);
	return [value, setValue];
};

export default useInput;
