/**
 * Internal dependencies
 */
import { TEMPLATE_ORIGINS } from '../constants';

/**
 * Check if a template part is revertable to its original theme-provided template file.
 *
 * @param {Object} templatePart The template part entity to check.
 * @return {boolean} Whether the template part is revertable.
 */
export default function isTemplatePartRevertable( templatePart ) {
	if ( ! templatePart ) {
		return false;
	}
	// In patterns list page we map the templates parts to a different object
	// than the one returned from the endpoint. This is why we need to check for
	// two props whether is custom or has a theme file.
	const hasThemeFile =
		templatePart.has_theme_file ||
		templatePart.templatePart?.has_theme_file;
	const isCustom = [
		templatePart.source,
		templatePart.templatePart?.source,
	].includes( TEMPLATE_ORIGINS.custom );

	return hasThemeFile && isCustom;
}
