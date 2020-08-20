export interface IEnvConfig {
  apiBaseUrl: string;
  override: {};
}

const envGlobalKey = '_env';

const envConfig: IEnvConfig = Object.assign({}, window[envGlobalKey]);

export const EnvConfigProvider = {provide: 'ENV_CONFIG', useValue: envConfig};
