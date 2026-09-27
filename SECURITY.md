# Security

Report security issues privately through GitHub security advisories for
`robit-man/mapsource`. Do not include API keys, npm tokens, full request payloads,
or customer data in a public issue.

Mapsource API keys are bearer credentials. Load them from a secret manager or the
`MAPSOURCE_API_KEY` environment variable, scope them to the intended project, and
never embed them in browser bundles or URLs. The SDK keeps a supplied key only in
the client instance and sends it in the `Authorization` header.

Releases run formatting, lint, strict type checking, tests, a clean build, packed
file allow-list checks, dependency audits, signature verification, and a clean-git
gate. The initial token-based bootstrap publisher also supports stdin so the token
does not appear in the process list. GitHub trusted publishing is the long-term
release path.
