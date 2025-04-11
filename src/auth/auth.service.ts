import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly validToken = 'masterkey';

    validateToken(token: String): void{
        if(token !== this.validToken){
            throw new UnauthorizedException('Token Invalido')
        }
    }
}
