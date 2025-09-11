import { Empty, Flex, Typography } from 'antd';

import { ApiResult } from './types';

export default function ResponseBody({
  result,
  titleText = 'body title',
  method,
  httpCode,
}: Readonly<{
  result: ApiResult | undefined | string;
  titleText: string;
  method?: string;
  httpCode?: string;
}>) {
  const { Title, Paragraph, Text } = Typography;

  if (!result) {
    return (
      <Flex vertical align="center">
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
      <Flex>
        {method && <Text>Method:{method}</Text>}
        {httpCode && <Text>HTTP response code{httpCode}</Text>}
      </Flex>
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
