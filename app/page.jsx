import Feed from "@components/Feed";
const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Знаходь та ділись <br className="max-md:hidden" />
				<span className="text=center orange_gradient">Залишками каміння</span>
			</h1>
			<p className="desc text=center">
				Тут Ви можете шукати потрібні залишки та пропонувати свої
			</p>
			<Feed />
		</section>
	);
};

export default Home;
