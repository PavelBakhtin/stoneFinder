"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import dateFormat from "dateformat";
const EditPost = () => {
	const searchParams = useSearchParams();
	const postId = searchParams.get("id");
	useEffect(() => {
		const getPostDetails = async () => {
			const response = await fetch(`/api/post/${postId}`);
			const data = await response.json();
			const now = new Date();
		const dateNow = dateFormat(now, 'HH:MM dd/mm/yyyy')
			setPost({
				info: data.info,
				material: data.material,
				dimensions: data.dimensions,
				tel: data.tel,
				price: data.price,
				location: post.location,
				date:dateNow
			});
		};
		if (postId) getPostDetails();
		if (!session?.user.id) {
			router.push(`/`);
		}
	}, [postId]);
	const router = useRouter();
	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		info: "",
		material: "",
		dimensions: "",
		tel: "",
		price: "",
		location: "",
		type: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		if (!postId) return alert("Post Id not found");
		try {
			const response = await fetch(`/api/post/${postId}`, {
				method: "PATCH",
				body: JSON.stringify({
					material: post.material,
					userId: session?.user.id,
					dimensions: post.dimensions,
					price: post.price,
					location: post.location,
					tel: post.tel,
					info: post.info,
					type: post.type,
				}),
			});
			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={handleSubmit}
		/>
	);
};
export default EditPost;
