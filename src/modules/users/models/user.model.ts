import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { PostModel } from '~/modules/posts/models';

@Table({
  tableName: 'Users',
  timestamps: false,
})
export class UserModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    allowNull: false,
  })
  declare id: number;

  @Unique
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  uuid!: string;

  @Unique
  @IsEmail
  @Column({
    allowNull: false,
  })
  email!: string;

  @Column({
    allowNull: false,
  })
  password!: string;

  @HasMany(() => PostModel)
  posts?: PostModel[];
}
