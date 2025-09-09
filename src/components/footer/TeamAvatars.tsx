import { Avatar, Tooltip, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

import { TEAM_MEMBERS } from '@/constants/team';

const { Link } = Typography;

function TeamAvatars() {
  const t = useTranslations('Team');

  return (
    <Avatar.Group shape="circle" size="large">
      {TEAM_MEMBERS.map((member) => (
        <Link key={member.github} href={member.github} target="_blank" rel="noopener noreferrer">
          <Tooltip title={t(member.id)} placement="top">
            <Avatar style={{ backgroundColor: member.color }}>{t(member.id + 'Initials')}</Avatar>
          </Tooltip>
        </Link>
      ))}
    </Avatar.Group>
  );
}

export default TeamAvatars;
