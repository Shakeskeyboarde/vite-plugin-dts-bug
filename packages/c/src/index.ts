export interface Client {
  request: (callback: (response: string) => void) => void;
}

/**
 * This represents a library that exports a client factory function.
 */
export const createClient = (): Client => {
  return {
    request: (callback: (response: string) => void) => callback("RESPONSE"),
  };
};
