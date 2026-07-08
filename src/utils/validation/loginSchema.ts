import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().required('Введите email').email('Некорректный формат email'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(6, 'Пароль должен содержать минимум 6 символов'),
});

export type LoginFormValues = {
  email: string;
  password: string;
};
