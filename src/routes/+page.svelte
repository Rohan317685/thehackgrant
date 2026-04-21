<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import './page.css';

	const novella = resolve('/novella');
	const WORD_SEPARATOR = ' ';
	const HERO_HIGHLIGHT_WORDS = ['hardware', 'software', 'tools', 'games', 'things'];

	let heroHighlightWordIndex = $state(0);

	onMount(() => {
		const scrollDown = document.getElementById('scroll-down') as HTMLParagraphElement;
		scrollDown.addEventListener('click', () => {
			const opacity = parseFloat(getComputedStyle(scrollDown).opacity);
			if (opacity < 1) return;

			const container = document.querySelector('.hero-scroll-container') as HTMLElement;
			const scrollableHeight = container.scrollHeight - window.innerHeight;
			window.scrollTo({
				top: scrollableHeight * 0.85,
				behavior: 'smooth'
			});
		});

		const heroWordInterval = window.setInterval(() => {
			heroHighlightWordIndex = (heroHighlightWordIndex + 1) % HERO_HIGHLIGHT_WORDS.length;
		}, 2000);

		return () => {
			window.clearInterval(heroWordInterval);
		};
	});

	type Token =
		| { type: 'word'; text: string; bold?: boolean; accent?: boolean }
		| { type: 'break' }
		| { type: 'underline'; text: string }
		| { type: 'link'; text: string; href: string };

	const TYPING_TOKENS: Token[] = [
		{ type: 'word', text: 'Most' },
		{ type: 'word', text: 'people' },
		{ type: 'word', text: 'will' },
		{ type: 'word', text: 'tell' },
		{ type: 'word', text: 'a' },
		{ type: 'word', text: 'teenager' },
		{ type: 'word', text: 'with' },
		{ type: 'word', text: 'an' },
		{ type: 'word', text: 'idea' },
		{ type: 'word', text: 'to' },
		{ type: 'word', text: 'wait.' },
		{ type: 'word', text: 'Wait' },
		{ type: 'word', text: 'until' },
		{ type: 'word', text: "you're" },
		{ type: 'word', text: 'older.' },
		{ type: 'word', text: 'Wait' },
		{ type: 'word', text: 'until' },
		{ type: 'word', text: 'you' },
		{ type: 'word', text: 'have' },
		{ type: 'word', text: 'a' },
		{ type: 'word', text: 'degree.' },
		{ type: 'word', text: 'Wait' },
		{ type: 'word', text: 'until' },
		{ type: 'word', text: "you're" },
		{ type: 'word', text: '"ready."' },
		{ type: 'break' },
		{ type: 'word', text: "We" },
		{ type: 'word', text: "don't" },
		{ type: 'word', text: "think" },
		{ type: 'word', text: "teens" },
		{ type: 'word', text: "should" },
		{ type: 'word', text: "wait." },
		{ type: 'word', text: "If" },
		{ type: 'word', text: "you're" },
		{ type: 'word', text: 'under', bold: true, accent: true },
		{ type: 'word', text: '18', bold: true, accent: true },
		{ type: 'word', text: 'and' },
		{ type: 'word', text: 'have' },
		{ type: 'word', text: 'something' },
		{ type: 'word', text: 'to' },
		{ type: 'word', text: 'build,' },
		{ type: 'underline', text: "we'll fund it." }
	];

	let heroScrollContainer: HTMLDivElement | undefined;

	onMount(() => {
		if (!heroScrollContainer) return;

		const heroEl = heroScrollContainer.querySelector<HTMLElement>('.hero');
		const typingWordEls = heroScrollContainer.querySelectorAll<HTMLElement>('.typing-word');
		const total = typingWordEls.length;
		const scrollDownEl = document.getElementById('scroll-down') as HTMLElement;

		const onScroll = () => {
			if (!heroScrollContainer) return;
			const rect = heroScrollContainer.getBoundingClientRect();
			const scrollableHeight = rect.height - window.innerHeight;
			const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));

			const heroFade = Math.max(0, Math.min(1, (progress - 0.1) / 0.18));
			if (heroEl) heroEl.style.opacity = String(1 - heroFade);
			scrollDownEl.style.pointerEvents = heroFade > 0 ? 'none' : 'auto';

			const wordProgress = Math.max(0, Math.min(1, (progress - 0.38) / 0.47));
			const fadeWindow = 3 / total;

			typingWordEls.forEach((word, i) => {
				const start = (i / (total - 1)) * (1 - fadeWindow);
				const wp = Math.max(0, Math.min(1, (wordProgress - start) / fadeWindow));
				word.style.opacity = String(wp);

				if (word.classList.contains('typing-underline')) {
					word.classList.toggle('underline-visible', wp > 0.5);
				}
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div class="hero-scroll-container" bind:this={heroScrollContainer}>
	<div class="carousel-page">
		<div class="herocontainer">
			<div class="hero">
				<div class="hero-row">
					<div class="hero-left">
						<div class="text">
							<img
								class="hero-flag"
								src="https://assets.hackclub.com/flag-standalone-wtransparent.svg"
								alt="Hack Club flag"
							/>
							<h1 id="title">we fund teens.</h1>
							<p id="body">
								$50–$200 grants for teens under 18 to build
								<span class="hero-body-crossfade-wrapper">
									<span class="hero-body-crossfade hero-body-crossfade-sizer" aria-hidden="true">
										<strong class="hero-highlight">
											{HERO_HIGHLIGHT_WORDS.reduce((a, b) =>
												a.length >= b.length ? a : b
											)}.
										</strong>
									</span>
									{#key heroHighlightWordIndex}
										<span
											class="hero-body-crossfade"
											in:fade={{ duration: 350 }}
											out:fade={{ duration: 350 }}
										>
											<strong class="hero-highlight">
												{HERO_HIGHLIGHT_WORDS[heroHighlightWordIndex]}.
											</strong>
										</span>
									{/key}
								</span>
							</p>
							<figure class="hero-video-figure">
								<p class="hero-video-annotation">
									made by <a
										href="https://www.instagram.com/paoloaverycarino/"
										target="_blank"
										rel="noopener noreferrer"
										style="text-decoration: underline; color: inherit;">Paolo</a
									>, a teen filmmaker at Hack Club ↓
								</p>
								<iframe
									class="hero-video"
									src="https://www.youtube-nocookie.com/embed/kkbf092Los0?autoplay=1&mute=1&controls=0&loop=1&playlist=kkbf092Los0&modestbranding=0"
									title="Hack Club Media"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
								<figcaption class="hero-video-caption">
									<a
										href="https://shiba.hackclub.com"
										target="_blank"
										rel="noopener noreferrer"
										style="text-decoration: underline;">Hack Club Shiba</a
									> - Nov, 2025 in Tokyo, Japan
								</figcaption>
							</figure>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="typing-overlay" id="first-intro">
			<p class="typing-text">
				{#each TYPING_TOKENS as token, i (i)}
					{#if token.type === 'break'}
						<br class="typing-word" />
					{:else if token.type === 'link'}
						<!-- eslint-disable svelte/no-navigation-without-resolve -->
						<a
							class="typing-word"
							href={token.href}
							target="_blank"
							rel="noopener noreferrer"
							style="text-decoration: underline; color: inherit; pointer-events: auto;"
							>{token.text}</a
						>{WORD_SEPARATOR}
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					{:else if token.type === 'underline'}
						<span class="typing-word typing-underline">{token.text}</span>{WORD_SEPARATOR}
					{:else if token.accent}
						<span class="typing-word accent">{token.text}</span>{WORD_SEPARATOR}
					{:else}
						<span class="typing-word">{token.text}</span>{WORD_SEPARATOR}
					{/if}
				{/each}
			</p>
		</div>
	</div>
</div>

<section class="fellowship-section">
	<h2 class="title">TheHackGrant</h2>
	<p class="fellowship-body">
		$50–$200, no strings attached, for teens under 18 to build hardware or software projects.
		We back the builder, not the résumé.
	</p>
	<p class="fellowship-body">
		You don't need to be enrolled in anything. You don't need prior experience. You just need an
		idea and the drive to ship it.<br /><br />
		Applications are <strong>rolling</strong> — apply whenever you're ready.
	</p>
	<div class="button">
		<a href="https://fillout.com/thehackgrant" class="apply-button">Apply Now</a>
	</div>
</section>

<section class="hack-club-section">
	<h2 class="title">
		What even is <span id="hack-club"
			><a href="https://hackclub.com" target="_blank">Hack Club</a></span
		>?
	</h2>
	<div class="button-container">
		<div class="button">
			<a id="linkButton" aria-label="YouTube" href="https://www.youtube.com/@hackclubhq"
				><svg
					fill-rule="evenodd"
					clip-rule="evenodd"
					stroke-linejoin="round"
					stroke-miterlimit="1.414"
					xmlns="http://www.w3.org/2000/svg"
					aria-label="youtube"
					viewBox="0 0 32 32"
					preserveAspectRatio="xMidYMid meet"
					fill="currentColor"
					width="48"
					height="48"
					><path d="M20.0065 15.7665L13.5265 19.1265L13.522 12.384L20.0065 15.7665Z"></path><path
						d="M15.7501 6C20.8501 6 22.9971 6.576 24.0861 7.665C25.1751 8.754 25.7501 10.9 25.7501 16C25.7501 21.1 25.1751 23.247 24.0861 24.336C22.9971 25.425 20.8501 26 15.7501 26C10.6501 26 8.50306 25.425 7.41406 24.336C6.32506 23.247 5.75006 21.1 5.75006 16C5.75006 10.9 6.32506 8.753 7.41406 7.665C8.50306 6.576 10.6501 6 15.7501 6ZM27.7501 16C27.7501 6 25.7501 4 15.7501 4C5.75006 4 3.75006 6 3.75006 16C3.75006 26 5.75006 28 15.7501 28C25.7501 28 27.7501 26 27.7501 16Z"
					></path></svg
				></a
			>
		</div>
		<div class="button">
			<a id="linkButton" aria-label="Instagram" href="https://www.instagram.com/starthackclub/"
				><svg
					fill-rule="evenodd"
					clip-rule="evenodd"
					stroke-linejoin="round"
					stroke-miterlimit="1.414"
					xmlns="http://www.w3.org/2000/svg"
					aria-label="instagram"
					viewBox="0 0 32 32"
					preserveAspectRatio="xMidYMid meet"
					fill="currentColor"
					width="48"
					height="48"
					><path
						d="M16 6c5.1 0 7.247.575 8.336 1.664C25.425 8.753 26 10.9 26 16s-.575 7.247-1.664 8.336C23.247 25.425 21.1 26 16 26s-7.247-.575-8.336-1.664C6.575 23.247 6 21.1 6 16s.575-7.247 1.664-8.336C8.753 6.575 10.9 6 16 6zm0-2c10 0 12 2 12 12s-2 12-12 12S4 26 4 16 6 4 16 4z"
					></path><path
						d="M16 9.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM16 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.845-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
					></path></svg
				></a
			>
		</div>
	</div>
	<p class="hc-body">
		We are a 501(c)(3) global non-profit organization based in the United States. We host real
		adventures, run online programs, and provide community for technical teenagers! Every year, our
		community creates <a
			href="https://magazine.hackclub.com"
			target="_blank"
			rel="noopener noreferrer"
			style="text-decoration: underline;">thousands of amazing projects</a
		>, and we ship out thousands of cool prizes, from stickers to laptops to plushies of our mascot!
	</p>
	<section class="videos-body">
		<h1 class="title">Some things teens have built with Hack Club:</h1>
		<div id="video-disclaimer-container">
			<h3>
				These are just examples of what teens in the Hack Club community create every year.
			</h3>
		</div>

		<div id="videos-container">
			<div class="video-container">
				<iframe
					id="fallout"
					src="https://www.youtube-nocookie.com/embed/SrP2ZeNHm6s?si=kxVdUXMkOMGhsxXS"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					loading="lazy"
				></iframe>
				<p class="videos-subtext">
					Fallout: An upcoming hardware hackathon taking place in Shenzhen, China this summer!
				</p>
			</div>
			<div class="video-container">
				<iframe
					id="shipwrecked"
					src="https://www.youtube-nocookie.com/embed/uXWMr0gdLJA?si=Vb4hK6MBO0E5RDWB"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					loading="lazy"
				></iframe>
				<p class="videos-subtext">
					Shipwrecked: A four-day hackathon on a private island we organized last summer!
				</p>
			</div>
		</div>
	</section>
</section>

<section class="past-events">
	<h1 class="title">In the past year, we have organized...</h1>
	<div class="programs-grid">
		<a class="program-card" href="https://flagship.hackclub.com" target="_blank" rel="noopener">
			<img
				class="program-card-img"
				src="https://cdn.hackclub.com/019d9226-a5ac-7d49-8361-46f200cd9cf9/cdn.hackclub.com__019d75da-13a0-755c-9260-3a7a839e6c2b__image.png.webp"
				alt="Campfire Flagship"
			/>
			<img
				class="program-card-logo"
				src="https://cdn.hackclub.com/019d9226-9ff2-7589-9cfd-54493d929d8a/cdn.hackclub.com__019d75d9-1b8c-780a-a990-1c6b65473906__image.png.webp"
				alt="Campfire Flagship logo"
			/>
			<p class="program-card-desc">
				A 3 day flagship game jam in Los Angeles with YouTubers like Michael Reeves, William Osman,
				and many more!
			</p>
		</a>

		<a class="program-card" href="https://midnight.hackclub.com" target="_blank" rel="noopener">
			<img
				class="program-card-img"
				src="https://cdn.hackclub.com/019d9226-1711-7159-9392-7dd842277185/manifesto.hackclub.com__images__midnight.jpg.webp"
				alt="Midnight"
			/>
			<div class="midnight-logo">
				<img
					class="front program-card-logo"
					src="https://cdn.hackclub.com/019d9220-9c84-702a-b94e-2d30e50a499d/midnight-logo.webp"
					alt="Midnight logo"
				/>
			</div>
			<p class="program-card-desc">
				A murder-mystery hackathon held in Austria, Vienna with 60+ teenagers from all across the
				world!
			</p>
		</a>

		<a class="program-card" href="https://blueprint.hackclub.com" target="_blank" rel="noopener">
			<img
				class="program-card-img"
				src="https://cdn.hackclub.com/019d9226-06e7-728e-81ea-12f72df08181/manifesto.hackclub.com__images__blueprint.png.webp"
				alt="Blueprint"
			/>
			<img
				class="program-card-logo"
				src="https://cdn.hackclub.com/019d9226-b27a-7d56-b90f-d62b88efeb29/cdn.hackclub.com__019d75da-1a49-739f-8e97-b3f6f15961ce__image.png.webp"
				alt="Blueprint logo"
				style="width:300px"
			/>
			<p class="program-card-desc">
				From October 2025 to March 2026, Blueprint gave $140,000 to fund 1,500 hardware and
				electronics projects built by 1000 teenagers from 77 countries!
			</p>
		</a>

		<a class="program-card" href="https://siege.hackclub.com" target="_blank" rel="noopener">
			<img
				class="program-card-img"
				src="https://cdn.hackclub.com/019d9226-35c7-753a-999a-ff293fa6e3ed/manifesto.hackclub.com__images__siege.png.webp"
				alt="Siege"
			/>
			<img
				class="program-card-logo"
				src="https://cdn.hackclub.com/019d9226-bda0-7214-863f-fbe54de0d094/cdn.hackclub.com__019d75da-1ce9-7d50-9a52-53aadbfdfce7__image.png.webp"
				alt="Siege logo"
				style="width:161px"
			/>
			<p class="program-card-desc">
				A 14 week event where 250 teens created a project each week to work towards a laptop with
				over 100 Framework laptops given out!
			</p>
		</a>
	</div>
	<h2 id="andsomuchmore">and so much more!</h2>
	<div class="programs-more-grid">
		<a
			class="mini-card"
			href="https://summer.hackclub.com"
			target="_blank"
			rel="noopener"
			style="background-image:url('https://cdn.hackclub.com/019d9226-4624-7611-8f95-816315193e80/manifesto.hackclub.com__images__summer-of-making.png.webp');background-size:cover;background-position:bottom"
		>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-84ba-7696-ab5c-5676754ce263/manifesto.hackclub.com__images__som-logo.png.webp"
				alt="Summer of Making"
				style="width:60%;height:auto"
			/>
		</a>

		<a class="mini-card" href="https://campfire.hackclub.com" target="_blank" rel="noopener">
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-09d7-7b90-909c-49086c91eb05/manifesto.hackclub.com__images__campfire-bg.png.webp"
				alt=""
			/>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-512f-7336-9bfe-8de2f6f8b21c/manifesto.hackclub.com__images__campfire-logo.png.webp"
				alt="Campfire"
				style="width:65%;height:auto"
			/>
		</a>

		<a
			class="mini-card"
			href="https://sleepover.hackclub.com"
			target="_blank"
			rel="noopener"
			style="background-color:#dbdcf7;background-image:url('https://cdn.hackclub.com/019d9219-39b9-7952-8e93-739a5f2852cd/manifesto.hackclub.com__images__sleepover-pattern.png.webp');background-repeat:repeat;background-size:112px"
		>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-7696-7f2d-8ad2-5680f8ddd281/manifesto.hackclub.com__images__sleepover-logo.png.webp"
				alt="Sleepover"
				style="width:60%;height:auto"
			/>
		</a>

		<a class="mini-card" href="https://overglade.hackclub.com" target="_blank" rel="noopener">
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-2983-746c-8338-675ee8d43c87/manifesto.hackclub.com__images__overglade.png.webp"
				alt="Overglade"
			/>
		</a>

		<a
			class="mini-card"
			href="https://undercity.hackclub.com"
			target="_blank"
			rel="noopener"
			style="background:#171717"
		>
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-3f61-7c44-821c-0454f6b9d375/manifesto.hackclub.com__images__undercity-bg.png.webp"
				alt=""
			/>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-91d6-7930-9cef-08d4b1ecfbbe/manifesto.hackclub.com__images__undercity-logo.png.webp"
				alt="Undercity"
				style="width:65%;height:auto"
			/>
		</a>

		<a class="mini-card" href="https://shiba.hackclub.com" target="_blank" rel="noopener">
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-2fa5-736f-bb48-f4ccae39caab/manifesto.hackclub.com__images__shiba-bg.png.webp"
				alt=""
			/>
			<div class="mini-card-overlay"></div>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-6b1f-7bcd-b8e6-7109ef124067/manifesto.hackclub.com__images__shiba-logo.png.webp"
				alt="Shiba Arcade"
				style="width:308px;max-width:80%;height:auto;opacity:0.8;filter:drop-shadow(0 0 80px white)"
			/>
		</a>

		<a class="mini-card" href="https://hackpad.hackclub.com" target="_blank" rel="noopener">
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-0c75-75c8-abac-620f1e8975e4/manifesto.hackclub.com__images__hackpad-bg.png.webp"
				alt=""
			/>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-5507-7f24-9a1b-3cca3a1b8069/manifesto.hackclub.com__images__hackpad-logo.png.webp"
				alt="Hackpad"
				style="width:65%;height:auto"
			/>
		</a>

		<a class="mini-card" href="https://horizons.hackclub.com" target="_blank" rel="noopener">
			<img
				class="mini-card-bg"
				src="https://cdn.hackclub.com/019d9226-10bc-71f8-af20-b10cc75e8ce1/manifesto.hackclub.com__images__horizons-bg.png.webp"
				alt=""
			/>
			<img
				class="mini-card-logo"
				src="https://cdn.hackclub.com/019d9226-5e01-7b26-b441-a18dffc493a8/manifesto.hackclub.com__images__horizons-logo.png.webp"
				alt="Horizons"
				style="width:100%;height:auto"
			/>
		</a>
	</div>
</section>

<section class="blogs">
	<h1 class="stitle">Here's what Hack Clubbers have to say:</h1>
	<a
		href="https://journal.tongyu.fish/gapyear/"
		target="_blank"
		rel="noopener noreferrer"
		class="notes-card"
	>
		<img
			class="notes-card-photo"
			src="https://cdn.hackclub.com/019d9226-c92a-7593-a762-823597d286d5/manifesto.hackclub.com__images__notes-tongyu.jpg.webp"
			alt="Tongyu"
		/>
		<div class="notes-card-text">
			<p class="notes-card-title">this is why you should do a hack club gap year. →</p>
			<p class="notes-card-author">Written by Tongyu, Hack Clubber</p>
		</div>
	</a>

	<a
		href="https://notes.deven.dev/posts/the-plan-for-hack-club-world-dominance"
		class="notes-card"
		target="_blank"
	>
		<img
			class="notes-card-photo"
			src="https://cdn.hackclub.com/019d9226-c0e1-7eee-87a3-7ee3991d6d58/cdn.hackclub.com__019d7609-92c0-7e58-8b43-c91362db8aa9__image_720-4.png.webp"
			alt="Deven"
		/>
		<div class="notes-card-text">
			<p class="notes-card-title">
				The plan for hack club world dominance <span class="notes-card-subtitle"
					>(rundown on Hack Club!)</span
				> →
			</p>
			<p class="notes-card-author">Written by Deven, YSWS Lead @ Hack Club</p>
		</div>
	</a>
</section>

<section class="hwyd-section">
	<h2 class="title">
		Here's what <i><span style="font-family: Garamond; font-weight: bold">you'll</span></i> get.
	</h2>
	<div class="hwyd-panel">
		<img
			class="panel-img left"
			alt="Collage of Hack Club events"
			src="https://cdn.hackclub.com/019d9226-981a-7067-946a-34432f31f525/cdn.hackclub.com__019d6191-88a7-7daa-b4c0-fdcae2fffa38__attend_hc_events.png.webp"
		/>
		<div class="panel-text right">
			<h3 class="stitle">$50–$200 to build what you're imagining</h3>
			<p class="sbody">
				Hardware, software, whatever — if you're under 18 and have an idea worth building,
				we'll put money behind it. No pitch decks. No gatekeepers. Just apply.
			</p>
		</div>
	</div>
	<div class="hwyd-panel">
		<div class="panel-text left">
			<h3 class="stitle">We back the builder, not the résumé</h3>
			<p class="sbody">
				No experience required. No GPA. No credentials. We care about what you want to build
				and whether you have the drive to ship it — that's it.
			</p>
		</div>
		<img
			class="panel-img right"
			alt="Collage of Hack Clubbers doing media"
			src="https://cdn.hackclub.com/019d9306-76c7-7eff-8f6f-b56626d85f4e/run-our-social-media.png"
		/>
	</div>
	<div class="hwyd-panel">
		<img class="panel-img left" alt="Hack Club teenagers" src="https://cdn.hackclub.com/019d9226-981a-7067-946a-34432f31f525/cdn.hackclub.com__019d6191-88a7-7daa-b4c0-fdcae2fffa38__attend_hc_events.png.webp" />
		<div class="panel-text right">
			<h3 class="stitle">Rolling applications — apply whenever</h3>
			<p class="sbody">
				There's no deadline. No cohort. No waiting for a cycle to open.
				When you're ready to build, apply. We review on a rolling basis.
			</p>
		</div>
	</div>
</section>

<section class="cta-section">
	<h1 class="title">The door is open.</h1>
	<div class="vbutton-container">
		<div class="button">
			<a href="https://fillout.com/thehackgrant" class="apply-button">Apply Now</a>
		</div>
		<div class="button">
			<a id="linkButton" href={novella}>A note from the designers ↗</a>
		</div>
	</div>
</section>

<section class="footer">
	<p>
		© 2026 <u><a href="https://hackclub.com">Hack Club</a></u>. 501(c)(3) nonprofit (EIN:
		81-2908499)
	</p>
	<p>
		made with &lt;3 by <u><a href="https://github.com/maxstellar">maxstellar</a></u>,
		<u><a href="https://github.com/sadeshmukh">sadeshmukh</a></u>,
		<u><a href="https://github.com/hellonearth311">hellonearth311</a></u>,
		<u><a href="https://github.com/astra-the-boop">astra celestine</a></u>, and
		<u><a href="https://github.com/mntrushmore">rushmore</a></u>.
		<u><a href="https://github.com/hackclub/novella">always OSS</a>.</u>
		<br />
		heavily inspired by
		<u><a href="https://manifesto.hackclub.com/">manifesto</a></u>
		and
		<u><a href="https://github.com/techpixel">manitej</a></u>.
	</p>
</section>
