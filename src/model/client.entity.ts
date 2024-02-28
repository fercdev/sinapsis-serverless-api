import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Status } from "./util/status"
import { User } from "../model/user.entity";

@Entity({ name: "clients" })
export class Client {
    @PrimaryGeneratedColumn()
    clientId: number;

    @Column('text')
    name: string;
    
    @Column('tinyint')
    status: Status;

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}