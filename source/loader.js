import Core from 'css-modules-loader-core';

export default function createLoaderClass(file) {
	return class Loader {
		constructor(root, plugins) {
			this.root = root;
			this.sources = {};
			this.importNr = 0;
			this.core = new Core(plugins);
			this.tokensByPattern = {};
		}

		async fetch(_localName, relativeTo, _trace) {
			const localName = _localName.replace(/^["']|["']$/g, '');
			const trace = _trace || String.fromCharCode(this.importNr++);

			const pattern = file.dependencies[localName];
			// if pattern is undefined check if localName exists in node_modules
			const source = pattern.buffer.toString('utf-8');

			const {injectableSource, exportTokens} = await this.core.load(
					source, pattern.path, trace, this.fetch.bind(this));
			this.sources[trace] = injectableSource;
			this.tokensByPattern[pattern.pattern.id] = exportTokens;

			return exportTokens;
		}
	};
}
