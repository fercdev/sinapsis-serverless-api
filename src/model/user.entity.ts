import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Status } from "../model/util/status"
import { Campaign } from "./campaign.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    
    @Column('text')
    username: string;
    
    @Column('int')
    status: Status;

    @OneToMany( () => Campaign, campaign => campaign.user)
    campaigns: Campaign[]
}