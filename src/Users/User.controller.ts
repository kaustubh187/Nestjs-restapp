import { Body, Controller, Get, Patch, Post, Req, Res, Session, UnauthorizedException, Delete } from "@nestjs/common";
import { UserService } from "./User.service";
import { Response, Request } from 'express';

@Controller('/api/v1')
export class UserController{
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): any{
        return this.userService.getUserDetails();
    }
    @Post('signup')  
    createUsers( 
        @Body('name') username: string,
        @Body('email') userEmail: string,
        @Body('address') userAddress: string,
        @Body('usertype') userType: string,
        @Body('password') userPassword: string,
        @Session() session: Record<string, any>
        ) { 
            
        this.userService.createUser(username,userEmail,userAddress,userType,userPassword);
        session.user = {
            email: userEmail,
          };
        return {message:'Signup Succesfull'}; 
    }
    
    
    
    @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Session() session: Record<string, any>) {
    const { email, password } = req.body;

    try {
      const user = await this.userService.getUserByEmail(email);

      if (user && (password==user.password)) {
        session.user = {
          email: user.email,
        };
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred' });
    }
  }
  @Patch('update')
  async updateUserDetails(
    @Session() session: Record<string, any>,
    @Body('name') name: string,
    @Body('address') address: string,
  ): Promise<{ message: string }> {
    if (!session.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Update the user details in the session
    const email = session.user.email;

    await this.userService.updateUserDetails(email, name, address);

    return session.user;
  }
  @Delete('delete')
  async deleteUser(@Session() session: Record<string, any>): Promise<{ message: string }> {
    if (!session.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    const email  = session.user.email;

    await this.userService.deleteUser(email);

    // Clear the session after deleting the user
    session.user = null;

    return { message: 'User deleted successfully' };
  }
}