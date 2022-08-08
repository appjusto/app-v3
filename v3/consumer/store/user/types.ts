import { User } from 'firebase/auth';
import { AuthMode } from '../../../api/auth/AuthApi';

export interface UserState {
  user: User | null;
  email: string | null;
  authMode: AuthMode;
}
