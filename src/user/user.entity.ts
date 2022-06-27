import 'reflect-metadata';
import { ArticleEntity } from './../article/article.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';
// const saltOrRounds = 10;
// const password = 'random_password';
// const hash = await bcrypt.hash(password, saltOrRounds);
// import { hash } from "bcrypt";
// import { hash } from "bcrpt"

@Entity({ name: 'users' })
export class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text',{ nullable: true})
    username: string;

    @Column('text',{ nullable: true})
    email: string;

    @Column({ default: ''})
    bio: string;

    @Column({ default: ''})
    image: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10);
    }

    @OneToMany(() => ArticleEntity, (article) => article.author)
    articles: ArticleEntity[];


}