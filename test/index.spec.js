import proxyquire from 'proxyquire'
import sinon from 'sinon';
import {expect} from 'chai';
import {chance} from './helpers';
import React from 'react';
import { App } from '../src/components/App';

describe('Index', () => {
  it('Renders the app in an element with id "app"', () => {
    // given
    const render = sinon.stub();
    const props = {
      userName: 'kevinforrestconnors',
      lang: 'typescript'
    }
    const element = chance.guid();
    const app = <App 
      userName='kevinforrestconnors'
      lang='typescript'
    />
    const getElementById = sinon.stub(global.window.document, 'getElementById')
                                .withArgs('app')
                                .returns(element);

    const {renderApp} = proxyquire(
      '../src/index.tsx',
      {
        'react-dom': {
          render
        },
        './components/App.tsx': {
          App
        }
      }
    );

    // when
    renderApp();

    // expect
    expect(getElementById.callCount, 'should call getElementById').to.equal(1);
    expect(getElementById.firstCall.args, 'getElementById is passed correct args').to.deep.equal([
      'app'
    ]);
    expect(render.callCount, 'should call ReactDOM.render').to.equal(1);
    expect(render.firstCall.args, 'ReactDOM.render is passed correct args').to.deep.equal([
      app,
      element
    ]);
  });
});