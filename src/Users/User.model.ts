import {Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User{

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    address: string;
  
    @Column()
    usertype: string;
  
    @Column()
    password: string;
}