import { Avatar, Tooltip } from 'antd';
import React from 'react';

const TeamAvatars: React.FC = () => (
  <Avatar.Group shape="circle" size="large">
    <a href="https://github.com/AlyaEngineer">
      <Tooltip title="Alla Tsaiukova" placement="top">
        <Avatar style={{ backgroundColor: '#fde3cf' }}>AT</Avatar>
      </Tooltip>
    </a>
    <a href="https://github.com/ek-ole">
      <Tooltip title="Ekaterina Dmitrenko" placement="top">
        <Avatar style={{ backgroundColor: '#f56a00' }}>ED</Avatar>
      </Tooltip>
    </a>
    <a href="https://github.com/Mxmmsv">
      <Tooltip title="Maxim Moiseev" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }}>MM</Avatar>
      </Tooltip>
    </a>
  </Avatar.Group>
);

export default TeamAvatars;
