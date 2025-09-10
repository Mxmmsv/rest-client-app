'use client';

import { Card, Select } from 'antd';
import { CSSProperties, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  data: unknown;
};

export default function ResponseViewer({ data }: Readonly<Props>) {
  const [currentTheme, setCurrentTheme] = useState('lucario');
  const jsonString = JSON.stringify(data, null, 2);

  const themeOptions = Object.keys(themes).map((themeName) => ({
    value: themeName,
    label: themeName,
  }));

  const selectedTheme = themes[currentTheme] || themes.lucario;

  return (
    <Card>
      <Select value={currentTheme} options={themeOptions} onChange={setCurrentTheme} />
      <SyntaxHighlighter
        language="json"
        s
        style={selectedTheme as { [key: string]: CSSProperties }}
      >
        {jsonString}
      </SyntaxHighlighter>
    </Card>
  );
}
