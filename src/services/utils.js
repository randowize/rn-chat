import {firebase} from './../firebase/config';

export const getServerTime =  () => firebase.firestore.Timestamp.now();
export const toFirestoreTimeStamp = seconds => firebase.firestore.Timestamp.fromMillis(seconds*1000);
