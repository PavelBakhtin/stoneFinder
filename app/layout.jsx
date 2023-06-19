import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
("@components/Provider");
export const metadata = {
	title: "Stonefinder",
	description: "Discover & Share stone leftovers",
};
const RootLayout = ({ children }) => {
	return (
		<html lang="uk">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient"></div>
					</div>
					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
