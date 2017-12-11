import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import RenderInput from '../RenderInput';
import Cart from '../Cart';
import StackButton from '../StackButton';

// import Home from '../Home';
// import Product from '../Product';
// import Signup from '../Signup';

const meta = {
  touched: true,
  error: true
};
jest.mock('../../navigation/RootNavigation', () => 'RootNavigation');

const navigation = {
  navigate: jest.fn()
};

const input = {
  onChange: jest.fn()
};
const items = [{ name: 'fdf', url: 'dfsdfs' }];

// const onStarRatingPress = jest.fn();

it('renders correctly', async () => {
  const tree = renderer.create(<RenderInput meta={meta} input={input}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', async () => {
  const tree = renderer.create(<Cart items={items} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', async () => {
  const tree = renderer.create(<StackButton navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});

// it('renders correctly', async () => {
//   const tree = renderer.create(<Home />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('renders correctly', async () => {
//   const tree = renderer.create(<Product params={params} />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
// it('renders correctly', async () => {
//   const tree = renderer.create(<Product params={params} />).toJSON();
//   expect(tree.props().onStarRatingPress()).toMatchSnapshot();
// });

// it('tests starRating', async () => {
//   const checkbox = shallow(<Product params={params} />);
//   const starRating = checkbox.find('StarRating');
//   expect(shallowToJson(starRating)).toMatchSnapshot();
// });
// it('renders correctly', async () => {
//   const tree = renderer.create(<Signup />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
