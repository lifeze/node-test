import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('用户名或密码错误！');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
      userInfo: {
        ...user,
        userId: user.id,
        roles: user.roles.map((item) => {
          return {
            roleName: item.role.roleName,
            value: item.role.value,
          };
        }),
      },
    };
  }

  async getUserInfo(username: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    const temp = {
      ...user,
      userId: user.id,
      roles: user.roles.map((item) => {
        return {
          roleName: item.role.roleName,
          value: item.role.value,
        };
      }),
    };
    delete temp.password;
    return temp;
  }
}
