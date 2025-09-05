import { Button, Result } from 'antd';
import React from 'react';

const NotFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you are looking for can't be found."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default NotFoundPage;
