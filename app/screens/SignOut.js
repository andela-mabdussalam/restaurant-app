import React from 'react';
import {
  Text,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Card, Button, Body } from 'native-base';
import { HomeScreenStyles as styles } from '../styles/styles';


export default class SignOut extends React.Component {
  static navigationOptions = {
    title: 'SignOut',
    headerTitleStyle: {
      fontFamily: 'SinkinSans-200XLight'
    }
  };
  static propTypes = {
    navigation: PropTypes.object
  }
  handleCancel = () => {
    const { navigate } = this.props.navigation;
    navigate('DrawerStack');
  }
  handleLogout =() => {
    const { navigate } = this.props.navigation;
    this.removeAuthToken();
    navigate('Main');
  }
  removeAuthToken = async () => {
    await AsyncStorage.removeItem('graphcoolToken');
  }
  render() {
    return (
    <Container>
        <Content>
          <Card style={{ flex: 0, padding: 25 }}>
              <Body>
                <Text style={styles.logoutBody}>
                  Are you sure you want to logout?
                </Text>
              </Body>
              <Button onPress={this.handleLogout} color="#F7C04C" style={styles.logoutButton} block iconLeft>
              <Text style={styles.logoutText}>    LOG OUT</Text>
            </Button>
            <Button onPress={this.handleCancel} color="#F7C04C" style={styles.cancelButton} block iconLeft>
              <Text style={styles.cancelText}>    CANCEL</Text>
            </Button>
          </Card>
        </Content>
     </Container>
    );
  }
}
