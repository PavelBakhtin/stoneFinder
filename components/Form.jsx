'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import stoneOptions from '@utils/stone-options';
import cities from '@utils/cities';
import CreatableSelect from 'react-select/creatable';
const Form = ({ post, setPost, submitting, handleSubmit }) => {
   const [selected, setSelected] = useState('');
   const [selectedCity, setSelectedCity] = useState('');
   const [priceValue, setPriceValue] = useState('');
   const [checkedPrice, setPriceChecked] = useState(false);
   useEffect(() => {
      setPost({ ...post, type: 'Sell' });
   }, []);
   const handleTypeChange = (event) => {
      setPost({ ...post, type: event.target.value });
   };

   return (
      <section className="w-full max-w-full flex-center flex-col">
         <h1 className="head_text text-left">
            <span className="blue_gradient">Створити оголошення</span>
         </h1>

         <form
            onSubmit={handleSubmit}
            className=" w-full max-w-xl flex flex-col gap-5 glassmorphism"
         >
            <ul className="flex gap-3 mt-3" required>
               <li>
                  <input
                     className="hidden peer"
                     defaultChecked
                     type="radio"
                     id="Sell"
                     name="choose"
                     value="Sell"
                     onChange={handleTypeChange}
                  />
                  <label
                     className="p-2 mr-3 cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
                     htmlFor="Sell"
                  >
                     Пропоную
                  </label>
               </li>
               <li>
                  <input
                     className="hidden peer"
                     type="radio"
                     id="Buy"
                     name="choose"
                     value="Buy"
                     onChange={handleTypeChange}
                  />
                  <label
                     className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
                     htmlFor="Buy"
                  >
                     Шукаю
                  </label>
               </li>
            </ul>

            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Матеріал*
               </span>
               <CreatableSelect
                  styles={{
                     control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                        marginTop: '8px'
                     })
                  }}
                  placeholder="Оберіть виробника"
                  required
                  formatCreateLabel={(inputValue) => inputValue}
                  options={stoneOptions}
                  defaultValue={selected}
                  onChange={(e) => {
                     setSelected(e);
                     if (e === null) {
                        return;
                     }
                     setPost({
                        ...post,
                        manufacturer: e.value
                     });
                  }}
                  isClearable
               />
               {selected && (
                  <input
                     value={post.color}
                     required
                     onChange={(e) => {
                        setPost({
                           ...post,
                           color: e.target.value
                        });
                     }}
                     placeholder="Назва декору, артикул..."
                     className="form_input"
                  />
               )}
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Розміри*
               </span>

               <input
                  value={post.dimensions}
                  required
                  onChange={(e) => {
                     setPost({ ...post, dimensions: e.target.value });
                  }}
                  placeholder="Довжина, ширина, товщина"
                  className="form_input"
               />
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Телефон*
               </span>
               <input
                  autoComplete="tel"
                  value={post.tel}
                  required
                  onChange={(e) => {
                     setPost({ ...post, tel: e.target.value });
                  }}
                  placeholder="Номер телефону або пошта"
                  className="form_input"
               />
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Локація*
               </span>
               <CreatableSelect
                  styles={{
                     control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                        marginTop: '8px'
                     })
                  }}
                  placeholder="Оберіть місто"
                  required
                  formatCreateLabel={(inputValue) => inputValue}
                  options={cities}
                  defaultValue={selectedCity}
                  onChange={(e) => {
                     setSelectedCity(e);
                     if (e === null) {
                        return;
                     }
                     setPost({
                        ...post,
                        location: e.value
                     });
                  }}
                  isClearable
               />
            </label>
            <fieldset
               className="flex gap-3 "
               onChange={(e) => {
                  setPost({ ...post, price: e.target.value });
                  if (checkedPrice) {
                     setPost({ ...post, price: priceValue });
                  }
               }}
            >
               <legend className="font-satoshi font-semibold text-base text-gray-700">
                  Приблизна вартість*
               </legend>
               <label>
                  <input
                     required
                     type="text"
                     disabled={checkedPrice}
                     value={priceValue}
                     onChange={(e) => {
                        setPriceValue(e.target.value);
                     }}
                     placeholder="Зручна валюта"
                     className="form_input"
                  />
               </label>
               <label className="p-2 cursor-pointer items-center mt-2">
                  <input
                     checked={checkedPrice}
                     type="checkbox"
                     name="choose"
                     value="Договірна"
                     onChange={() => {
                        setPriceChecked((prev) => !prev);
                     }}
                  />
                  <span className=" font-satoshi font-semibold text-base text-gray-500 ml-1">
                     Договірна
                  </span>
               </label>
            </fieldset>

            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Додаткова інформація
               </span>
               <textarea
                  value={post.info}
                  onChange={(e) => {
                     setPost({ ...post, info: e.target.value });
                  }}
                  placeholder="Деталі"
                  className="form_textarea"
               ></textarea>
            </label>
            <div className="flex-end mx-3 mb-5 gap-4">
               <Link href="/" className="text-gray-500 text-sm">
                  Відміна
               </Link>
               <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-1.5 text-sm bg-orange-500 text-white rounded-full hover:bg-orange-600 "
               >
                  {/* {submitting ? " Створити" : "Заповніть всі поля"} */}
                  Зберегти
               </button>
            </div>
         </form>
      </section>
   );
};

export default Form;
