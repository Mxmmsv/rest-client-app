'use client';

import { Editor } from '@monaco-editor/react';
import { Card } from 'antd';

type CodeEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  language?: string;
  height?: string;
};

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  language = 'json',
  height = '200px',
}: Readonly<CodeEditorProps>) {
  return (
    <Card style={{ width: '100%' }}>
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
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
