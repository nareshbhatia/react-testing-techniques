import { Env, WindowEnv } from './Env';

// Set username in window environment
(window as any)._env_ = {
  USERNAME: 'john',
};

const env: Env = new WindowEnv();

describe('Env', () => {
  describe('get()', () => {
    it('return value if environment variable exists', () => {
      expect(env.get('USERNAME')).toEqual('john');
    });

    it('return default value if environment variable does not exists', () => {
      expect(env.get('SHOW_LOGO', 'Y')).toEqual('Y');
    });

    it('throws if environment variable does not exists and default value is not provided', () => {
      expect(() => env.get('SHOW_LOGO')).toThrow(
        'Environment variable SHOW_LOGO not found'
      );
    });
  });
});
