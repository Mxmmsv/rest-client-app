'use client';

import { Editor } from '@monaco-editor/react';
import { Card, Flex, Select, Typography } from 'antd';
import { useState } from 'react';

import { ResponseInfo } from '@/types/rest-client';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
  height?: string;
  showThemeSelector?: boolean;
  responseInfo?: ResponseInfo;
};

const { Text } = Typography;

const MONACO_THEMES = ['vs', 'vs-dark', 'hc-black', 'hc-light'];

export default function CodeSpace({
  value,
  onChange,
  readOnly = false,
  language = 'json',
  height = '200px',
  responseInfo,
}: Readonly<Props>) {
  const [currentTheme, setCurrentTheme] = useState('vs');

  return (
    <Card style={{ width: '90%' }}>
      <Flex align="center" justify="flex-end" gap="small" style={{ marginBottom: 6 }}>
        <Text type="secondary">Editor theme:</Text>
        <Select
          value={currentTheme}
          style={{ width: 100 }}
          onChange={setCurrentTheme}
          options={MONACO_THEMES.map((theme) => ({
            value: theme,
            label: theme,
          }))}
        />
      </Flex>
      <Flex>
        {responseInfo?.status && (
          <Flex>
            Status: {responseInfo.status} {responseInfo.statusText}
            {responseInfo.duration && ` | Time: ${responseInfo.duration}ms`}
          </Flex>
        )}
      </Flex>
      <Flex align="center" justify="center">
        <Editor
          height={height}
          language={language}
          theme={currentTheme}
          value={value}
          onChange={onChange ? (newValue) => onChange(newValue || '') : undefined}
          options={{
            readOnly,
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: readOnly ? 'off' : 'on',
            folding: true,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </Flex>
    </Card>
  );
}
