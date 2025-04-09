install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.mjs -h

lint:
	npx eslint .

test:
	npx jest