import { Button } from 'antd';

import Header from './components/header';

export default function Home() {
  return (
    <div className="App">
      <Header></Header>
      <Button type="primary">Button</Button>
    </div>
  );
}
