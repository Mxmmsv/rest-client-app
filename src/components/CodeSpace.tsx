'use client';

import { Editor } from '@monaco-editor/react';
import { Card, Flex, Select, Typography } from 'antd';
import { useState } from 'react';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
  height?: string;
  showThemeSelector?: boolean;
};

const { Text } = Typography;

const MONACO_THEMES = ['vs', 'vs-dark', 'hc-black', 'hc-light'];

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language = 'json',
  height = '200px',
}: Readonly<Props>) {
  const [currentTheme, setCurrentTheme] = useState('vs');

  return (
    <Card style={{ width: '100%' }}>
      <Flex align="center" justify="flex-end" gap="small" style={{ marginBottom: 16 }}>
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
      <Editor
        height={height}
        language={language}
        theme={currentTheme}
        value={value}
        onChange={onChange ? (newValue) => onChange(newValue || '') : undefined}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: readOnly ? 'off' : 'on',
          folding: true,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </Card>
  );
}
