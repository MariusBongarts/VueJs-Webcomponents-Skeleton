import { AuthStore } from './../store/auth-store';
import { LoginUserDto } from './../models/loginUserDto';
import { HttpClient } from './http-client';
import httpClient from './http-client.service';

export class UserService {
  httpClient!: HttpClient;

  constructor() {
    this.httpClient = new HttpClient({ baseURL: process.env.VUE_APP_BACKEND_URL });
  }

  /**
   * Signs the user in and saves the jwtToken in the VueX AuthStore.
   *
   * @returns {Promise<string>}
   * @memberof UserService
   */
  async login(loginUserDto: LoginUserDto): Promise<string> {
    console.log("Login")
    const token = await httpClient.post('auth', loginUserDto);
    const jwtToken = token.data;
    console.log(jwtToken);
    AuthStore.state.jwt = jwtToken;
    return jwtToken as string;
  }

  async logout() {
    AuthStore.state.jwt = '';
  }

}
