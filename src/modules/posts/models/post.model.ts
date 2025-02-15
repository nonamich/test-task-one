import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '~/modules/users/models';

@Table({
  tableName: 'Posts',
  timestamps: false,
})
export class PostModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    allowNull: false,
  })
  declare id: number;

  @Column({
    allowNull: false,
  })
  title!: string;

  @Column({
    allowNull: false,
  })
  body!: string;

  @ForeignKey(() => UserModel)
  @Column({
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => UserModel)
  user?: UserModel;
}
