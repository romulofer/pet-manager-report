import { Review } from './Review.tsx';

export function App() {
	return (
		<>
			<header className="site">
				<div className="bar">
					<span className="brand">
						<span>🐾</span> Pet Manager
					</span>
					<span className="pill">Review report</span>
				</div>
			</header>

			<main>
				<Review
					intro={
						<p className="note-box">
							This page summarizes a code review of a small Spring Boot pets API: what was found, what changed and why,
							and how the API behaves. The API itself is not hosted here.
						</p>
					}
				/>
			</main>

			<footer className="site">
				Static report · <a href="https://github.com/romulofer/pet-manager-report">source on GitHub</a>
			</footer>
		</>
	);
}
