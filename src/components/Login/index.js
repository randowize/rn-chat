import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Spinner,
  Container,
  Title,
  TextBox,
  Form,
  Button,
  Text,
  Label,
  Input,
  styles,
  Header
} from './login-styles';

import useLogin from './useLogin';

const LogoutOrCloseApp = props => {
  if (!props.fromChat) {
    props.gotoChat(props.username);
    return null;
  }
  return (
    <React.Fragment>
      <Title>
        <Button style={styles.button} full large onPress={props.signout}>
          <Text color="white">sign out</Text>
        </Button>
      </Title>
      <Title inverted>
        <Button
          onPress={() => props.gotoChat(props.username)}
          style={styles.button}
          full
          large
        >
          <Text color="white">Go to chat</Text>
        </Button>
      </Title>
    </React.Fragment>
  );
};

export default function Login(props) {
  const { signout, closeApp, gotoChat, currentUser, loader , username, setUsername, loginFn} = useLogin(props);
  return (
    <Container>
      {loader ? (
        <Spinner />
      ) : !currentUser ? (
        <>
          <Header />
          <Title>
            <Text>Welcome to Messaging!</Text>
          </Title>
          <Form>
            <TextBox floatingLabel>
              <Label>Username</Label>
              <Input value={username} onChangeText={setUsername} />
            </TextBox>
            <TouchableOpacity>
              <Button
                style={styles.button}
                full
                large
                info
                onPress={() => loginFn(username)}
              >
                <Text>Join</Text>
              </Button>
            </TouchableOpacity>
          </Form>
        </>
      ) : (
        <LogoutOrCloseApp
          gotoChat={gotoChat}
          signout={signout}
          closeApp={closeApp}
          username={currentUser}
          fromChat={props.fromChat}
        />
      )}
    </Container>
  );
}

Login.navigationOptions = {
  header: null,
};
