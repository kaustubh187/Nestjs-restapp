import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./User.model";
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService{
    constructor(private readonly entityManager: EntityManager) {}

      createUser(name: string, email: string, address: string, userType: string, password: string): Promise<User> {
        const user = new User();
        user.name = name;
        user.email = email;
        user.address = address;
        user.usertype = userType;
        user.password = password;
    
        return this.entityManager.save(User, user);
      }  
    getUserDetails(): Promise<User[]>  {
        return this.entityManager
        .createQueryBuilder(User, 'user')
        .where('user.usertype IN (:...userTypes)', { userTypes: ['student', 'Merchant', 'mentor'] })
        .select(['user.id', 'user.name', 'user.email', 'user.address', 'user.usertype'])
        .getMany();
    }
 
    async getUserByEmail(email: string): Promise<User> {
      return this.entityManager.findOne(User,{ where: { email } });
    }
    async updateUserDetails(email: string, name: string, address: string): Promise<void> {
      const user = await this.entityManager.findOne(User,{where:{email}});
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.name = name;
      user.address = address;
  
      await this.entityManager.save(user);
    }
    async deleteUser(email: string): Promise<void> {
      const user = await this.entityManager.findOne(User,{ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      await this.entityManager.remove(User,user);
    }
}