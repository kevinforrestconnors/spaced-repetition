import proxyquire from 'proxyquire'
import sinon from 'sinon';
import {expect} from 'chai';
import {chance} from './helpers';
import { App } from '../src/components/App';

describe('App components', () => {
  it('App returns a component', () => {
    // given
    const userName = chance.guid();
    const lang = chance.guid();

    // when
    const app = App({
      userName,
      lang
    });

    // expect
   
  });
});