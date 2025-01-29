import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn,  } from "typeorm";

@Entity('Users')
export class User { 
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
@Column()
email:string
@Column()
phone:string
@Column()
password:string
@Column()
role:string
@ManyToMany(()=>Campaign,(campaign)=>campaign.partners)
campaigns: Campaign[]
}
