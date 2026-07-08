import type { Product } from '@shared';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <article className={styles['product-card']}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles['product-card__image']}
        loading="lazy"
      />
      <h3 className={styles['product-card__title']}>{product.title}</h3>
      <p className={styles['product-card__category']}>{product.category}</p>
      <p className={styles['product-card__brand']}>{product.brand}</p>
      <p className={styles['product-card__price']}>${product.price}</p>
      <div className={styles['product-card__actions']}>
        <button
          className={styles['product-card__edit-button']}
          onClick={() => onEdit(product)}
          type="button"
        >
          Редактировать
        </button>
        <button
          className={styles['product-card__delete-button']}
          onClick={() => onDelete(product.id)}
          type="button"
        >
          Удалить
        </button>
      </div>
    </article>
  );
};
