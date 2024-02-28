import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import {Status} from "./util/status";
import { User } from "./user.entity"
import { Message } from "./message.entity"

@Entity({name: 'campaigns'})
export class Campaign {

    @PrimaryGeneratedColumn()
    campaignId: number;

    @Column('text')
    name: string;
    
    @Column('int')
    userId: number;
    
    @Column({type: 'datetime'})
    scheduledDatetime: Date;
    
    @Column('tinyint')
    status: Status;

    @ManyToOne(() => User, user => user.campaigns)
    @JoinColumn({name: 'userId'})
    user: User

    @OneToMany(() => Message, message => message.campaign)
    messages: Message[]
     
}