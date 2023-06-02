"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	const handleEdit = (post) => {
		router.push(`/update-post?id=${post._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt");
		if (hasConfirmed) {
			try {
				await fetch(`/api/post/${post._id.toString()}`, {
					method: "DELETE",
				});
				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchPosts = async () => {
		const response = await fetch(`/api/users/${session?.user.id}/posts`);
		const data = await response.json();

		setPosts(data);
	};

	useEffect(() => {
		if (session?.user.id) {
			fetchPosts();
		}
		if (!session?.user.id) {
			router.push(`/`);
		}
	}, []);
	return (
		<Profile
			name="Мій"
			desc="Вітаємо у Вашому особистому кабінеті"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
