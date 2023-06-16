"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import StoneCard from "./StoneCard";

const StoneCardList = ({ data,  handleMaterialClick }) => {
	return (
		<div className="mt-6 prompt_layout">
			{data.map((post) => (
				<StoneCard key={post._id} post={post}  handleMaterialClick={ handleMaterialClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);
	const [type, setType] = useState("All");
	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const fetchPosts = async () => {
		const response = await fetch("/api/post");
		const data = await response.json();
		setAllPosts(data);
		
	};

	useEffect( () => {
		 fetchPosts();
	
	}, []);
	
	useEffect(() => {	

		const posts = allPosts.filter(post => {
			
			if (type === "All") {
				
				return post
			}
			return post.type === type
		})
		setFilteredPosts(posts)
	}, [type]);
	const filterPosts = (searchtext) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.material) ||
				regex.test(item.info)
		);
	};
	const handleClearSearch = () => {
		setSearchText('');
	}
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
	setType(e.target.value)

}
	const handleMaterialClick = (material) => {
		setSearchText(material);
		
		const searchResult = filterPosts(material);
		setSearchedResults(searchResult);
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Шукайте за назвою або артикулом"
					value={searchText}
					onChange={handleSearchChange}
					required			className="search_input peer"
				/>
			  {searchText !== '' && <Image className='absolute right-2 cursor-pointer' onClick={handleClearSearch} src="/assets/icons/close.svg" alt="close" width={12} height={12}/>}
			</form>
			<ul className="flex gap-3 mt-3">
				<li>
				<input checked={type === 'All'} id="All" className="hidden peer" type='radio' name='choose' value='All' onChange={handleChange} />
				<label htmlFor="All" className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Всі</label>
				</li>
				<li>
					<input checked={type === 'Buy'} id="Buy" className="hidden peer" type='radio' name='choose' value='Buy' onChange={handleChange} />
				<label htmlFor="Buy" className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Шукаю</label>
		</li>
				<li>
				<input checked={type === 'Sell'} id="Sell" className="hidden peer" type='radio' name='choose' value='Sell' onChange={handleChange} />
				<label htmlFor="Sell" className="p-2  cursor-pointer min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Пропоную</label>
				</li>
			</ul>
			{/* All Prompts */}
			{searchText ? (
				<StoneCardList data={searchedResults} handleMaterialClick={handleMaterialClick} />
			) : filteredPosts.length === 0 ? (
				<StoneCardList data={allPosts} handleMaterialClick={handleMaterialClick} />
			) :  (
				<StoneCardList data={filteredPosts} handleMaterialClick={handleMaterialClick} />
			)}
		</section>
	);
};

export default Feed;
