export interface Header {
  header: string;
  value: string;
  enabled?: boolean;
}

export interface HeadersFormValues {
  headers: Header[];
}

export interface HeadersEditorProps {
  setHeaders?: (headers: Record<string, string>) => void;
}

export interface UrlPreviewProps {
  endpoint: string;
  headers: Record<string, string>;
}
