import { AuthStore } from './../store/auth-store';
import { LoginUserDto } from './../models/loginUserDto';
import { HttpClient } from './http-client';

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
    const token = await this.httpClient.post('/auth', loginUserDto);
    const jwtToken = await token.json();
    AuthStore.state.jwt = jwtToken;
    return jwtToken.token;
  }

  async logout() {
    AuthStore.state.jwt = '';
  }

}
