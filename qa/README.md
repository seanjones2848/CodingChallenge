# Kink.com QA Challenge

Create a minimal JavaScript-based test suite that completes at least one of the following challenges.

## Challenge - Login Failure

From /login, attempt to login and fail; validate that login failed.

Stretch goal: Login from the homepage instead.

## Challenge - Latest Scene

From the homepage, navigate to the first latest scene; validate that the final destination is a scene.

Stretch goal: Attempt to rate a scene and validate that you can see the members-only message.

## Deliverables

Provide a public repository or zip containing the source code and instructions that will allow us to run your test suite.

## Guidelines

- Select a test framework; we currently use `mocha` / `chai` and `jest`, but use what you're most comfortable with.
- Tests should be executable through `npm test`.
- Update `README.md` as necessary.
- Use `package.json` and do not commit / include `node_modules`.
- All code should be written in JavaScript and executed using Node.js >= 8.
- Documentation and maintainability is a plus.

### Extra Credit

This is not required, but this is how we're doing our tests now.

Install [Docker](https://www.docker.com/).

```bash
mv BONUS-docker-compose.yml docker-compose.yml
mv BONUS-package.json package.json
npm install
docker-compose up -d
```

Use Selenium Webdriver and headless Chrome (included in `package.json` and `docker-compose.yml`).

### Time Allotment

We respect your time and would prefer you not spend more than 3-5 hours on these challenges. Feel free to include code comments to indicate any features you don't have time to implement.
