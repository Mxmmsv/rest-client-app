import { CloseSquareFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Flex, Space } from 'antd';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { defaultHeaderValues } from '@/constants/defaultHeaderValues';
import { getHeaders } from '@/lib/store/selectors/restClientFormSelectField';
import { updateHeader, removeHeader, addHeader } from '@/lib/store/slice/restClientFormSlice';

export default function HeadersEditor() {
  const dispatch = useDispatch();
  const headers = useSelector(getHeaders);

  const options = useMemo(
    () => Object.keys(defaultHeaderValues).map((header) => ({ value: header })),
    []
  );

  const handleSelect = (index: number, selectedHeader: string) => {
    dispatch(
      updateHeader({
        index,
        header: {
          key: selectedHeader,
          value: defaultHeaderValues[selectedHeader] || '',
        },
      })
    );
  };

  return (
    <Flex vertical gap={10}>
      {headers.map((header, index) => (
        <Space key={header.key} align="baseline" style={{ gap: 10 }}>
          <Checkbox
            checked={header.enabled}
            onChange={(e) =>
              dispatch(updateHeader({ index: index, header: { enabled: e.target.checked } }))
            }
          />
          <AutoComplete
            options={options}
            placeholder="header key"
            style={{ minWidth: 150 }}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            filterOption={(input, option) =>
              (option?.value || '').toLowerCase().includes(input.toLowerCase())
            }
            value={header.key}
            onSelect={(value) => handleSelect(index, value)}
            onChange={(value) => dispatch(updateHeader({ index: index, header: { key: value } }))}
          />
          <AutoComplete
            placeholder="header value"
            style={{ minWidth: 150 }}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            value={header.value}
            onChange={(value) => dispatch(updateHeader({ index: index, header: { value } }))}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => dispatch(removeHeader(index))}
          />
        </Space>
      ))}
      <Space>
        <Button type="dashed" onClick={() => dispatch(addHeader())} icon={<PlusOutlined />}>
          Add header
        </Button>
      </Space>
    </Flex>
  );
}
