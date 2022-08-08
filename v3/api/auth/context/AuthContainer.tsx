import { useAuthDeeplink } from '../useAuthDeeplink';

interface Props {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: Props) => {
  useAuthDeeplink();
  return children;
};
