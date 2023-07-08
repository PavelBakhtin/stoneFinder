'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import StoneCard from './StoneCard';
import ScrollToTop from 'react-scroll-to-top';
import { ColorRing } from 'react-loader-spinner';
const StoneCardList = ({ data, handleColorClick }) => {
   return (
      <div className="mt-6 prompt_layout">
         {data.map((post) => (
            <StoneCard
               key={post._id}
               post={post}
               handleColorClick={handleColorClick}
            />
         ))}
      </div>
   );
};

const Feed = () => {
   const [allPosts, setAllPosts] = useState([]);
   const [type, setType] = useState('All');
   const [isLoading, setIsLoading] = useState(false);
   // Search states
   const [searchText, setSearchText] = useState('');

   const [filteredPosts, setFilteredPosts] = useState([]);

   const { data: session } = useSession();

   const fetchPosts = async () => {
      try {
         setIsLoading(true);
         const response = await fetch('/api/post');
         if (!response.ok) {
            throw new Error();
         }
         const data = await response.json();
         setAllPosts(data);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchPosts();
   }, []);

   useEffect(() => {
      const posts = allPosts.filter((post) => {
         if (type === 'All') {
            return post;
         }
         return post.type === type;
      });
      if (searchText) {
         const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
         const searchPosts = posts.filter(
            (item) =>
               regex.test(item.creator.username) ||
               regex.test(item.color) ||
               regex.test(item.manufacturer) ||
               regex.test(item.info)
         );

         setFilteredPosts(searchPosts);
      } else setFilteredPosts(posts);
   }, [type, searchText]);

   const handleClearSearch = () => {
      setSearchText('');
   };
   const handleSearchChange = (e) => {
      setSearchText(e.target.value);
   };
   const handleChange = (e) => {
      setType(e.target.value);
   };
   const handleColorClick = (color) => {
      setSearchText(color);
   };

   return (
      <section className="feed">
         <ScrollToTop
            smooth
            className="flex-center hover:bg-black"
            component={
               <Image
                  src="/assets/icons/arrow-up.svg"
                  width={24}
                  height={24}
                  alt="toTop"
               />
            }
         />
         <form className="relative w-full md:w-3/5 flex-center sticky">
            <input
               type="text"
               placeholder="Шукайте за назвою або артикулом"
               value={searchText}
               onChange={handleSearchChange}
               required
               className="search_input peer"
            />
            {searchText !== '' && (
               <Image
                  className="absolute right-3 cursor-pointer "
                  onClick={handleClearSearch}
                  src="/assets/icons/close.svg"
                  alt="close"
                  width={14}
                  height={14}
               />
            )}
         </form>
         <ul className="flex gap-3 mt-3">
            <li>
               <input
                  checked={type === 'All'}
                  id="All"
                  className="hidden peer"
                  type="radio"
                  name="choose"
                  value="All"
                  onChange={handleChange}
               />
               <label
                  htmlFor="All"
                  className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
               >
                  Всі
               </label>
            </li>
            <li>
               <input
                  checked={type === 'Sell'}
                  id="Sell"
                  className="hidden peer"
                  type="radio"
                  name="choose"
                  value="Sell"
                  onChange={handleChange}
               />
               <label
                  htmlFor="Sell"
                  className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
               >
                  Пропоную
               </label>
            </li>
            <li>
               <input
                  checked={type === 'Buy'}
                  id="Buy"
                  className="hidden peer"
                  type="radio"
                  name="choose"
                  value="Buy"
                  onChange={handleChange}
               />
               <label
                  htmlFor="Buy"
                  className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
               >
                  Шукаю
               </label>
            </li>
            {/* {session?.user && (
               <li>
                  <input
                     checked={type === 'Favorite'}
                     id="Favorite"
                     className="hidden peer"
                     type="radio"
                     name="choose"
                     value="Favorite"
                     onChange={handleChange}
                  />
                  <label
                     htmlFor="Favorite"
                     className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500"
                  >
                     Обрані
                  </label>
               </li>
            )} */}
         </ul>
         {/* All Prompts */}
         {isLoading ? (
            <div className="mt-3">
               <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperClass="blocks-wrapper"
                  colors={[
                     '#e15b64',
                     '#f47e60',
                     '#f8b26a',
                     '#abbd81',
                     '#849b87'
                  ]}
               />
            </div>
         ) : !searchText && type === 'All' ? (
            <StoneCardList
               data={allPosts}
               handleColorClick={handleColorClick}
            />
         ) : (
            <StoneCardList
               data={filteredPosts}
               handleColorClick={handleColorClick}
            />
         )}
      </section>
   );
};
export default Feed;
