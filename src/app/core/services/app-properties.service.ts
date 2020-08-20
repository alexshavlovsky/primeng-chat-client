import {Inject, Injectable} from '@angular/core';
import {IEnvConfig} from '../env.injector';

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {

  constructor(@Inject('ENV_CONFIG') private envConfig: IEnvConfig) {
    if (envConfig.override) {
      const override = envConfig.override;
      for (const key in override) {
        if (this.hasOwnProperty(key)) {
          this[key] = override[key];
        }
      }
    }
  }

  API_URI_PREFIX = '/api';
  API_PORT = 8080; // if null then the location.port will be taken
  API_HOST = null; // if null then the location.hostName will be taken
}
