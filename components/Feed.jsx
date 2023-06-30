'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import StoneCard from './StoneCard';
import ScrollToTop from 'react-scroll-to-top';
const StoneCardList = ({ data, handlecolorClick }) => {
   return (
      <div className="mt-6 prompt_layout">
         {data.map((post) => (
            <StoneCard
               key={post._id}
               post={post}
               handlecolorClick={handlecolorClick}
            />
         ))}
      </div>
   );
};

const Feed = () => {
   const [allPosts, setAllPosts] = useState([]);
   const [type, setType] = useState('All');
   // Search states
   const [searchText, setSearchText] = useState('');
   const [searchTimeout, setSearchTimeout] = useState(null);
   const [searchedResults, setSearchedResults] = useState([]);
   const [filteredPosts, setFilteredPosts] = useState([]);
   const fetchPosts = async () => {
      const response = await fetch('/api/post');
      const data = await response.json();
      setAllPosts(data);
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
      setFilteredPosts(posts);
   }, [type]);
   const filterPosts = (searchtext) => {
      const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
      return allPosts.filter(
         (item) =>
            regex.test(item.creator.username) ||
            regex.test(item.color) ||
            regex.test(item.manufacturer) ||
            regex.test(item.info)
      );
   };
   const handleClearSearch = () => {
      setSearchText('');
   };
   const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);

      // debounce method
      setSearchTimeout(
         setTimeout(() => {
            const searchResult = filterPosts(e.target.value);
            setSearchedResults(searchResult);
         }, 500)
      );
   };
   const handleChange = (e) => {
      setType(e.target.value);
   };
   const handlecolorClick = (color) => {
      setSearchText(color);

      const searchResult = filterPosts(color);
      setSearchedResults(searchResult);
   };

   return (
      <section className="feed">
         <ScrollToTop
            smooth
            className="flex-center hover:bg-black"
            component={
               <Image src="/assets/icons/arrow-up.svg" width={24} height={24} />
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
         </ul>
         {/* All Prompts */}
         {searchText ? (
            <StoneCardList
               data={searchedResults}
               handlecolorClick={handlecolorClick}
            />
         ) : filteredPosts.length === 0 ? (
            <StoneCardList
               data={allPosts}
               handlecolorClick={handlecolorClick}
            />
         ) : (
            <StoneCardList
               data={filteredPosts}
               handlecolorClick={handlecolorClick}
            />
         )}
      </section>
   );
};

export default Feed;
