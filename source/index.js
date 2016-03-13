import {merge} from 'lodash';
import postcss from 'postcss';
import modules from 'postcss-modules';
import createLoaderClass from './loader';

export default () => {
	return async file => {
		const processor = postcss([
			modules({
				getJSON(_, json) {
					file.meta = merge({}, file.meta, {
						cssmodules: json
					});
				},
				Loader: createLoaderClass(file)
			})
		]);
		const source = file.buffer.toString('utf-8');
		const {css} = await processor.process(source, {
			from: file.path
		});
		file.buffer = css;
		return file;
	};
};
