"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import ReactModal from "react-modal";
const StoneCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();
	const [copied, setCopied] = useState("");
	const [showModal, setShowModal] = useState(false);
	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(""), 3000);
	};
	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id) return router.push("/profile");

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};
	const body = document.querySelector("body");
	ReactModal.setAppElement(body);
	const openModal = () => {
		setShowModal(true);
	};
	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="prompt_card  ">
			{post.type === "Sell" ? <div className="flex justify-center   bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 my-1">
				<h3 className="font-satoshi font-bold text-white">
				Пропоную
				</h3>
			</div> : <div className="flex justify-center     bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
				<h3 className="font-satoshi font-bold text-white">
				Шукаю
				</h3>
			</div>}
			<div className="flex justify-between items-center items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
						onClick={handleProfileClick}
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-500"></h3>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Iм'я:{" "}
							</span>
							{post.creator.username}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Матеріал:{" "}
							</span>
							{post.material}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Розміри:{" "}
							</span>
							{post.dimensions}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Контактний номер:{" "}
							</span>
							{post.tel}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-black-500">
								Локація:{" "}
							</span>
							{post.location}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-black-500">
								Ціна:{" "}
							</span>
							{post.price}
						</p>

						{post.info && (
							<p className="font-inter font-sm text-gray-500">
								{" "}
								<span>Коментар: </span>
								{post.info}
							</p>
						)}
					</div>
				</div>
				{/* <div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						width={12}
						height={12}
						alt="copy_image"
					/>
				</div> */}
			</div>
			<p className="my-4 font-satoshi font-sm">{post.prompt}</p>
			<p
				className="font-inter font-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(post.tag)}
			>
				{post.tag}
			</p>
			<div>
				<button
					className="font-inter font-sm blue_gradient cursor-pointer  absolute inset-x-0 bottom-1"
					type="button"
					onClick={openModal}
				>
					Детальніше
				</button>
				<ReactModal
					style={{
						overlay: {
							position: "fixed",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: "rgba(255, 255, 255, 0.75)",
						},
						content: {
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: `translate(-50%, -50%)`,
							border: "1px solid #ccc",
							background: "#fff",
							overflow: "auto",
							WebkitOverflowScrolling: "touch",
							borderRadius: "4px",
							outline: "none",
							padding: "20px",
						},
					}}
					isOpen={showModal}
					// onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					// style={customStyles}
					contentLabel="Example Modal"
					shouldCloseOnOverlayClick={false}
					className="flex flex-center space-y-2"
				>
					<div className="flex justify-center absolute inset-x-0 top-1">
						<h3 className="font-satoshi font-bold text-orange-600">
							{post.type === "Sell" ? "Пропоную" : "Шукаю"}
						</h3>
					</div>
					<Image
						src={post.creator.image}
						alt="user_image"
						width={40}
						height={40}
						className="rounded-full object-contain"
						onClick={handleProfileClick}
					/>
					<div className="flex flex-col">
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Ім'я:{" "}
							</span>
							{post.creator.username}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Матеріал:{" "}
							</span>
							{post.material}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Розміри:{" "}
							</span>
							{post.dimensions}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-gray-500">
								Контактний номер:{" "}
							</span>
							{post.tel}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-black-500">
								Локація:{" "}
							</span>
							{post.location}
						</p>
						<p className="font-inter font-sm text-gray-500">
							<span className="font-satoshi font-semibold text-black-500">
								Ціна:{" "}
							</span>
							{post.price}
						</p>
						{post.info && (
							<p className="font-inter font-sm text-gray-500">
								{" "}
								<span>Коментар: </span>
								{post.info}
							</p>
						)}
						<button type="button" onClick={closeModal}>
							Закрити
						</button>
					</div>
				</ReactModal>
			</div>
			{session?.user.id === post.creator._id && pathName === "/profile" && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Редагувати
					</p>
					<p
						className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Видалити
					</p>
				</div>
			)}
		</div>
	);
};

export default StoneCard;
