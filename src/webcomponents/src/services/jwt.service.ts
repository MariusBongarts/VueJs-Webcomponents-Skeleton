import { JwtPayload } from './../models/jwtPayload';
import { HttpClient } from './http-client';
import jwt_decode from 'jwt-decode';

export class JwtService {
  httpClient!: HttpClient;

  constructor() { }

  getJwt(): Promise<string> {
    return new Promise((res: any) => {
      let jwt = localStorage.jwt_webmarker;
      jwt ? res(jwt) : res('');
    });
  }

  /**
   * Tries to get the jwt-token either from the chrome storage or localstorage
   *
   * @returns {Promise<JwtPayload>}
   * @memberof JwtService
   */
  getJwtPayload(): Promise<JwtPayload> {
    return new Promise((res) => {
      const jwt = localStorage.jwt_webmarker;
      const payload = jwt_decode(jwt);
      payload ? res(payload as JwtPayload) : res({} as JwtPayload);
    });
  }

  setJwt(jwt: string) {
    try {
      localStorage.jwt_webmarker = jwt;
    } catch (error) {
      console.log(error);
    }
  }
}
