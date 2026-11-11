/// <reference types="vite/client" />

/** Variables d'environnement utilisées par le site (fichier .env, ou réglages Vercel) */
interface ImportMetaEnv {
  /** Clé d'accès Web3Forms pour le formulaire de contact (voir .env.example) */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
