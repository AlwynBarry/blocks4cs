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
					title={__('Event List Source')}
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label="ChurchSuite Church Name"
							onChange={ ( new_church_name ) => setAttributes( { church_name : new_church_name } ) }
							value={ attributes.church_name }
						/>
					</PanelRow>	
					<PanelRow>
						<NumberControl
							label="Days Ahead"
							min={ 0 }
							max={ 365 }
							onChange={ ( new_days_ahead ) => setAttributes( { days_ahead : isNaN( parseInt( new_days_ahead ) ) ? 0 : parseInt( new_days_ahead ) } ) }
							value={ attributes.days_ahead }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label="Number of Results"
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_num_results ) => setAttributes( { num_results : isNaN( parseInt( new_num_results ) ) ? 0 : parseInt( new_num_results ) } ) }
							value={ attributes.num_results }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Featured Events Only"
							help={ attributes.featured ? "Only featured events" : "All events" }
							checked={ attributes.featured }
							onChange={ ( new_featured ) => setAttributes( { featured : new_featured } ) }
							value={ attributes.featured }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<ServerSideRender
					block="b4cs/cs-event-list"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
