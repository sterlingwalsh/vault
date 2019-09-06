import React, { useState, useEffect, useCallback } from 'react';

import DropDown from '../../custom-controls/dropdown/dropdown.component';

import { ControlPanelContainer } from './control-panel.styles';
import CheckBox from '../../custom-controls/checkbox/checkbox.component';

import { applist } from '../../../data/steam_applist';

const ControlPanel = ({ ...otherProps }) => {
  const [appList, setApplist] = useState({});

  useEffect(() => {
    const appObj = {};
    applist.forEach(app => {
      appObj[app.name.trim()] = app.appid;
    });
    // console.log(appObj);
    setApplist(appObj);
  }, []);

  const onSelectionChange = useCallback(selection => {
    console.log(selection);
  }, []);
  return (
    <ControlPanelContainer {...otherProps}>
      <DropDown
        placeholder='Placeholder'
        values={appList}
        onSelectionChange={onSelectionChange}
      />
      <CheckBox>check</CheckBox>
    </ControlPanelContainer>
  );
};

export default ControlPanel;
