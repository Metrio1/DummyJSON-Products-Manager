import { useAuthStore } from '@store/authStore';
import styles from './Header.module.scss';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className={styles.header}>
      <span className={styles['header__email']}>{user?.email}</span>
      <button className={styles['header__logout-button']} onClick={logout} type="button">
        Выйти
      </button>
    </header>
  );
};
