lint:
	npx eslint .

install:
	npm ci

test-coverage:
	npx -n --experimental-vm-modules jest --collect-coverage
