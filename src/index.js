import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root')); // html에 그려진 root태그 필수이고 시작점을 저장

// <App /> 은 App.js를 표시함
root.render(
  // <React.StrictMode> <= 위험감지
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
