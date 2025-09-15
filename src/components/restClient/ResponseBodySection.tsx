import { Empty, Flex, Typography } from 'antd';

import { ApiResult } from './types';

export default function ResponseBody({
  result,
  titleText = 'body title',
}: Readonly<{
  result: ApiResult | undefined | string;
  titleText: string;
}>) {
  const { Title, Paragraph } = Typography;

  if (!result) {
    return (
      <Flex vertical align="center" style={{ width: '100%' }}>
        <Title level={5}>{titleText}</Title>
        <Empty
          style={{
            width: '100%',
            height: '50vh',
            overflowX: 'auto',
          }}
        >
          <pre
            style={{
              width: '100%',
              height: '50vh',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowX: 'auto',
            }}
          ></pre>
        </Empty>
      </Flex>
    );
  }

  return (
    <Flex vertical align="center" style={{ width: '100%' }}>
      <Title level={5}>{titleText}</Title>
      <Paragraph>
        <pre
          style={{
            width: '100%',
            height: '50vh',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            overflowX: 'auto',
          }}
        >
          {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
        </pre>
      </Paragraph>
    </Flex>
  );
}
