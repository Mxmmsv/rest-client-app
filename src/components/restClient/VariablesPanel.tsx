'use client';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Table, Space, Typography, Flex } from 'antd';
import { useState } from 'react';

import { useVariables, type Variable } from '@/components/restClient/hooks/useVariables';

const { Title } = Typography;

export default function VariablesPanel() {
  const { variables, addVariable, deleteVariable } = useVariables();
  const [newVar, setNewVar] = useState<Variable>({ name: '', value: '' });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '35%',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: '45%',
      key: 'value',
    },
    {
      title: 'Delete',
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
      <Title level={3}>Variables</Title>
      <Space.Compact style={{ width: '90%' }}>
        <Input
          placeholder="Variable name"
          value={newVar.name}
          onChange={(e) => setNewVar({ ...newVar, name: e.target.value })}
        />
        <Input
          placeholder="Value"
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
          Add
        </Button>
      </Space.Compact>
      <Table
        style={{ width: '90%' }}
        dataSource={variables}
        columns={columns}
        size="small"
        pagination={false}
      />
    </Flex>
  );
}
