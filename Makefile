
node_modules: package.json
	@npm install

site: node_modules
	@cd site && make

server: site
	@node site/serve.js

test: node_modules
	@node_modules/.bin/mocha --reporter spec

test-command: node_modules
	@cat test/command/input.css | bin/myth
	@bin/myth test/command/input.css test/command/output.css

.PHONY: site test