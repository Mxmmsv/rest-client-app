'use client';

import { Flex } from 'antd';

import CodeSpace from '@/components/rest-client/CodeSpace';
import { ApiResult, ResponseInfo } from '@/types/rest-client';

type Props = {
  result: ApiResult | undefined;
  responseInfo: ResponseInfo;
};

export default function ResponsePanel({ result, responseInfo }: Readonly<Props>) {
  return (
    <Flex align="center" justify="center">
      <CodeSpace
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height="80vh"
        language="json"
        responseInfo={responseInfo}
      />
    </Flex>
  );
}
