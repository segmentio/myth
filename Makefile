
browserify = ./node_modules/.bin/browserify
mocha = ./node_modules/.bin/mocha

clean:
	@rm -rf node_modules myth.js

myth.js: lib/*.js node_modules
	@$(browserify) lib/index.js --standalone myth --outfile myth.js

node_modules: package.json
	@npm install
	@touch package.json

test: myth.js node_modules
	@$(mocha) --reporter spec --slow 400 --bail

.PHONY: clean test