import { Tabs } from 'antd';

import HistoryPanel from './HistoryPanel';
import VariablesPanel from './VariablesPanel';
export default function LeftPanel() {
  const items = [
    {
      key: 'variables',
      label: 'Variables',
      children: <VariablesPanel />,
    },
    {
      key: 'history',
      label: 'History',
      children: <HistoryPanel />,
    },
  ];

  return <Tabs items={items} />;
}
