import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  catalogQueryParams: {
    catalogCountryId?: number[],
    vegan?: boolean,
    minPrice?: number,
    maxPrice?: number,
    sort?: string
  },

  categoryTabsId: number,

  cartTotalPrice: number,

  mainCheckbox: boolean;
  productCheckboxes: [];

  userAddress: {
    commonAddress: string,
    exactAddress: string
  }
}

type Action = {
  updatecatalogQueryParams: (key: keyof State['catalogQueryParams'], value: any, isChecked: boolean) => void,
  setCategoryTabsId: (newId: number) => void,
  setCartTotalPrice: (newPrice: number) => void,
  setMainCheckbox: (isChecked: boolean, productsCount: number, productIds: string[], username: string, quantity: number) => void;
  setProductCheckboxes: (index: number, isChecked: boolean,  productId: string, user: string, quantities: number) => void;
  setUserAddress: (commonAddress: string, exactAddress: string) => void
}

const useZustandStore = create<State & Action>()(
    persist(immer((set) => ({
      catalogQueryParams: {
        catalogCountryId: [],
        vegan: false,
        minPrice: 0,
        maxPrice: 42000,
        sort: 'categories'
      },
      updatecatalogQueryParams: (key, value, isChecked) => {  // записываем в объект все изменяющиеся параметры. Потом этот объект передаём в хук, для запроса

        set((state) => {

          if (isChecked) {  // проверяем - мы включаем Checkbox или снимаем

            if(Array.isArray(state.catalogQueryParams[key])){
              state.catalogQueryParams[key].push(value)
            } else {
              state.catalogQueryParams[key] = value
            }

          } else {

            if(Array.isArray(state.catalogQueryParams[key])){
              state.catalogQueryParams[key] = state.catalogQueryParams[key].filter((id) => id !== value)
            }
            else if(value === true || value === false) {  // проверяем - vegan-поле, т.к оно boolean
              state.catalogQueryParams[key] = !value
            }
            else{
              state.catalogQueryParams[key] = value
            }
          }

        });
      },


      // id-шник, который будет записываться в записимости от того - какая категория товаров на экране (через хук useIntersectionObserver)
      categoryTabsId: 0,  
      setCategoryTabsId: (newId) => {
        set((state) => {
          state.categoryTabsId = newId
        })
      },


      // Общая стоимость товаро в Корзине. Берём эту цифру из POST-запроса на сервер и записываем в Store
      cartTotalPrice: 0,
      setCartTotalPrice: (newPrice) => {
        set((state) => {
          state.cartTotalPrice = newPrice
        })
      },

      mainCheckbox: false,
      productCheckboxes: [],

      setMainCheckbox: (isChecked, productsCount, productIds, user, quantities) => {
        set((state) => {
            // Обновляем состояние основного чекбокса
            state.mainCheckbox = isChecked;
    
            // Генерируем массив `productCheckboxes`, где каждый объект соответствует отдельному продукту
            state.productCheckboxes = Array.from({ length: productsCount }, (_, index) => ({
                isChecked,                 // Устанавливаем isChecked из mainCheckbox
                productId: productIds[index], // Берём соответствующий ID продукта
                user,                      // Один и тот же пользователь для всех
                quantity: quantities[index], // Количество для текущего продукта
            }));
        });
      },
      setProductCheckboxes: (index, isChecked, productId, user, quantity) => {
        set((state) => { 
          const updatedCheckboxes = [...state.productCheckboxes];
          
          // Убедимся, что массив заполняется только корректными объектами
          while (updatedCheckboxes.length <= index) {
            updatedCheckboxes.push({
                isChecked: false, // Значение по умолчанию
                productId: '',    // Пустой идентификатор
                user: '',         // Пустое значение пользователя
                quantity: 0,      // Значение по умолчанию для количества
            });
          }


          updatedCheckboxes[index] = {isChecked, productId, user, quantity};
          state.productCheckboxes = updatedCheckboxes 
          

          const allChecked = state.productCheckboxes.every((item) => item.isChecked);
          state.mainCheckbox = allChecked 
        });
      },


      userAddress: {},
      setUserAddress: (commonAddress, exactAddress) => {
        set((state) => {
          state.userAddress = {
            commonAddress,
            exactAddress
          }
        })
      }


    })),
    {
      name: 'zustand-store',
    }
    )
);

export default useZustandStore;
