
build: components
	@./node_modules/.bin/component build --dev
	@../bin/myth build/build.css build/build.css

clean:
	@rm -rf build components node_modules

components: component.json
	@./node_modules/.bin/component install --dev

node_modules: package.json
	@npm install

.PHONY: clean