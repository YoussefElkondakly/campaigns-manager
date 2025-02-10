import { Exclude, Expose } from "class-transformer";

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  userName: string;
  @Expose()
  email: string;
  @Expose()
  phone: string;
  @Expose()
  role: string;
  @Exclude()
  password: string;
  
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
/**
 *  id: '4e91a603-f37a-4194-9a42-eb2332a479f0',
  
  password: '$2b$10$A6ZA2OrDNusgMrriVaRE4.sWlCH/IEFhRFqN4ABsgWRbIbaE9N9sq',
 
  userName: 'youssef2911',
  email: 'youssef@gmail.com',
  phone: '+201551334153',
  password: '$2b$10$A6ZA2OrDNusgMrriVaRE4.sWlCH/IEFhRFqN4ABsgWRbIbaE9N9sq',
  userName: 'youssef2911',
  email: 'youssef@gmail.com',
  userName: 'youssef2911',
  userName: 'youssef2911',
  email: 'youssef@gmail.com',
  email: 'youssef@gmail.com',
  phone: '+201551334153',
  password: '$2b$10$A6ZA2OrDNusgMrriVaRE4.sWlCH/IEFhRFqN4ABsgWRbIbaE9N9sq',
  role: 'admin'
 */