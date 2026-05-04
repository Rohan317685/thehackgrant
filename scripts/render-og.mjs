import { readFileSync, writeFileSync } from 'fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('static/og.svg', 'utf8');
const resvg = new Resvg(svg, {
	background: '#ffffff',
	font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' }
});
const pngData = resvg.render().asPng();
writeFileSync('static/og.png', pngData);
console.log(`wrote static/og.png (${pngData.length} bytes)`);
