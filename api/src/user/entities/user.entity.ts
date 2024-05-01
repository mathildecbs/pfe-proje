import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../utils/base_entity/base_entity.service';
import { OwnedInclusion } from '../../inclusion/entities/owned-inclusion.entity';
import { OwnedAlbum } from '../../album/entities/owned-album.entity';

@Entity()
export class User extends BaseEntity {
  @Column( {unique: true, nullable: false})
  username: string

  @Column({ nullable: false})
  password: string

  @Column({nullable:false})
  name: string

  @Column({nullable:true})
  description: string

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  @OneToMany(()=> OwnedInclusion, (inclusion)=> inclusion.user)
  inclusions: OwnedInclusion[]

  @OneToMany(()=> OwnedAlbum, (album)=> album.user)
  albums: OwnedAlbum[]
}
