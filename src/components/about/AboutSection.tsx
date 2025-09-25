import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Card, Flex, Typography, Image, Space } from 'antd';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const { Title, Paragraph, Text } = Typography;

const teamMembers = [
  {
    id: 'maxim',
    image: '/member-photo/max.webp',
    github: 'https://github.com/Mxmmsv',
    linkedin: 'https://www.linkedin.com/in/moiseevmaxim/',
  },
  {
    id: 'ekaterina',
    image: '/member-photo/ekaterina.webp',
    github: 'https://github.com/ek-ole',
    linkedin: 'https://www.linkedin.com/in/ekaterina-dmitrenko-74531835a',
  },
  {
    id: 'alla',
    image: '/member-photo/alya.webp',
    github: 'https://github.com/AlyaEngineer',
    linkedin: 'https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/',
  },
];

export default function AboutSection() {
  const t = useTranslations('AboutSection');
  const tTeam = useTranslations('Team');

  return (
    <Flex vertical gap="small" align="center">
      <Title level={4}>{t('aboutUs')}</Title>

      <Paragraph style={{ maxWidth: '60vw', textAlign: 'center' }}>
        {t('description')}{' '}
        <Text strong>
          <Link href="https://rs.school/courses/reactjs" target="_blank">
            {t('rsCourse')}
          </Link>
        </Text>
        <br />
        {t('byTeam')}{' '}
        <Text strong>
          <Link href="https://github.com/Mxmmsv/rest-client-app" target="_blank">
            {t('teamName')}
          </Link>
        </Text>
      </Paragraph>

      <Space size="large" wrap style={{ justifyContent: 'center' }}>
        {teamMembers.map((member) => (
          <Card key={member.id} style={{ textAlign: 'center' }} hoverable>
            <Image
              src={member.image}
              alt={tTeam(member.id)}
              width={150}
              height={150}
              style={{ objectFit: 'cover', borderRadius: 10 }}
              preview={false}
            />
            <Title level={5}>{tTeam(member.id)}</Title>
            <Space>
              <Link href={member.github} target="_blank">
                <GithubOutlined style={{ fontSize: '24px' }} />
              </Link>
              <Link href={member.linkedin} target="_blank">
                <LinkedinOutlined style={{ fontSize: '24px' }} />
              </Link>
            </Space>
          </Card>
        ))}
      </Space>
    </Flex>
  );
}
