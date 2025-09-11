'use client';

import CodeSpace from '@/components/CodeSpace';
import { ApiResult, ResponseInfo } from '@/types/rest-client';

type Props = {
  result: ApiResult | undefined;
  responseInfo: ResponseInfo;
};

export default function ResponsePanel({ result, responseInfo }: Readonly<Props>) {
  return (
    <>
      {responseInfo.status && (
        <div>
          Status: {responseInfo.status} {responseInfo.statusText}
          {responseInfo.duration && ` | Time: ${responseInfo.duration}ms`}
        </div>
      )}

      <CodeSpace
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height="400px"
        language="json"
      />
    </>
  );
}
