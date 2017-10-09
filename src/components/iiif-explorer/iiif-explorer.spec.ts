import { flush, render } from '@stencil/core/testing';
import { IIIFExplorer } from './iiif-explorer';

describe('my-name', () => {
	it('should build', () => {
		expect(new IIIFExplorer()).toBeTruthy();
	});

	describe('rendering', () => {
		let element;
		beforeEach(async () => {
			element = await render({
				components: [IIIFExplorer],
				html: '<iiif-exporer manifest="http://digital.library.villanova.edu/Collection/vudl:3/IIIF"></iiif-explorer>'
			});
		});

		it('should work without parameters', () => {
			expect(element.textContent).toEqual('loading...');
		});

		// it('should work a first name', async () => {
		// 	element.first = 'Peter';
		// 	await flush(element);
		// 	expect(element.textContent).toEqual('Hello, my name is Peter ');
		// });

		// it('should work with a last name', async () => {
		// 	element.last = 'Parker';
		// 	await flush(element);
		// 	expect(element.textContent).toEqual('Hello, my name is  Parker');
		// });

		// it('should work with both a first and a list name', async () => {
		// 	element.first = 'Peter'
		// 	element.last = 'Parker';
		// 	await flush(element);
		// 	expect(element.textContent).toEqual('Hello, my name is Peter Parker');
		// });
	});
});