import * as MessagesServices from '../services/messages-services';
import { Actions } from './actions';
import { getServerTime } from './../services/utils';

function zeroPad(str = '') {
  return str.padStart(2 - str.length, '0');
}
function formatMessage(message, source = 'local') {
  const { timestamp, ...rest } = message;
  const key = `${source}-${timestamp.toDate()}`;
  const date = timestamp.toDate();
  const [hours, minutes, day, month] = [
    zeroPad(date.getHours() + ''),
    zeroPad(date.getMinutes() + ''),
    date.getDay(),
    date.getMonth(),
  ];
  return {
    ...rest,
    key,
    timestamp: { hours, minutes, day, month },
    hours,
    minutes,
    day,
    month,
  };
}

export const sendMessage = payload => async dispacth => {
  if (payload.text.trim()) {
    const timestamp = getServerTime();
    const user = payload.user;
    const message = { ...payload, user: { name: user }, timestamp };
    /* user === payload.user && */ dispacth(
      Actions.addMessage(formatMessage(message))
    );
    const response = await MessagesServices.sendMessage(message);
  }
};

export const receiveMessage = (user, dispatch) => {
  return MessagesServices.subscribeToNewMessage(message => {
    dispatch(Actions.addMessage(formatMessage(message, 'remote')));
  }, user);
};

export const initChat = user => async (dispatch, getState) => {
  const { isInitialized } = getState();
  if (!isInitialized) {
    const messages = await MessagesServices.initDb();
    dispatch(
      Actions.initMessagesBoard(
        messages.map(message =>
          formatMessage(
            message,
            message.user.name === user ? 'local' : 'remote'
          )
        )
      )
    );
    dispatch(Actions.initDone());
  }
};
