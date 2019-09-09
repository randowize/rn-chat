import fstore, { firebase } from '../firebase/config';
import { toFirestoreTimeStamp } from './utils';

export const sendMessage = async payload => {
  const messageRef = fstore.collection('messages');
  const result = await messageRef.add({
    ...payload,
  });
  return await result.get();
};

export const subscribeToNewMessage = (listerner, user ) => {
  return fstore
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      if (changes.length === 1) {
        const doc = changes
          .filter(x => x.doc.data().user.name !== user)
          .map(x => ({
            ...x.doc.data(),
            firestorId: x.doc.id,
            changeType: x.type,
          }))[0];
        doc && listerner(doc);
      }
    });
};

export const loadMessages = async () =>
  await fstore
    .collection('messages')
    .orderBy('timestamp')
    .get();

export const getGenesis = async () => await fstore.collection('genesis').get();

const PREVIOUS_MESSAGES_URL =
  'https://jsonblob.com/api/jsonBlob/4f421a10-5c4d-11e9-8840-0b16defc864d';

export const initDb = async () =>
  await fetch(PREVIOUS_MESSAGES_URL).then(res => res.json()).then (res => res.map(
    message => ({...message , timestamp: toFirestoreTimeStamp(message.timestamp)})
  ).sort((a, b) => a.timestamp.seconds - b.timestamp.seconds));
