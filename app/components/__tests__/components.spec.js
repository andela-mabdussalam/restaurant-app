import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import RenderInput from '../RenderInput';
import StackButton from '../StackButton';
import { StyledText } from '../StyledText';

const meta = {
  touched: true,
  error: true
};
const metaFalse = {
  touched: false,
  error: false
};

const input = {
  onChange: jest.fn()
};

const navigation = {};
const navigate = jest.fn();
navigation.navigate = me => me;
describe('RENDERINPUT --- Snapshot', () => {
  it('renders the cart screen if user is logged in', async () => {
    const tree = renderer.create(<RenderInput
      placeholder={'items'}
      meta={meta}
      input={input}
      secureTextEntry
      />);
    expect(tree).toMatchSnapshot();
  });
  it('renders the render input', async () => {
    const tree = renderer.create(<RenderInput
      placeholder={'items'}
      meta={metaFalse}
      input={input}
      secureTextEntry
      />);
    expect(tree).toMatchSnapshot();
  });
});

describe('STACKBUTTON --- Snapshot', () => {
  it('renders the stack button', async () => {
    const container = shallow(<StackButton navigate={navigate}/>);
    container.find('TouchableHighlight').first().simulate('press');
  });
});

describe('STYLEDTEXT --- Snapshot', () => {
  it('renders the styled text', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      smallFont/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders the styled text', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      />);
    expect(tree).toMatchSnapshot();
  });
});

describe('VALIDATEINPUT --- Snapshot', () => {
  it('renders the styled text', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      smallFont/>);
    expect(tree).toMatchSnapshot();
  });
});
