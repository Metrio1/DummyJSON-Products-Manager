import * as yup from 'yup';

export const productSchema = yup.object({
  title: yup
    .string()
    .required('Введите название')
    .min(2, 'Минимум 2 символа')
    .max(100, 'Максимум 100 символов'),
  description: yup
    .string()
    .required('Введите описание')
    .min(10, 'Минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),
  price: yup
    .number()
    .typeError('Цена должна быть числом')
    .required('Введите цену')
    .positive('Цена должна быть больше 0'),
  category: yup.string().required('Введите категорию'),
  brand: yup.string().required('Введите бренд'),
  stock: yup
    .number()
    .typeError('Остаток должен быть числом')
    .required('Введите остаток')
    .integer('Остаток должен быть целым числом')
    .min(0, 'Остаток не может быть отрицательным'),
});

export type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
};
