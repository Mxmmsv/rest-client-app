'use client';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table, Space, Typography, Flex, Card } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { type Variable } from '@/components/restClient/hooks/useVariables';

const { Title } = Typography;

type Props = {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  deleteVariable: (index: number) => void;
};

export default function VariablesPanel({
  variables,
  addVariable,
  deleteVariable,
}: Readonly<Props>) {
  const [newVar, setNewVar] = useState<Variable>({ name: '', value: '' });
  const t = useTranslations('VariablesPanel');

  const columns = [
    {
      title: t('variableName'),
      dataIndex: 'name',
      width: '35%',
      key: 'name',
    },
    {
      title: t('value'),
      dataIndex: 'value',
      width: '45%',
      key: 'value',
    },
    {
      title: t('delete'),
      key: 'actions',
      render: (_: unknown, __: Variable, index: number) => (
        <Flex align="center" justify="center">
          <Button type="text" size="small" onClick={() => deleteVariable(index)}>
            <DeleteTwoTone />
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap="small" justify="center" align="center">
      <Title level={3}>{t('variables')}</Title>
      <Space.Compact style={{ width: '90%' }}>
        <Input
          placeholder={t('variableName')}
          value={newVar.name}
          onChange={(e) => setNewVar({ ...newVar, name: e.target.value })}
        />
        <Input
          placeholder={t('value')}
          value={newVar.value}
          onChange={(e) => setNewVar({ ...newVar, value: e.target.value })}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            if (newVar.name && newVar.value) {
              addVariable({ name: newVar.name, value: newVar.value });
              setNewVar({ name: '', value: '' });
            }
          }}
        >
          {t('add')}
        </Button>
      </Space.Compact>
      <Card style={{ width: '90%' }}>
        <Table
          dataSource={variables.map((v, index) => ({ ...v, key: index }))}
          columns={columns}
          size="small"
          pagination={false}
        />
      </Card>
    </Flex>
  );
}
