import React from 'react';

const movieContext = React.createContext();

const {Provider: FilmsProvider, Consumer: FilmsConsumer} = movieContext;

export {FilmsProvider, FilmsConsumer};
export default movieContext;
