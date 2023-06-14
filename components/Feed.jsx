"use client";

import { useState, useEffect } from "react";

import StoneCard from "./StoneCard";

const StoneCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-6 prompt_layout">
			{data.map((post) => (
				<StoneCard key={post._id} post={post} handleTagClick={handleTagClick} />
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
	const handleTagClick = (tagName) => {
		setSearchText(tagName);

		const searchResult = filterPosts(tagName);
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
			</form>
			<ul className="flex gap-3 mt-3">
			<li><input checked={type === 'All'} id="All" className="hidden peer" type='radio' name='choose' value='All' onChange={handleChange} />
				<label  	 htmlFor="All" className="p-2 min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Всі</label>
				</li>
			<li>	<input checked={type === 'Buy'} id="Buy" className="hidden peer" type='radio' name='choose' value='Buy' onChange={handleChange} />
				<label htmlFor="Buy" className="p-2 min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Шукаю</label>
		</li>
				<li>
					<input checked={type === 'Sell'} id="Sell" className="hidden peer" type='radio' name='choose' value='Sell' onChange={handleChange} />
				<label htmlFor="Sell" className="p-2 min-w-250 rounded-lg bg-white font-satoshi hover:bg-orange-500 peer-checked:bg-orange-500" >Пропоную</label>
				</li>
			</ul>
			{/* All Prompts */}
			{searchText ? (
				<StoneCardList data={searchedResults} handleTagClick={handleTagClick} />
			) : filteredPosts.length === 0 ? (
				<StoneCardList data={allPosts} handleTagClick={handleTagClick} />
			) :  (
				<StoneCardList data={filteredPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
