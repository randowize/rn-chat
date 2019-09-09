import React from 'react';
import { View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Chat from '../containers/Chat';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { StyledIcons } from './../components/common';

const Title = styled.Text`
  color: blue;
  height: 100px;
  padding: 20px;
  font-size: 24px;
`;

export function ChatScreen(props) {
  return <Chat username={props.navigation.getParam('username')} />;
}

const CustomHeader = props => (
  <View {...props}>
    <Button title="back" />
    <Text>Hello</Text>
  </View>
);
ChatScreen.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('username') || 'Unknown',
  headerStyle: {
    backgroundColor: '#2196f3',
  },
  headerTintColor: '#fff',
  headerLeft: props => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('login', { fromChat: true })}
      >
        <StyledIcons>
          <Ionicons name="md-arrow-round-back" size={32} color="white" />
        </StyledIcons>
      </TouchableWithoutFeedback>
    );
  },
});

export default createStackNavigator({
  chat: ChatScreen,
});
