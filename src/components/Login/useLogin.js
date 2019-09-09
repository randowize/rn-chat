import { useState, useCallback, useEffect } from 'react';
import { AsyncStorage, BackHandler, Alert } from 'react-native';

const signoutFn = cb => AsyncStorage.removeItem('username', cb);
const closeAppFn = cb => BackHandler.exitApp();
const confirmExit = () => {
  Alert.alert(
    'Exit App',
    'Exiting the application?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ],
    {
      cancelable: false,
    }
  );
  return true;
};

function useAppEffects({ setCurrentUser, showLoader, showLoginForm }) {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', confirmExit);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', confirmExit);
    };
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('username')
      .then(data => {
        //props.gotoChat(data);
        setCurrentUser(data);
        showLoader(false);
      })
      .catch(showLoginForm);
  }, []);
}

 async function basicLogin(credential, onSuccess) {
  if (credential.length >= 2) {
    onSuccess(credential);
    return AsyncStorage.setItem('username', credential);
  }
  throw Error('Invalid User')
}


function useHandlers({ props, setCurrentUser, setUsername, username}) {
  const gotoChat = useCallback(
    user => {
      props.gotoChat(user);
      setCurrentUser(user);
      setUsername('');
    },
    [username]
  );
  const signout = useCallback(() => {
    signoutFn(() => setCurrentUser(null));
  }, []);
  const closeApp = useCallback(user => {
    closeAppFn();
  }, []);

  return {
    gotoChat,
    signout,
    closeApp,
  };
}

export default function useLogin(props) {
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, showLoader] = useState(true);

  const showLoginForm = useCallback(() => {
    showLoader(false);
  }, []);

  useAppEffects({ setCurrentUser, showLoader, showLoginForm });
  
  const { gotoChat, closeApp, signout } = useHandlers({
    props,
    setCurrentUser,
    setUsername,
  });

  return {
    signout,
    gotoChat,
    closeApp,
    currentUser,
    loader,
    username,
    setUsername,
    loginFn: (username) => {
      basicLogin(username, gotoChat)
    }
  };
}
