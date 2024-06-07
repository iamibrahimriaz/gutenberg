/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { useMemo, useEffect, forwardRef } from '@wordpress/element';
import { useAsyncList } from '@wordpress/compose';
import { getBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import BlockTypesList from '../block-types-list';
import InserterPanel from './panel';
import useBlockTypesState from './hooks/use-block-types-state';
import InserterListbox from '../inserter-listbox';
import { orderBy } from '../../utils/sorting';
import InserterNoResults from './no-results';

const getBlockNamespace = ( item ) => item.name.split( '/' )[ 0 ];

const MAX_SUGGESTED_ITEMS = 6;

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation and rerendering the component.
 *
 * @type {Array}
 */
const EMPTY_ARRAY = [];

export function BlockTypesTabPanel( {
	selectedBlockItems = EMPTY_ARRAY,
	selectedBlockCategories = EMPTY_ARRAY,
	items,
	collections,
	categories,
	onSelectItem,
	onHover,
	showMostUsedBlocks,
	className,
} ) {
	const suggestedItems = useMemo( () => {
		return orderBy( items, 'frecency', 'desc' ).slice(
			0,
			MAX_SUGGESTED_ITEMS
		);
	}, [ items ] );

	const uncategorizedItems = useMemo( () => {
		return items.filter( ( item ) => ! item.category );
	}, [ items ] );

	const itemsPerCollection = useMemo( () => {
		// Create a new Object to avoid mutating collection.
		const result = { ...collections };
		Object.keys( collections ).forEach( ( namespace ) => {
			result[ namespace ] = items.filter(
				( item ) => getBlockNamespace( item ) === namespace
			);
			if ( result[ namespace ].length === 0 ) {
				delete result[ namespace ];
			}
		} );

		return result;
	}, [ items, collections ] );

	// Hide block preview on unmount.
	useEffect( () => () => onHover( null ), [] );

	/**
	 * The inserter contains a big number of blocks and opening it is a costful operation.
	 * The rendering is the most costful part of it, in order to improve the responsiveness
	 * of the "opening" action, these lazy lists allow us to render the inserter category per category,
	 * once all the categories are rendered, we start rendering the collections and the uncategorized block types.
	 */
	const currentlyRenderedSelectedBlockCategories = useAsyncList(
		selectedBlockCategories
	);
	const currentlyRenderedCategories = useAsyncList( categories );
	const didRenderAllCategories =
		categories.length === currentlyRenderedCategories.length;

	// Async List requires an array.
	const collectionEntries = useMemo( () => {
		return Object.entries( collections );
	}, [ collections ] );
	const currentlyRenderedCollections = useAsyncList(
		didRenderAllCategories ? collectionEntries : EMPTY_ARRAY
	);

	return (
		<div className={ className }>
			{ currentlyRenderedSelectedBlockCategories.map( ( category ) => {
				const selectedCategoryItems = selectedBlockItems.filter(
					( item ) => item.category === category.slug
				);
				if (
					! selectedCategoryItems ||
					! selectedCategoryItems.length
				) {
					return null;
				}
				return (
					<InserterPanel
						key={ category.slug }
						title={ category.title }
						icon={ category.icon }
					>
						<BlockTypesList
							items={ selectedCategoryItems }
							onSelect={ onSelectItem }
							onHover={ onHover }
							label={ category.title }
						/>
					</InserterPanel>
				);
			} ) }
			{ selectedBlockItems.length > 0 && (
				<div className="block-editor-inserter__category-panel-divider" />
			) }
			{ showMostUsedBlocks &&
				// Only show the most used blocks if the total amount of block
				// is larger than 1 row, otherwise it is not so useful.
				items.length > 3 &&
				!! suggestedItems.length && (
					<InserterPanel title={ _x( 'Most used', 'blocks' ) }>
						<BlockTypesList
							items={ suggestedItems }
							onSelect={ onSelectItem }
							onHover={ onHover }
							label={ _x( 'Most used', 'blocks' ) }
						/>
					</InserterPanel>
				) }
			{ currentlyRenderedCategories.map( ( category ) => {
				const categoryItems = items.filter(
					( item ) => item.category === category.slug
				);
				if ( ! categoryItems || ! categoryItems.length ) {
					return null;
				}
				return (
					<InserterPanel
						key={ category.slug }
						title={ category.title }
						icon={ category.icon }
					>
						<BlockTypesList
							items={ categoryItems }
							onSelect={ onSelectItem }
							onHover={ onHover }
							label={ category.title }
						/>
					</InserterPanel>
				);
			} ) }

			{ didRenderAllCategories && uncategorizedItems.length > 0 && (
				<InserterPanel
					className="block-editor-inserter__uncategorized-blocks-panel"
					title={ __( 'Uncategorized' ) }
				>
					<BlockTypesList
						items={ uncategorizedItems }
						onSelect={ onSelectItem }
						onHover={ onHover }
						label={ __( 'Uncategorized' ) }
					/>
				</InserterPanel>
			) }

			{ currentlyRenderedCollections.map(
				( [ namespace, collection ] ) => {
					const collectionItems = itemsPerCollection[ namespace ];
					if ( ! collectionItems || ! collectionItems.length ) {
						return null;
					}

					return (
						<InserterPanel
							key={ namespace }
							title={ collection.title }
							icon={ collection.icon }
						>
							<BlockTypesList
								items={ collectionItems }
								onSelect={ onSelectItem }
								onHover={ onHover }
								label={ collection.title }
							/>
						</InserterPanel>
					);
				}
			) }
		</div>
	);
}

export function BlockTypesTab(
	{ rootClientId, onInsert, onHover, showMostUsedBlocks },
	ref
) {
	const [ items, categories, collections, onSelectItem ] = useBlockTypesState(
		rootClientId,
		onInsert
	);

	const { getBlockName } = useSelect( blockEditorStore );

	if ( ! items.length ) {
		return <InserterNoResults />;
	}

	const selectedBlockItems = [];
	const selectedBlockCategories = [];
	const nonSelectedBlockItems = [];

	if ( rootClientId ) {
		for ( const item of items ) {
			// Skip reusable blocks, they moved to the patterns tab.
			if ( item.category === 'reusable' ) {
				continue;
			}

			if ( rootClientId && item.rootClientId === rootClientId ) {
				selectedBlockItems.push( { ...item } );
			} else {
				nonSelectedBlockItems.push( { ...item } );
			}
		}

		for ( const category of categories ) {
			const hasItem = selectedBlockItems.some(
				( item ) => item.category === category.slug
			);
			if ( hasItem ) {
				selectedBlockCategories.push( { ...category } );
			}
		}

		// If we only have one category, replace the category title with the selected block title.
		// This avoids showing the "Text" category followed by another "Text" category. See the List Block for an example.
		if ( selectedBlockCategories.length === 1 ) {
			selectedBlockCategories[ 0 ].title = getBlockType(
				getBlockName( rootClientId )
			).title;
		}
	}

	// We want to filter by the selected items unless over 80% of the items are allowed within this block. This avoids situations
	// where a block has almost every block as a "filtered item" with one or two available at the end, such as the group block
	// where every block except "Page Break" is allowed.
	const outputFilteredItems =
		rootClientId &&
		selectedBlockItems.length / items.length < 0.8 &&
		items.length > 30;

	return (
		<InserterListbox>
			<div ref={ ref }>
				<BlockTypesTabPanel
					selectedBlockItems={
						outputFilteredItems ? selectedBlockItems : EMPTY_ARRAY
					}
					selectedBlockCategories={
						outputFilteredItems
							? selectedBlockCategories
							: EMPTY_ARRAY
					}
					items={
						outputFilteredItems ? nonSelectedBlockItems : items
					}
					categories={ categories }
					collections={ collections }
					onSelectItem={ onSelectItem }
					onHover={ onHover }
					showMostUsedBlocks={ showMostUsedBlocks }
					className="block-editor-inserter"
				/>
			</div>
		</InserterListbox>
	);
}

export default forwardRef( BlockTypesTab );
