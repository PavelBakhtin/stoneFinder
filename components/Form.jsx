'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import stoneOptions from '@utils/data';
import CreatableSelect from 'react-select/creatable';
const Form = ({ post, setPost, submitting, handleSubmit }) => {
   const [selected, setSelected] = useState('');
   // const [color, setcolor] = useState(null);
   // const [dimensions, setDimensions] = useState(null);
   // const [price, setPrice] = useState(null);
   // const [tel, setTel] = useState(null);
   // const [location, setLocation] = useState(null);
   // const [info, setInfo] = useState(null);

   useEffect(() => {
      setPost({ ...post, type: 'Sell' });
   }, []);
   const handleChange = (event) => {
      setPost({ ...post, type: event.target.value });
   };

   return (
      <section className="w-full max-w-full flex-start flex-col">
         <h1 className="head_text text-left">
            <span className="blue_gradient">Створити оголошення</span>
         </h1>

         <form
            onSubmit={handleSubmit}
            className="mt-10 w-full max-w-2x1 flex flex-col gap-5 glassmorphism"
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
                     onChange={handleChange}
                  />
                  <label
                     className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
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
                     onChange={handleChange}
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
                  ></input>
               )}
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Розміри*
                  {/* <span className="font-normal">(Довжина, ширина, товщина)</span> */}
               </span>

               <input
                  value={post.dimensions}
                  required
                  onChange={(e) => {
                     setPost({ ...post, dimensions: e.target.value });
                  }}
                  placeholder="Довжина, ширина, товщина"
                  className="form_input"
               ></input>
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Телефон*
                  {/* <span className="font-normal">
							(#product, #webdevelopment, #idea)
						</span> */}
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
               ></input>
            </label>
            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Приблизна вартість
                  {/* <span className="font-normal">
							(#product, #webdevelopment, #idea)
						</span> */}
               </span>

               <input
                  value={post.price}
                  onChange={(e) => {
                     setPost({ ...post, price: e.target.value });
                  }}
                  placeholder="Зручна валюта"
                  className="form_input"
               ></input>
            </label>

            <label>
               <span className="font-satoshi font-semibold text-base text-gray-700">
                  Локація
                  {/* <span className="font-normal">
							(#product, #webdevelopment, #idea)
						</span> */}
               </span>
               <input
                  value={post.location}
                  onChange={(e) => {
                     setPost({ ...post, location: e.target.value });
                  }}
                  placeholder="Населений пункт"
                  className="form_input"
               ></input>
            </label>
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
                  className="px-5 py-1.5 text-sm bg-primary-orange text-white disabled: bg-primary-grey rounded-full"
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
