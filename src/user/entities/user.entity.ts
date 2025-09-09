import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'User unique identifier',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User full name',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    description: 'User e-mail address',
  })
  @Column({ unique: true })
  email: string;
}
