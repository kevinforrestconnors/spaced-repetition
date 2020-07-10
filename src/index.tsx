import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

export function renderApp(): void {
    const app = <App
        userName='kevinforrestconnors'
        lang='typescript'
    />
    ReactDOM.render(app , document.getElementById('app'));
}
