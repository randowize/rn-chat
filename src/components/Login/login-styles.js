import React, { useState, useCallback, useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  Button as NbButton,
  Item,
  Container as NbContainer,
  Spinner as NbSpinner,
  Label as NbLabel,
  Input as NbInput,
  Header as NbHeader,
} from 'native-base';
import styled, { css } from 'styled-components/native';

export const Label = NbLabel;
export const Input = NbInput;
export const Header = NbHeader;

export const Container = styled(NbContainer)`
  justify-content: center;
  flex: 1;
`;

export const Title = styled(Container)`
  background: ${props => (props.inverted ? 'white' : '#2196f3')};
  padding: 24px;
`;

export const TextBox = styled(Item)`
  border: solid 1px #ccc;
  margin: 30px 0px;
  height: 60px;
`;

export const Text = styled.Text`
  font-size: 32px;
  color: ${props => props.color || 'white'};
`;

export const ButtonMarginMixin = props => {
  return props.hasMargin
    ? css`
        margin-bottom: 50;
      `
    : null;
};

export const Spinner = NbSpinner;

export const Button = styled(NbButton)`
  background: ${props => '#2196f3'};
  border-radius: 5;
  align-items: center;
  ${ButtonMarginMixin};
`;

export const Form = styled(Container)`
  background: white;
  padding: 10px;
  justify-content: flex-start;
`;

export const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
