import { Tabs } from 'antd';

import HistoryPanel from './HistoryPanel';
import VariablesPanel from './VariablesPanel';

import type { Variable } from './hooks/useVariables';

type Props = {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  deleteVariable: (index: number) => void;
};

export default function LeftPanel({ variables, addVariable, deleteVariable }: Readonly<Props>) {
  const items = [
    {
      key: 'variables',
      label: 'Variables',
      children: (
        <VariablesPanel
          variables={variables}
          addVariable={addVariable}
          deleteVariable={deleteVariable}
        />
      ),
    },
    {
      key: 'history',
      label: 'History',
      children: <HistoryPanel />,
    },
  ];

  return <Tabs items={items} />;
}
