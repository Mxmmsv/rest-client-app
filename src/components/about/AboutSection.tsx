// components/main/AboutSection.tsx
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Card, Flex, Typography, Image, Space } from 'antd';
import Link from 'next/link';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    name: 'Maksim Moiseev',
    image: '/member-photo/max.webp',
    github: 'https://github.com/Mxmmsv',
    linkedin: 'https://www.linkedin.com/in/moiseevmaxim/',
  },
  {
    name: 'Ekaterina Dmitrenko',
    image: '/member-photo/ekaterina.webp',
    github: 'https://github.com/ek-ole',
    linkedin: 'https://www.linkedin.com/in/ekaterina-dmitrenko-74531835a',
  },
  {
    name: 'Alla Tsaiukova',
    image: '/member-photo/alya.webp',
    github: 'https://github.com/AlyaEngineer',
    linkedin: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/',
  },
];

export default function AboutSection() {
  return (
    <Flex vertical gap="small" align="center">
      <Title level={4}>About us</Title>

      <Paragraph style={{ maxWidth: '60vw', textAlign: 'center' }}>
        This application was created as a final project for the{' '}
        <Text strong>
          <Link href="https://rs.school/courses/reactjs" target="_blank">
            RS School React course
          </Link>
        </Text>
        <br />
        by the team{' '}
        <Text strong>
          <Link href="https://github.com/Mxmmsv/rest-client-app" target="_blank">
            &quot;Yet Another Dream Team&quot;
          </Link>
        </Text>
      </Paragraph>

      <Space size="large" wrap style={{ justifyContent: 'center' }}>
        {teamMembers.map((member) => (
          <Card key={member.name} style={{ textAlign: 'center' }} hoverable>
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              style={{ objectFit: 'cover', borderRadius: 10 }}
              preview={false}
            />
            <Title level={5}>{member.name}</Title>
            <Space>
              <Link href={member.github} target="_blank">
                <GithubOutlined style={{ fontSize: '24px' }} />
              </Link>
              {/* Иконка LinkedIn */}
              <Link href={member.linkedin} target="_blank">
                <LinkedinOutlined style={{ fontSize: '24px', color: '#0077b5' }} />
              </Link>
            </Space>
          </Card>
        ))}
      </Space>
    </Flex>
  );
}
