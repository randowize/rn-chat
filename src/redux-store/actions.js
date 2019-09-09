import { getActionCreator } from "./utils";

const ADD_MESSAGE='ADD_MESSAGE';

const INIT_MESSAGES_BOARD='INIT_MESSAGES_BOARD';
const INIT_DONE='INIT_DONE';

const addMessage = getActionCreator(ADD_MESSAGE);
const initMessagesBoard = getActionCreator(INIT_MESSAGES_BOARD);
const initDone = getActionCreator(INIT_DONE);

export const ActionTypes = {
    ADD_MESSAGE,
    INIT_DONE,
    INIT_MESSAGES_BOARD
}
export const Actions =  {
    addMessage,
    updateMessageStatus: ()=>{},
    initMessagesBoard,
    initDone

}