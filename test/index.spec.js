import sinon from 'sinon';
import expect from 'expect';
import {chance} from './helpers';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from '../src/components/App';
import {renderApp} from '../src/index';
jest.mock('react-dom', () => ({
  render: jest.fn()
}));

describe('Index', () => {
  it('Renders the app in an element with id "app"', () => {
    // given

    const element = chance.guid();
    const app = <App 
      userName='kevinforrestconnors'
      lang='typescript'
    />
    const getElementById = sinon.stub(global.window.document, 'getElementById')
                                .withArgs('app')
                                .returns(element);

    // when
    renderApp();

    // expect
    expect(getElementById.callCount).toEqual(1);
    expect(getElementById.firstCall.args).toEqual([
      'app'
    ]);
    expect(ReactDOM.render.mock.calls.length).toEqual(1);
    expect(ReactDOM.render.mock.calls[0]).toEqual([
      app,
      element
    ]);
  });
});