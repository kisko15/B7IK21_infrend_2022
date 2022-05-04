import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Entity()
export class LoginUsers {

  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true }) 
  email: string;

  @Column({ type: 'varchar', nullable: false }) 
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  isValidPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  generateJWT = () => {
      return jwt.sign({
        email: this.email
      },
      "SECRET",
      { expiresIn: "1h"}
      );
  };
}