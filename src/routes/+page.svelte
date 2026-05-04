<script lang="ts">
	import './page.css';

	const APPLY_URL = 'https://fillout.com/thehackgrant';

	let openFaq: string | null = $state(null);

	function toggle(id: string) {
		openFaq = openFaq === id ? null : id;
	}
</script>

<a
	href="https://hackclub.com"
	target="_blank"
	rel="noopener"
	class="corner-flag"
	aria-label="Hack Club"
>
	<img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="Hack Club flag" />
</a>

<main class="page">
	<div class="card">
		<div class="header">
			<div class="logo" aria-label="TheHackGrant logo">
				<img class="layer blob" src="/propel1.png" alt="" />
				<img class="layer glow" src="/propel4.png" alt="" />
				<img class="layer dino" src="/propel2.png" alt="" />
				<img class="layer rocket" src="/propel3.png" alt="" />
			</div>
			<p class="brand">TheHackGrant</p>
		</div>

		<h1>
			<span class="amount">$50–$200</span> to build something cool.
		</h1>

		<p class="sub">
			A microgrant from Hack Club for anyone under 18. Hardware or software.
			Log your hours, ship your project, and join thousands of others in the
			Hack Club database.
		</p>

		<div class="actions">
			<a href={APPLY_URL} class="apply">Apply now</a>
			<a href="https://hackclub.com" target="_blank" rel="noopener" class="link">
				What's Hack Club? →
			</a>
		</div>

		<div class="faq">
			<button class="q" class:open={openFaq === 'who'} onclick={() => toggle('who')}>
				Who can apply?
			</button>
			{#if openFaq === 'who'}
				<p class="a">Anyone under 18. That's the only requirement.</p>
			{/if}

			<button class="q" class:open={openFaq === 'what'} onclick={() => toggle('what')}>
				What can I build?
			</button>
			{#if openFaq === 'what'}
				<p class="a">
					Hardware or software. A keyboard, a website, a game, a robot, a
					browser extension, a 3D-printed thing. If you're not sure, apply
					anyway.
				</p>
			{/if}

			<button class="q" class:open={openFaq === 'money'} onclick={() => toggle('money')}>
				How does the money work?
			</button>
			{#if openFaq === 'money'}
				<p class="a">
					Between $50 and $200, sent to you through Hack Club's grant
					infrastructure. Your spending gets auto-logged so you don't have
					to keep receipts. Buy parts, pay for hosting, register a domain,
					and it shows up on your project page.
				</p>
			{/if}

			<button class="q" class:open={openFaq === 'hours'} onclick={() => toggle('hours')}>
				What's the catch?
			</button>
			{#if openFaq === 'hours'}
				<p class="a">
					You log hours as you work on the project. It's how we know you're
					actually building something, and it lets you see your own progress
					over time. No long timesheets. Just a quick check-in when you sit
					down to work.
				</p>
			{/if}

			<button class="q" class:open={openFaq === 'database'} onclick={() => toggle('database')}>
				What's the Hack Club database?
			</button>
			{#if openFaq === 'database'}
				<p class="a">
					Hack Club runs a unified database of thousands of teen projects
					from Summer of Making, Highway, Athena, and dozens of other
					programs. Your grant project lives there too, alongside everyone
					else's. You can browse what other teens are building and they can
					find yours.
				</p>
			{/if}

			<button class="q" class:open={openFaq === 'ship'} onclick={() => toggle('ship')}>
				What happens at the end?
			</button>
			{#if openFaq === 'ship'}
				<p class="a">
					You ship it. Wrap up the build, post the project page, share a
					demo or repo link. Shipping is the requirement. Even if it's
					small, broken, or weird, it has to actually exist.
				</p>
			{/if}

			<button class="q" class:open={openFaq === 'when'} onclick={() => toggle('when')}>
				When do I hear back?
			</button>
			{#if openFaq === 'when'}
				<p class="a">Applications are rolling. We try to reply within two weeks.</p>
			{/if}
		</div>

		<p class="footer">
			An initiative by <a href="https://hackclub.com" target="_blank" rel="noopener">Hack Club</a>.
		</p>
	</div>
</main>
