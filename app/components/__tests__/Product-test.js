import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import StarRating from 'react-native-star-rating';
import { shallow } from 'enzyme';
import Product from '../Product';

const params = { Name: 'mariam', ImageUrl: 'Helofmdsfsd' };
const onStarRatingPress = jest.fn();

describe('Product component', () => {
  it('renders correctly', async () => {
    const tree = renderer.create(<Product params={params} onStarRatingPress={onStarRatingPress}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly', async () => {
    const tree = renderer.create(<Product params={params}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
