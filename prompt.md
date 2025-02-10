Hello again  Ill give you my code and You will fix this with me  
I am new in nest but I am a little bit confused in using the guard  
Do you know in the simple express and ts server project when we make somthing like guards its a middle ware with the next function I think you understands me.
I want now to implement the same but using Nest js and passport js features 
I did the register and the login fine and generated the token just fine But then while I wanna send a request but in the head of it @UseGuards() decorator It either gives me and 500 err or an Unauthorized exception err so I ll send You the code (with its file name attached in the '()' )
I'll ignore the imports
(/auth/jwt-auth.guard.ts)
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
(/auth/auth.module.ts)
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],inject:[ConfigService],useFactory:async(configService:ConfigService)=>({
        secret:configService.get<string>('SECRET')
        ,signOptions:{
          expiresIn:configService.get<string>('EXPIRES_IN')
        }
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptionService,JwtStrategy],
})
export class AuthModule {}
(/auth/local-auth.guard.ts)
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
(/auth/jwt.strategy.ts)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET') as string,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
lets be clear I'll give you the simple thing if I make a request in the usercontroller 
(/user/user.controller.ts)
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Roles(['admin'])
  @Get('profile')
  getProfile(@Request() req) {
      console.log(req)
      return req.user;
    }}
(/user/user.module.ts)
@Module({    imports: [TypeOrmModule.forFeature([User])],

  controllers: [UsersController],
  providers: [UsersService,{
        provide: APP_GUARD,
        useClass: RolesGuard,
      },],
  exports:[UsersService]
})
export class UsersModule {}
(/src/app.module.ts)
@Module({
  imports: [
    AdsModule,
    CampaignsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DATABASE_NAME'),
          username: config.get<string>('DATABASE_USER'),
          password: config.get<string>('DATABASE_PASSWORD'),
          // host: config.get<string>('DB_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          entities: [User, Campaign, Ad],
          synchronize: true,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
(/src/app.controller.ts)
@Controller()
export class  AppController {
  constructor(private readonly appService: AppService) {}
@UseGuards(JwtAuthGuard)

  @Get('profile')
  getProfile(@Request() req) {
    console.log(req)
    return req.user;}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
(src/main.ts)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new RolesGuard());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.HF ?? 3000);
}
bootstrap();
(/roles/roles.decorator.ts)
export const Roles = Reflector.createDecorator<string[]>();
(/roles/roles.guard.ts)
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector:Reflector){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const roles=this.reflector.get(Roles,context.getHandler())
    if(!roles)return true;
    const request=context.switchToHttp().getRequest();

    const user=request.user;
    
    const match= this.matchRoles(roles,user.role)
if(!match)throw new UnauthorizedException("You Don't have Access to this route")
  return match
  }
matchRoles(inRole:string[],userRole:string):boolean{
  return inRole.includes(userRole)

}
}
I am confused so please fix the issue and explain to me in a simplest way