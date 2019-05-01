import 'react-native';
import React from 'react';
import { list } from '../list';
import renderer from 'react-test-renderer';
/**
*Snapshot test for the list 
*/
it('renders correctly', () => {
  const tree = renderer.create(<list up = {false}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
