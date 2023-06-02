"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex flex-center gap-2">
				<Image
					className="object-contain"
					src="/assets/images/logo.svg"
					alt="Stonefinder Logo"
					width={30}
					height={30}
				/>
				<p className="logo_text">Stonefinder</p>
			</Link>
			{/* Desktop Nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link className="black_btn" href="/create-post">
							Створити оголошення
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Вийти
						</button>
						<Link href="/profile">
							<Image
								src={session?.user.image}
								alt="profile"
								className="rounded-full"
								width={37}
								height={37}
							/>
						</Link>
					</div>
				) : (
					<>
						{providers && (
							<button
								type="button"
								onClick={() => {
									signIn();
								}}
								className="black_btn"
							>
								Увійти
							</button>
						)}
					</>
				)}
			</div>
			{/* Mob nav */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							alt="profile"
							className="rounded-full"
							width={37}
							height={37}
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Мій профіль
								</Link>
								<Link
									href="/create-post"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
								</Link>
								<button
									className="mt-5 w-full black_btn"
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Вийти
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers && (
							<button
								type="button"
								onClick={() => {
									signIn();
								}}
								className="black_btn"
							>
								Увійти
							</button>
						)}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
