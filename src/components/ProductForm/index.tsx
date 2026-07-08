import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productSchema, type ProductFormValues } from '@utils/validation/productSchema';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ProductForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues,
  });

  return (
    <form className={styles['product-form']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['product-form__field']}>
        <label htmlFor="title" className={styles['product-form__label']}>
          Название
        </label>
        <input
          id="title"
          type="text"
          className={styles['product-form__input']}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          {...register('title')}
        />
        {errors.title && (
          <span id="title-error" className={styles['product-form__error']} role="alert">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__field']}>
        <label htmlFor="description" className={styles['product-form__label']}>
          Описание
        </label>
        <textarea
          id="description"
          className={styles['product-form__textarea']}
          rows={4}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
          {...register('description')}
        />
        {errors.description && (
          <span id="description-error" className={styles['product-form__error']} role="alert">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__field']}>
        <label htmlFor="price" className={styles['product-form__label']}>
          Цена
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          className={styles['product-form__input']}
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? 'price-error' : undefined}
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && (
          <span id="price-error" className={styles['product-form__error']} role="alert">
            {errors.price.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__field']}>
        <label htmlFor="category" className={styles['product-form__label']}>
          Категория
        </label>
        <input
          id="category"
          type="text"
          className={styles['product-form__input']}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
          {...register('category')}
        />
        {errors.category && (
          <span id="category-error" className={styles['product-form__error']} role="alert">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__field']}>
        <label htmlFor="brand" className={styles['product-form__label']}>
          Бренд
        </label>
        <input
          id="brand"
          type="text"
          className={styles['product-form__input']}
          aria-invalid={!!errors.brand}
          aria-describedby={errors.brand ? 'brand-error' : undefined}
          {...register('brand')}
        />
        {errors.brand && (
          <span id="brand-error" className={styles['product-form__error']} role="alert">
            {errors.brand.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__field']}>
        <label htmlFor="stock" className={styles['product-form__label']}>
          Остаток
        </label>
        <input
          id="stock"
          type="number"
          className={styles['product-form__input']}
          aria-invalid={!!errors.stock}
          aria-describedby={errors.stock ? 'stock-error' : undefined}
          {...register('stock', { valueAsNumber: true })}
        />
        {errors.stock && (
          <span id="stock-error" className={styles['product-form__error']} role="alert">
            {errors.stock.message}
          </span>
        )}
      </div>

      <div className={styles['product-form__actions']}>
        <button
          type="button"
          className={styles['product-form__cancel-button']}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </button>
        <button
          type="submit"
          className={styles['product-form__submit-button']}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  );
};
