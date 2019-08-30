import React from 'react';

import DropDown from '../../dropdown/dropdown.component';

import { ControlPanelContainer } from './control-panel.styles';
import CheckBox from '../../checkbox/checkbox.component';

const ControlPanel = ({ ...otherProps }) => (
  <ControlPanelContainer {...otherProps}>
    <DropDown />
    <CheckBox>check</CheckBox>
  </ControlPanelContainer>
);

export default ControlPanel;
