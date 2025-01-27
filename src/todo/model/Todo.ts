import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity ('todos_express')
export  class Todo{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    message!:string;

    @Column({default: false})
    isCompleted!: boolean;

}