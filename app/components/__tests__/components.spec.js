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
  it('renders the input with error if touched and error are true', async () => {
    const tree = renderer.create(<RenderInput
      placeholder={'items'}
      meta={meta}
      input={input}
      secureTextEntry
      />);
    expect(tree).toMatchSnapshot();
  });
  it('renders the input with error if touched and error are false', async () => {
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
  it('renders the styled text with custom font and small font', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      smallFont/>);
    expect(tree).toMatchSnapshot();
  });

  it('renders the styled text without custom font only', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      />);
    expect(tree).toMatchSnapshot();
  });

  it('renders the styled text with small font only', async () => {
    const tree = renderer.create(<StyledText
      color={'red'}
      customFont={'Sans'}
      smallFont/>);
    expect(tree).toMatchSnapshot();
  });
});
