import type { ReactNode } from 'react';
import {
	behaviorChanges,
	changes,
	decisions,
	endpoints,
	errorCodes,
	flow,
	leftOut,
	questions,
	stats,
	verification
} from './review.ts';

/** `intro` is what sits under the headline: links to the live pages, or a note in the static report. */
export function Review({ intro }: { intro: ReactNode }) {
	return (
		<div className="review">
			<section className="hero">
				<span className="eyebrow">Code review · Spring Boot pets API</span>
				<h1>A small API, made reliable.</h1>
				<p>
					The task was to review an early version and improve what matters, without rebuilding it. Same job, same shape
					(controller → service → repository). What changed is how reliable, clear and safe it is.
				</p>
				{intro}
			</section>

			<section className="stats">
				{stats.map((s) => (
					<div key={s.label} className="card stat">
						<strong>{s.value}</strong>
						<span className="label">{s.label}</span>
						<span className="muted note">{s.note}</span>
					</div>
				))}
			</section>

			<section>
				<h2>What was wrong, and what changed</h2>
				<div className="changes">
					{changes.map((c, i) => (
						<article key={c.problem} className="card change">
							<span className="num">{i + 1}</span>
							<div>
								<h3>{c.problem}</h3>
								<p className="muted">{c.detail}</p>
								<p>
									<span className="pill ok">fix</span> {c.fix}
								</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="two">
				<div className="card">
					<h2>Behavior changes you may notice</h2>
					<ul>
						{behaviorChanges.map((b) => (
							<li key={b}>{b}</li>
						))}
					</ul>
				</div>
				<div className="card">
					<h2>Left out on purpose</h2>
					<ul>
						{leftOut.map((l) => (
							<li key={l}>{l}</li>
						))}
					</ul>
				</div>
			</section>

			<section>
				<h2>The API at a glance</h2>
				<div className="flow" aria-label="Layers">
					{flow.map((f, i) => (
						<span key={f} className="flow-item">
							<code>{f}</code>
							{i < flow.length - 1 && <span className="arrow">→</span>}
						</span>
					))}
				</div>
				<div className="api">
					<div className="card">
						<h3>Endpoints</h3>
						{endpoints.map((e) => (
							<div key={e.method + e.path} className="api-row">
								<span className={`pill method ${e.method}`}>{e.method}</span>
								<code>{e.path}</code>
								<span className="muted">{e.note}</span>
							</div>
						))}
						<p className="muted rules">
							<code>name</code> and <code>species</code> required; <code>age</code> 0–100 and <code>ownerName</code>{' '}
							optional; text up to 100 characters, trimmed.
						</p>
					</div>
					<div className="card">
						<h3>Errors</h3>
						<p className="muted rules">
							Always <code>application/problem+json</code> with a stable <code>code</code> and, for field problems, an{' '}
							<code>errors</code> map.
						</p>
						{errorCodes.map((e) => (
							<div key={e.code} className="api-row">
								<span className="pill warn">{e.status}</span>
								<code>{e.code}</code>
								<span className="muted">{e.when}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<section>
				<h2>Decisions</h2>
				<div className="decisions">
					{decisions.map((d) => (
						<div key={d.title} className="card">
							<h3>{d.title}</h3>
							<p className="muted">{d.body}</p>
						</div>
					))}
				</div>
			</section>

			<section className="card questions">
				<h2>How it was verified</h2>
				<ul>
					{verification.map((v) => (
						<li key={v}>{v}</li>
					))}
				</ul>
				<p className="muted rules">Not checked: how the Swagger page looks in a browser.</p>
			</section>

			<section className="card questions">
				<h2>Questions for the product side</h2>
				<ul>
					{questions.map((q) => (
						<li key={q}>{q}</li>
					))}
				</ul>
			</section>
		</div>
	);
}
