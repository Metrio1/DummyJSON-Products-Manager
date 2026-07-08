import { useState } from 'react';
import { Header } from '@components/Header';
import { ProductCard } from '@components/ProductCard';
import { DialogComponent } from '@components/Dialog';
import { ProductForm } from '@components/ProductForm';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { useProducts } from '@hooks/useProducts';
import { useCreateProduct } from '@hooks/useCreateProduct';
import { useUpdateProduct } from '@hooks/useUpdateProduct';
import { useDeleteProduct } from '@hooks/useDeleteProduct';
import type { Product } from '@shared';
import type { ProductFormValues } from '@utils/validation/productSchema';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { data, isLoading, isError, error } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeletingProductId(id);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (formData: ProductFormValues) => {
    setMutationError(null);
    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, data: formData },
        {
          onSuccess: handleCloseDialog,
          onError: (error) => {
            setMutationError(error.message || 'Ошибка при обновлении товара');
          },
        },
      );
    } else {
      createProduct.mutate(formData, {
        onSuccess: handleCloseDialog,
        onError: (error) => {
          setMutationError(error.message || 'Ошибка при создании товара');
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingProductId !== null) {
      setMutationError(null);
      deleteProduct.mutate(deletingProductId, {
        onSuccess: () => setDeletingProductId(null),
        onError: (error) => {
          setMutationError(error.message || 'Ошибка при удалении товара');
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeletingProductId(null);
  };

  const defaultValues = editingProduct
    ? {
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category,
        brand: editingProduct.brand,
        stock: editingProduct.stock,
      }
    : undefined;

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const deletingProduct = data?.products.find((p) => p.id === deletingProductId);

  return (
    <div className={styles['main-page']}>
      <Header />
      <main className={styles['main-page__content']}>
        <div className={styles['main-page__header']}>
          <h1 className={styles['main-page__title']}>Товары</h1>
          <button className={styles['main-page__add-button']} onClick={handleAdd} type="button">
            Добавить
          </button>
        </div>

        {mutationError && (
          <div className={styles['main-page__error']} role="alert">
            {mutationError}
            <button
              className={styles['main-page__error-close']}
              onClick={() => setMutationError(null)}
              type="button"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        )}

        {isLoading && (
          <div className={styles['main-page__status']} role="status" aria-live="polite">
            Загрузка...
          </div>
        )}

        {isError && (
          <div className={styles['main-page__error']} role="alert">
            {error?.message || 'Ошибка загрузки товаров'}
          </div>
        )}

        {data && (
          <div className={styles['main-page__grid']}>
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      <DialogComponent
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingProduct ? 'Редактировать товар' : 'Добавить товар'}
      >
        <ProductForm
          key={editingProduct?.id ?? 'new'}
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseDialog}
          isSubmitting={isSubmitting}
        />
      </DialogComponent>

      <ConfirmDialog
        open={deletingProductId !== null}
        onOpenChange={(open) => !open && handleCancelDelete()}
        title="Подтверждение удаления"
        description={
          deletingProduct
            ? `Удалить товар "${deletingProduct.title}"? Это действие нельзя отменить.`
            : 'Удалить товар? Это действие нельзя отменить.'
        }
        onConfirm={handleConfirmDelete}
        isConfirming={deleteProduct.isPending}
      />
    </div>
  );
};
