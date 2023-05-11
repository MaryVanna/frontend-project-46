install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint: 
	npx eslint .

lint-fix:
	npx eslint --fix .

test:
	npx jest

test-coverage:
	npx jest --coverage
