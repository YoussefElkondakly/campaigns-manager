import { Campaign } from "src/campaigns/entities/campaign.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn,  } from "typeorm";

@Entity('Users')
export class User { 
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
     name: string;
     
    @Column()
     userName: string;

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
