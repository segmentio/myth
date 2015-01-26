
# Binaries.
browserify = ./node_modules/.bin/browserify
mocha = ./node_modules/.bin/mocha

# Remove non-checked-in files.
clean:
	@rm -rf node_modules myth.js

# Build the browser-side myth.js file with Browserify.
myth.js: lib/*.js node_modules
	@$(browserify) lib/index.js \
		--standalone myth \
		--outfile myth.js

# Install dependencies from npm.
node_modules: package.json
	@npm install
	@touch package.json

# Run the tests.
test: myth.js node_modules
	@$(mocha) \
		--reporter spec \
		--slow 700 \
		--bail

# Run the tests.
test-debug: myth.js node_modules
	@$(mocha) debug \
		--reporter spec \
		--slow 700

# Phony commands.
.PHONY: clean
.PHONY: test
.PHONY: test-debug