/**
 * Encodes an SVG string as a data URL that the browser can load as an image.
 */
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Loads an SVG string into an `HTMLImageElement`, ready to be passed to
 * `MglImage`'s `data` input or `Map.addImage`.
 *
 * MapLibre does not parse SVG markup itself and `Map.loadImage` only supports
 * PNG, JPEG and WebP. Loading the SVG through the browser rasterizes it, which
 * is what `addImage` needs.
 *
 * @param svg The SVG markup.
 * @param width Optional intrinsic image width.
 * @param height Optional intrinsic image height.
 */
export function svgToImage(
  svg: string,
  width?: number,
  height?: number,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image(width, height);
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to load SVG image'));
    image.src = svgToDataUrl(svg);
  });
}
