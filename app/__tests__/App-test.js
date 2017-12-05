import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../App';

jest.mock('../navigation/RootNavigation', () => 'RootNavigation');


it('renders the loading screen', async () => {
  const tree = renderer.create(<App />);
  expect(tree.getInstance()._loadResourcesAsync()).toMatchSnapshot();
  expect(tree.getInstance()._handleLoadingError()).toMatchSnapshot();
  expect(tree.getInstance()._handleFinishLoading()).toMatchSnapshot();

  expect(tree).toMatchSnapshot();
});

it('renders the root without loading screen', async () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the status bar if the platform is ios', async () => {
  jest.resetModules();
  jest.doMock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'ios';
    return Platform;
  });

  const tree = renderer.create(<App skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the view if the platform if android', async () => {
  jest.resetModules();
  jest.doMock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
  });
  const tree = renderer.create(<App skipLoadingScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
