'use client';

import { Flex, Result, Typography } from 'antd';
import { useEffect } from 'react';
const { Text } = Typography;

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Flex
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '16px',
            fontSize: '16px',
          }}
        >
          <Result
            status="warning"
            title={
              <Flex gap="middle" vertical>
                <Text
                  type="danger"
                  style={{
                    fontSize: '20px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'var(--font-quantico_font)',
                  }}
                >
                  Something went wrong during rendering.
                </Text>
                <Text
                  type="danger"
                  style={{
                    fontSize: '16px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    fontFamily: 'var(--font-quantico_font)',
                  }}
                >
                  Don’t worry, it’s not your fault. Try refreshing the page or come back in a few
                  minutes.
                </Text>
              </Flex>
            }
            extra={
              <button
                key="console"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-quantico_font)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                }}
                className="rounded border-1 border-solid border-transparent bg-[var(--color-additional)] p-4 text-white shadow-[0_2px_0_rgba(0,0,0,0.75)] transition-all duration-300 hover:cursor-pointer hover:bg-[var(--color-primary-light)] active:bg-[var(--color-accent-light)]"
                onClick={() => (reset ? reset() : window.location.reload())}
              >
                Try again
              </button>
            }
          />
        </Flex>
      </body>
    </html>
  );
}
