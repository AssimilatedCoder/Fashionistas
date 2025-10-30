// Global type declarations for custom APIs

interface StorageAPI {
  get(key: string): Promise<{ value: string } | null>
  set(key: string, value: string): Promise<boolean>
  delete(key: string): Promise<boolean>
  list(): Promise<string[]>
}

declare global {
  interface Window {
    storage: StorageAPI
  }
}

export {}
