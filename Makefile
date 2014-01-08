
browserify = ./node_modules/.bin/browserify
mocha = ./node_modules/.bin/mocha

clean:
	@rm -rf node_modules

myth.js: lib/index.js node_modules
	@$(browserify) lib/index.js --standalone myth --outfile myth.js

node_modules: package.json
	@npm install
	@touch package.json

release: myth.js test

test: node_modules
	@$(mocha) --reporter spec --slow 400

.PHONY: clean release test