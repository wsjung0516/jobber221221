// export const environment = {
//   production: false,
//   prodcution: false,
//   keycloak: {
//     issuer: "https://ec2-44-210-149-20.compute-1.amazonaws.com:8443/auth/realms/jobbor_realm",
//     redirectUri: "http://localhost:4200",   // refer *Valid Redirect URIs in the keyCloack setting.
//     clientId: "jobbor_client",
//     scope: "openid, profile email offline_access"
//   }
// }

import {KeycloakConfig} from 'keycloak-js';
import { JOBBER_CLIENT, JOBBER_ISSUER, JOBBER_REALM } from './keycloak-parameter';

const keycloakConfig: KeycloakConfig = {
  // url: 'https://ec2-44-210-149-20.compute-1.amazonaws.com:8443/auth',
  // realm: 'jobbor_realm',
  // clientId: 'jobbor_client',
  url: `${JOBBER_ISSUER}`,
  realm: `${JOBBER_REALM}`,
  clientId: `${JOBBER_CLIENT}`
};

export const environment = {
    production: false,
    apiPath: '/api/v1',
    keycloak: keycloakConfig,
    url: 'http://localhost:3000/api/v1',  // nestjs api
    // url: 'https://192.168.1.248:3030/api/v1',  // nestjs api
};
