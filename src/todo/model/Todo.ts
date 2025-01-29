import {BaseEntity, Column, Entity, ObjectId, ObjectIdColumn} from 'typeorm';


@Entity ('todos_express')
export  class Todo{
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    title!: string;

    @Column()
    message!:string;

    @Column({default: false})
    isCompleted!: boolean;

}