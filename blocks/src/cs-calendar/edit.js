/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';

import {
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';

import { __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Calendar Configuration')}
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label="ChurchSuite Church Name"
							onChange={ ( church_name ) => setAttributes( { church_name : church_name } ) }
							value={ attributes.church_name }
							help="The church name from the start of the ChurchSuite URL"
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label="Calendar Categories"
							onChange={ ( new_categories ) => setAttributes( { categories : new_categories } ) }
							value={ attributes.categories }
							help={ "Comma separated category numbers" + ( attributes.categories ? " - only category(s) " + attributes.categories : " - all categories" ) }
						/>
					</PanelRow>	
				</PanelBody>

				<PanelBody
					title={__('Calendar Advanced Controls')}
					initialOpen={false}
				>
					<PanelRow>
						<TextControl
							label="Event name filter"
							onChange={ ( new_query ) => setAttributes( { q : new_query } ) }
							value={ attributes.q }
							help={ ( attributes.q == "" ) ? "All events" : "Return only events with '" + attributes.q + "' in the event name" }
						/>
					</PanelRow>	
					<PanelRow>
						<NumberControl
							label="Sequence"
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_sequence ) => setAttributes( { sequence : isNaN( parseInt( new_sequence ) ) ? 0 : ( parseInt( new_sequence ) >= 0 ? parseInt( new_sequence ) : 0 ) } ) }
							value={ attributes.sequence }
							help={ "Filter by sequence Id: " + ( attributes.sequence ? "Events from Sequence ID: " + attributes.sequence : "All events" ) }
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="Sites"
							onChange={ ( new_sites ) => setAttributes( { sites : new_sites } ) }
							value={ attributes.sites }
							help={ "Comma separated site numbers" + ( attributes.sites ? " - only events from site(s) " + attributes.sites : " - events from all sites" ) }
						/>
					</PanelRow>	
				</PanelBody>

			</InspectorControls>
			<div { ...useBlockProps() }>
				<ServerSideRender
					block="b4cs/cs-calendar"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
