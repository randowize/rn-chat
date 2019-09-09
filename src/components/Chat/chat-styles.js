import styled, { css } from 'styled-components/native';

export { StyledIcons } from '../common';

export const Container = styled.View`
  background: white;
  flex: 1;
`;

export const Text = styled.Text`
  margin-right: 40px;
  color: white;
  font-size: 16px;
  font-family: 'space-mono';
`;

export const TextWrapper = styled.View`
  background: #2196f3;
  position: relative;
  padding: 5px 5px;
  border-radius: 5px;
  padding-top: 20px;
`;

export const TimeLabel = styled.Text`
  color: white;
  align-self: flex-end;
  font-size: 10px;
  position: relative;
  margin-top: -5px;
`;

export const MessagesList = styled.ScrollView`
  padding: 10px 10px;
  flex: 1;
`;

export const InputBox = styled.TextInput`
  border: solid 1px black;
  border-radius: 5px;
  background: white;
  margin: 0px 15px 0px 0px;
  padding: 15px;
  flex: 1;
  align-self: stretch;
`;

export const MessageBox = styled.View`
  padding: 2px 20px 2px 2px;
  min-height: 25px;
  max-height: 125px;
  overflow: scroll;
  flex-direction: row;
  align-items: center;
`;

const positions = {
  currentUser: 'flex-end',
  others: 'flex-start',
};

export const trianglePositionMixin = props =>
  !props.me
    ? css`
        left: -10px;
        transform: rotate(20deg);
      `
    : css`
        right: -10px;
        transform: rotate(-20deg);
      `;

export const ArrowDecoration = styled.View`
  position: absolute;
  width: 0px;
  height: 0px;
  border: solid 10px transparent;
  border-top-color: #2196f3;
  z-index: 2;
  ${trianglePositionMixin};
`;

const UserLabelPositionMixin = props =>
  props.me
    ? css`
        left: 0;
      `
    : css`
        right: 0;
      `;
export const UserLabel = styled.Text`
  border-radius: 2px;
  color: white;
  position: absolute;
  z-index: 2;
  padding: 1px 2px;
  font-size: 10px;
  top: -20px;
  color: #2196f3;
  margin-bottom: 2px;
  font-weight: bold;
  ${UserLabelPositionMixin};
`;

export const MessageView = styled.View`
  margin-top: 35;
  align-self: ${props => positions[props.align]};
  margin-left: 10px;
  margin-right: 10px;
  max-width: 70%;
  position: relative;
`;

const thumbnailMixin = props =>
  props.me
    ? css`
        right: -12px;
      `
    : css`
        left: -12px;
      `;
export const UserThumbnail = styled.View`
  position: absolute;
  top: -20px;
  ${thumbnailMixin};
  z-index: 1;
`;
