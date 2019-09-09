import React from 'react';
import Login from '../containers/Login';

export default function LoginScreen(props) {
  const fromChat = props.navigation.getParam('fromChat');
  return (
    <Login
      {...props}
      gotoChat={username => props.navigation.navigate('chat', { username })}
      fromChat={fromChat}
    />
  );
}
