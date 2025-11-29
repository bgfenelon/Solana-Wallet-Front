interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_USER_ID?: string;
  // adicione outras vars de ambiente necessárias
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};