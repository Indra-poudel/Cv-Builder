import { Login } from './types';

export default function fromJson({ accessToken, refreshToken }: Login): Login {
  const encoded = {
    accessToken,
    refreshToken,
  };

  return {
    ...encoded,
  };
}
