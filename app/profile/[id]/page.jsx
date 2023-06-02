"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
const userProfile = ({ params }) => {
	const searchParams = useSearchParams();
	const userName = searchParams.get("name");

	const [userPosts, setUserPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params?.id}/posts`);
			const data = await response.json();

			setUserPosts(data);
		};
		fetchPosts();
	}, [params]);
	return <Profile name={userName} desc="Вітаємо" data={userPosts} />;
};
export default userProfile;
