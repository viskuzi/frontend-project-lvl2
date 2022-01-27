lint:
	npx eslint .

install:
	npm ci

test-coverage:
	npx -n --experimental-vm-modules jest --coverage

test:
	npx -n --experimental-vm-modules jest
