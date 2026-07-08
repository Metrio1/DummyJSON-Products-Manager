import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLogin } from '@hooks/useLogin';
import { loginSchema, type LoginFormValues } from '@utils/validation/loginSchema';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate: login, isPending, error } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-page__container']}>
        <h1 className={styles['login-page__title']}>Вход в систему</h1>

        {error && (
          <div className={styles['login-page__error']} role="alert">
            {error.message}
          </div>
        )}

        <form className={styles['login-page__form']} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['login-page__field']}>
            <label htmlFor="email" className={styles['login-page__label']}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={styles['login-page__input']}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <span id="email-error" className={styles['login-page__field-error']} role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles['login-page__field']}>
            <label htmlFor="password" className={styles['login-page__label']}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={styles['login-page__input']}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <span id="password-error" className={styles['login-page__field-error']} role="alert">
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles['login-page__submit']} disabled={isPending}>
            {isPending ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <details className={styles['login-page__test-data']}>
          <summary>Тестовые данные для входа</summary>
          <ul className={styles['login-page__test-list']}>
            <li>
              <strong>Admin:</strong> admin@test.com / admin123
            </li>
            <li>
              <strong>User:</strong> user@test.com / user123
            </li>
            <li>
              <strong>Editor:</strong> editor@test.com / editor123
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};
