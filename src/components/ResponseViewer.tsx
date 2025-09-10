'use client';

import { Card, Flex, Select, Typography } from 'antd';
import { CSSProperties, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  data: unknown;
};

const { Text } = Typography;

const selectStyle: CSSProperties = {
  textAlign: 'center',
  height: 25,
  borderRadius: 4,
  padding: '0px',
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
      <Flex align="center" justify="end" gap="8px">
        <Text>Code theme:</Text>
        <Select
          value={currentTheme}
          options={themeOptions}
          onChange={setCurrentTheme}
          style={selectStyle}
        />
      </Flex>
      <SyntaxHighlighter language="json" style={selectedTheme as { [key: string]: CSSProperties }}>
        {jsonString}
      </SyntaxHighlighter>
    </Card>
  );
}
