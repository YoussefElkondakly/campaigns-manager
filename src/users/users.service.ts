import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.create(createUserDto);
    const savedUser = await this.userRepo.save(user);

    if (!savedUser) {
      throw new InternalServerErrorException('User could not be created.');
    }
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword as User;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email:string):Promise<any> {
    const user=await  this.userRepo.findOne({where:{email:email}})
    
    return user ;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
