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
					title={ __( "Small Groups ChurchSuite Source", "blocks4cs" ) }
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label={ __( "ChurchSuite Church Name", "blocks4cs" ) }
							onChange={ ( church_name ) => setAttributes( { church_name : church_name } ) }
							value={ attributes.church_name }
							help={ __( "The church name from the start of the ChurchSuite URL", "blocks4cs" ) }
						/>
					</PanelRow>	
				</PanelBody>

				<PanelBody
					title={ __( "Small Groups Advanced Controls", "blocks4cs" ) }
					initialOpen={false}
				>				
					<PanelRow>
						<TextControl
							label={ __( "Sites", "blocks4cs" ) }
							onChange={ ( new_sites ) => setAttributes( { sites : new_sites } ) }
							value={ attributes.sites }
							help={ __( "Comma separated site numbers", "blocks4cs" ) + " - " + ( attributes.sites ? __( "Only events from site(s)", "blocks4cs" ) + ": " + attributes.sites : __( "Events from all sites", "blocks4cs" ) ) }
						/>
					</PanelRow>	
				</PanelBody>
				
			</InspectorControls>

			<div { ...useBlockProps() }>
				<ServerSideRender
					block="b4cs/cs-smallgroups"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
