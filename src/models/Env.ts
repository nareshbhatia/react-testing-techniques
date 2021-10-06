/**
 * An interface representing an environment with environment variables
 */
export interface Env {
  get: (varName: string, defaultValue?: string) => string;
}

/**
 * Implementation that uses the global window object - window._env_
 */
export class WindowEnv implements Env {
  get(varName: string, defaultValue?: string): string {
    const value =
      window && (window as any)._env_ && (window as any)._env_[varName];
    if (value !== undefined) {
      return value;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      throw new Error(`Environment variable ${varName} not found`);
    }
  }
}
