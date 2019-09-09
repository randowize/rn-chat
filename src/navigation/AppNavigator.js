
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';


const SwitchNavigator = createSwitchNavigator({
  login : LoginScreen,
  ChatScreen,
}, {
  initialRouteName: 'login',
});




export default createAppContainer(
  SwitchNavigator
);
