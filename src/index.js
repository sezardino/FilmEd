import React from 'react';
import ReactDOM from 'react-dom';
import Api from './services/api';
import App from './components/app';

const api = new Api('ru-RU');

console.log(api.getPopularMovies());

ReactDOM.render(<App />, document.querySelector('#root'));
