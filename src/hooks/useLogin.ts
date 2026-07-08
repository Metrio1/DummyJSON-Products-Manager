import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '@api/auth';
import { useAuthStore } from '@store/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (user) => {
      setUser(user);
    },
  });
};
