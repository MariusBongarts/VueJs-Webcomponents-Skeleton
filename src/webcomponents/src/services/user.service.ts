import { JwtService } from './jwt.service';
import { LoginUserDto } from './../models/loginUserDto';
import { HttpClient } from './http-client';

export class UserService {
  httpClient!: HttpClient;
  jwtService = new JwtService();

  constructor(url: string) {
    this.httpClient = new HttpClient({ baseURL: url });
  }

  /**
   * Signs the user in and saves the jwtToken in the jwtService.
   *
   * @returns {Promise<string>}
   * @memberof UserService
   */
  async login(loginUserDto: LoginUserDto): Promise<string> {
    const token = await this.httpClient.post('/auth', loginUserDto);
    const jwtToken = await token.json();
    this.jwtService.setJwt(jwtToken.token);
    return jwtToken.token;
  }

    /**
   * Signs up the user. A jwt token will be the result so that the user gets logged in directly
   *
   * @returns {Promise<string>}
   * @memberof UserService
   */
  async register(loginUserDto: LoginUserDto): Promise<string> {
    const token = await this.httpClient.post('/users/register', loginUserDto);
    const jwtToken = await token.json();
    this.jwtService.setJwt(jwtToken.token);
    return jwtToken.token;
  }

  async resendEmailConfirmationLink(email: string) {
    await this.httpClient.get(`/users/resend-email-confirmation?email=${email}`);
  }

  async logout() {
    this.jwtService.setJwt('');
  }

}
