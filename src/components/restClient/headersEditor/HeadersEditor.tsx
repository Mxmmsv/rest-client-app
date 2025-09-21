import { CloseSquareFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Checkbox, Flex } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { defaultHeaderValues } from '@/constants/defaultHeaderValues';
import { getHeaders } from '@/lib/store/selectors/restClientFormSelectField';
import { updateHeader, removeHeader, addHeader } from '@/lib/store/slice/restClientFormSlice';

export default function HeadersEditor() {
  const dispatch = useDispatch();
  const headers = useSelector(getHeaders);
  const t = useTranslations('HeadersEditor');

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
    <Flex vertical gap={10} style={{ width: '100%' }}>
      {headers.map((header, index) => (
        <Flex key={`${header.key}-${index}`} align="center" gap={10} style={{ width: '100%' }}>
          <Checkbox
            checked={header.enabled}
            onChange={(e) =>
              dispatch(updateHeader({ index: index, header: { enabled: e.target.checked } }))
            }
          />

          <AutoComplete
            options={options}
            placeholder={t('headerKey')}
            style={{ flex: 1, minWidth: 150 }}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            filterOption={(input, option) =>
              (option?.value || '').toLowerCase().includes(input.toLowerCase())
            }
            value={header.key}
            onSelect={(value) => handleSelect(index, value)}
            onChange={(value) => dispatch(updateHeader({ index: index, header: { key: value } }))}
          />

          <AutoComplete
            placeholder={t('headerValue')}
            style={{ flex: 1, minWidth: 150 }}
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
            value={header.value}
            onChange={(value) => dispatch(updateHeader({ index: index, header: { value } }))}
          />

          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => dispatch(removeHeader(index))}
          />
        </Flex>
      ))}

      <Flex justify="flex-end" style={{ width: '100%' }}>
        <Button type="dashed" onClick={() => dispatch(addHeader())} icon={<PlusOutlined />}>
          {t('addHeader')}
        </Button>
      </Flex>
    </Flex>
  );
}
