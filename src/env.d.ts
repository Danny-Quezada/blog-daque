/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SNOWPACK_PUBLIC_FIREBASE_API_KEY: string;
    readonly SNOWPACK_PUBLIC_AUTH_DOMAIN: string;
    readonly SNOWPACK_PUBLIC_PROJECT_ID: string;
    readonly SNOWPACK_PUBLIC_STORAGE_BUCKET: string;
    readonly SNOWPACK_PUBLIC_APP_ID: string;
    readonly SNOWPACK_MEASUREMENT_ID:string;
    readonly SNOWPACK_MESSAGING_SENDER_ID:string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }