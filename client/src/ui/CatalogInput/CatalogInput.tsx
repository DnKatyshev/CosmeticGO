'use client'

// react-dependencies
import { FC, useState, useRef } from "react";
import Link from "next/link";
import { useClickOutside } from "@reactuses/core";
import debounce from 'lodash.debounce';

// Server
import { ProductsApi } from "@/app/orval-api";

// Types (Zod + TS)
import { SearchedProductsSchema, TSearchedProductsSchema } from "../../../types/types";

// MUI-dependencies
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";

// styles
import './catalogInput.scss'

// interface
interface IInputField {
  placeholder: string,
  icon: React.ReactNode,
}


export const CatalogInput: FC<IInputField> = ({placeholder, icon}): JSX.Element => {

  const [focus, setFocus] = useState(false)
  const [inputText, setInputText] = useState('Консиллеры')

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, () => {
    setFocus(false);
  });

  
  const {data, isFetching} = ProductsApi.useGetSearchedProducts({inputText})
  const searchedProductData:TSearchedProductsSchema = data?.data.result

  // Zod-проверка
  const zodValidation = SearchedProductsSchema.safeParse(searchedProductData);


  // debounce для задержки обновления state
  const debouncedSetInputText = debounce((newValue) => setInputText(newValue), 500)


  return (
    <div className="catalog-search">

      {focus ? <div className="focused-layer"></div> : ''}

      <TextField
        placeholder={placeholder}
        className={focus ? "mui-input focused" : "mui-input"}
        ref={modalRef}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          },
        }}
        variant="standard"
        onFocus={() => setFocus(true)}
        onChange={(e) => debouncedSetInputText(e.target.value)}
      />

      {/* Валидируем данные, которые вернул запрос - соответствуют ли они нашей ZOD-схеме */} 
      {
        focus && zodValidation.success
                                                              ?
        <div className="catalog-search__products" ref={modalRef}>
          {
            searchedProductData.map((searchedProduct) => (
              <Link className="catalog-search__product" href={`/product/${searchedProduct._id}`}>
                  <img src={searchedProduct.photos[0]} alt="" />
                  <h5>{searchedProduct.name}</h5>
                  <h6>{searchedProduct.discountPrice}₽</h6>
              </Link>
            ))
          }
        </div>
                                                              :
          console.error(zodValidation.error)
      }

    </div>
  );
}
