import { Campaign } from 'src/campaigns/entities/campaign.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('Ads')
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  type: string;
  @Column()
  status:boolean;
  @ManyToOne(()=>Campaign,(campaign)=>campaign.ads)
  @JoinColumn({name:'campaigned_id'})
  campaigned: Campaign;
}
