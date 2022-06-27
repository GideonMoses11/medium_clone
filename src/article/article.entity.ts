import 'reflect-metadata';
import { UserEntity } from './../user/user.entity';
import { timestamp } from 'rxjs';
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity({ name: 'articles' })
export class ArticleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text',{ nullable: true})
    slug: string;

    @Column({unique: true})
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column('simple-array')
    tagList: string[];

    @Column({ default: 0 })
    favoritesCount: number;

    @BeforeUpdate()
    updateTimestamps() {
        this.updatedAt = new Date();
    }

    @ManyToOne(() => UserEntity, (user) => user.articles, {eager: true})
    author: UserEntity;


}