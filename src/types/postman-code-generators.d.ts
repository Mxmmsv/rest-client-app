declare module 'postman-code-generators' {
  export interface CodegenOptions {
    indentType?: number | string;
    indentCount?: number;
    requestTimeout?: number;
    trimRequestBody?: boolean;
    addCacheHeader?: boolean;
    followRedirect?: boolean;
  }

  export interface Variant {
    key: string;
  }

  export interface Language {
    key: string;
    label: string;
    syntax_mode: string;
    variants: Variant[];
  }

  export function getOptions(
    language: string,
    variant: string,
    callback: (error: string | null, options: Record<string, unknown>) => void
  ): void;

  export function getLanguageList(): Language[];

  export function convert(
    language: string,
    variant: string,
    request: unknown,
    options: CodegenOptions,
    callback: (error: string | null, snippet: string) => void
  ): void;
}
