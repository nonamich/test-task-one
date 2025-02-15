import { AuthorizedUserDto } from '../dto';

declare global {
  namespace Express {
    interface User extends AuthorizedUserDto {}
  }
}
