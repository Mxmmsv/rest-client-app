import { Tabs } from 'antd';
import { useTranslations } from 'next-intl';

import HistoryPanel from './HistoryPanel';
import VariablesPanel from './VariablesPanel';

import type { Variable } from './hooks/useVariables';

type Props = {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  deleteVariable: (index: number) => void;
};

export default function LeftPanel({ variables, addVariable, deleteVariable }: Readonly<Props>) {
  const t = useTranslations('LeftPanel');

  const items = [
    {
      key: 'variables',
      label: t('variables'),
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
      label: t('history'),
      children: <HistoryPanel />,
    },
  ];

  return <Tabs centered items={items} />;
}
