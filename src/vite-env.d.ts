/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEYCLOAK_URL: string;
  readonly VITE_KEYCLOAK_REALM: string;
  readonly VITE_KEYCLOAK_CLIENT_ID: string;
  readonly VITE_KEYCLOAK_CLIENT_SECRET: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_REACT_APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}