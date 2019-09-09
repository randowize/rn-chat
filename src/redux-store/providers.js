import {connect} from 'react-redux';
import * as Operations from './operations';



const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
  sendMessage: payload => dispatch(Operations.sendMessage(payload)),
  receiveMessage: user => Operations.receiveMessage(user, dispatch),
  initChat : (user) =>  dispatch(Operations.initChat(user))
})

export const withChat = connect(
  mapStateToProps,
  mapDispatchToProps
);