import { Campaign } from 'src/campaigns/entities/campaign.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ unique: true })
  userName: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column({ nullable: true })
  verifyUserToken: string;
  @Column({ nullable: true })
  passwordResetExpires: Date;
  @Column({ nullable: true })
  passwordResetToken: string;
  @Column({ nullable: true })
  passwordChangedAt: Date;
  @Column({ nullable: true })
  status: boolean;
  @ManyToMany(() => Campaign, (campaign) => campaign.partners)
  campaigns: Campaign[];
}
