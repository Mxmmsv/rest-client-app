import { Avatar, Tooltip, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

import { TEAM_MEMBERS } from '@/constants/team';
import { cn } from '@/lib/cn';

const { Link } = Typography;

function TeamAvatars() {
  const t = useTranslations('Team');

  return (
    <Avatar.Group shape="circle" size="large">
      {TEAM_MEMBERS.map((member) => (
        <Link
          key={member.github}
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'hover:drop-shadow-lg',
            'hover:[filter:drop-shadow(0_0_4px_var(--color-additional))]',
            'transition-all duration-300'
          )}
        >
          <Tooltip title={t(member.id)} placement="top">
            <Avatar style={{ backgroundColor: member.color }}>{t(member.id + 'Initials')}</Avatar>
          </Tooltip>
        </Link>
      ))}
    </Avatar.Group>
  );
}

export default TeamAvatars;
