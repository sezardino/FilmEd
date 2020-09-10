const findTab = (tabs, active) => {
	const values = Object.values(tabs);
	const keys = Object.keys(tabs);
	const index = values.findIndex((item) => item === active);
	const current = keys[index];
	return current;
};

export {findTab};
