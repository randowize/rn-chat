import React, { useState, useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

import {
  Container,
  Text,
  TextWrapper,
  TimeLabel,
  MessagesList,
  MessageView,
  MessageBox,
  StyledIcons,
  InputBox,
  ArrowDecoration,
  UserLabel,
  UserThumbnail,
} from './chat-styles';

const UserAvatar = props => {
  return (
    <UserThumbnail me={props.me}>
      {props.user.avatarUrl ? (
        <Avatar
          avatarStyle={{
            position: 'absolute',
            zIndex: 2,
            left: -10,
          }}
          rounded
          size={16}
          source={{
            uri: props.user.avatarUrl,
          }}
        />
      ) : (
        <Avatar
          size={16}
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          onPress={() => console.log('Works!')}
          activeOpacity={0.7}
        />
      )}
    </UserThumbnail>
  );
};
const Message = props => {
  const me = props.username === props.user.name;
  const [expanded, expand] = useState({
    numberOfLines: 7,
    ellipsizeMode: 'tail',
  });
  return (
    <MessageView align={me ? 'currentUser' : 'others'}>
      <TextWrapper>
        <UserAvatar user={props.user} me={me} />
        <UserLabel me={me} ellipsizeMode="tail" numberOfLines={1}>
          ~{me ? 'You' : props.user.name}
        </UserLabel>
        <TouchableWithoutFeedback onPress={() => expand({})}>
          <Text {...expanded} onLayout={({nativeEvent: {layout}}) => console.log(layout)}>{props.text}</Text>
        </TouchableWithoutFeedback>
        <TimeLabel>
          {props.hours}:{props.minutes}
        </TimeLabel>
        <ArrowDecoration me={props.user.name === props.username} />
      </TextWrapper>
    </MessageView>
  );
};

const Chat = props => {
  const [message, setMessage] = useState('');
  useEffect(() => {
    props.initChat(props.username);
    const unsubscribe = props.receiveMessage(props.username);
    return unsubscribe;
  }, []);

  const messagesListRef = useRef();
  const totalMessagesRef = useRef(0);
  const [messageListHeight, setMessageListHeight] = useState(0);

  useEffect(() => {
    if (totalMessagesRef.current !== props.messages.length) {
      messagesListRef.current.scrollTo({
        y: messageListHeight,
        animated: true,
      });
      totalMessagesRef.current = props.messages.length;
    }
  }, [messageListHeight]);
  return (
    <Container>
      <MessagesList
        ref={ref => (messagesListRef.current = ref)}
        contentContainerStyle={{ paddingBottom: 30 }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          setMessageListHeight(contentHeight);
        }}
      >
        {props.messages.map(d => (
          <Message {...d} username={props.username} />
        ))}
      </MessagesList>
      <MessageBox>
        <InputBox
          value={message}
          onChangeText={setMessage}
          placeholder="Type here to translate!"
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => {
            props.sendMessage({ text: message, user: props.username });
            setMessage('');
          }}
        >
          <StyledIcons>
            <Ionicons name="md-send" size={24} color="white" />
          </StyledIcons>
        </TouchableOpacity>
      </MessageBox>
    </Container>
  );
};
export default Chat;
