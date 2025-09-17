import { Flex } from 'antd';

import CodeSpace from './CodeSpace';

import type { ApiResult, ResponseInfo } from '../types';

type ResponsePanelProps = {
  result?: ApiResult | string;
  responseInfo?: ResponseInfo;
};

export default function ResponsePanel({ result, responseInfo }: Readonly<ResponsePanelProps>) {
  return (
    <Flex align="center" justify="center">
      <CodeSpace
        value={typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
        readOnly={true}
        height="45vh"
        language={typeof result === 'string' ? 'javascript' : 'json'}
        responseInfo={responseInfo}
      />
    </Flex>
  );
}
