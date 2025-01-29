import { Ad } from "src/ads/entities/ad.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Campaigns')
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;

  @OneToMany(() => Ad, (ads) => ads.campaigned)
  ads: Ad[];
  
  @ManyToMany(() => User)
  @JoinTable({
    name: 'campaign_users', // Name of the join table
    joinColumn: { name: 'campaign_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  partners: User[];
}
