import { App } from '../../src/components/App';
import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';

describe('App components', () => {
  it('renders props', () => {
    // given
    const userName = 'kevinforrestconnors';
    const userName2 = 'anaanramay';
    const lang = 'typescript';
    const lang2 = 'javascript';
    
    // when
    const tree = renderer.create(
      <App
        userName={userName}
        lang={lang}
      />
    )
    .toJSON();

    const tree2 = renderer.create(
      <App
        userName={userName2}
        lang={lang2}
      />
    )
    .toJSON();
    
    // then
    expect(tree).toMatchSnapshot();
    expect(tree2).toMatchSnapshot();
  });
});