import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Container, Content, Card, Button, Body } from 'native-base';
import { HomeScreenStyles as styles } from '../styles/styles';

const Signout = ({
  handleCancel,
  handleLogout,
}) =>
  <Container>
    <Content>
      // Inline styling?
      <Card style={{ flex: 0, padding: 25 }}>
        <Body>
          <Text style={styles.logoutBody}>
            Are you sure you want to logout?
          </Text>
        </Body>
        <Button
          onPress={handleLogout}
          color="#F7C04C"
          style={styles.logoutButton}
          block
          iconLeft
        >
          <Text style={styles.logoutText}>    LOG OUT</Text>
        </Button>
        <Button
          onPress={handleCancel}
          color="#F7C04C"
          style={styles.cancelButton}
          block
          iconLeft
        >
        <Text style={styles.cancelText}>    CANCEL</Text>
        </Button>
      </Card>
    </Content>
  </Container>;

Signout.propTypes = {
  handleCancel: PropTypes.func,
  handleLogout: PropTypes.func,
};

export default Signout;
