
build: node_modules components index.js index.css
	@./node_modules/.bin/component build --dev
	@../bin/myth build/build.css build/build.css

clean:
	@rm -rf build components node_modules

components: component.json
	@./node_modules/.bin/component install --dev

node_modules: package.json
	@npm install

test: build
	@open ../index.html

.PHONY: clean test