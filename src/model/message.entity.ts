import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Status } from "./util/status";
import { ShippingStatus } from "../model/util/shippingStatus";
import { Campaign } from "./campaign.entity";

@Entity({ name: "messages" })
export class Message {
    @PrimaryGeneratedColumn()
    messageId: number;

    @Column('int')
    campaignId: number;

    @Column('int')
    shippingStatus: ShippingStatus;

    @Column({type: 'datetime'})
    scheduledDatetime: Date;

    @Column('text')
    message: string;

    @Column('tinyint')
    status: Status;

    @ManyToOne(() => Campaign, campaign => campaign.messages)
    @JoinColumn({name: 'campaignId'})
    campaign: Campaign
}