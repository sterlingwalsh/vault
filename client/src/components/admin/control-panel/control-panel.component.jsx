import React from 'react';

import { ControlPanelContainer } from './control-panel.styles';

const ControlPanel = ({ ...otherProps }) => (
  <ControlPanelContainer {...otherProps}>Control Panel</ControlPanelContainer>
);

export default ControlPanel;
