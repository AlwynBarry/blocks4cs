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
	SelectControl,
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
					title={ __( "Event Cards Configuration", "blocks4cs" ) }
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
					<PanelRow>
						<NumberControl
							label={ __( "Days Ahead", "blocks4cs" ) }
							min={ 0 }
							max={ 365 }
							onChange={ ( new_days_ahead ) => setAttributes( { days_ahead : isNaN( parseInt( new_days_ahead ) ) ? 0 : ( parseInt( new_days_ahead ) > 0 ? parseInt( new_days_ahead ) : 0 ) } ) }
							value={ attributes.days_ahead }
							help={ ( attributes.days_ahead > 0 ) ? __( "Look", "blocks4cs" ) + " " + attributes.days_ahead + " " + __( "days ahead for events", "blocks4cs" )
																 : ( attributes.days_ahead == 0 ) ? __( "Look for events happening today", "blocks4cs" ) : __( "Look for any events", "blocks4cs" ) }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label={ __( "Number of Results", "blocks4cs" ) }
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_num_results ) => setAttributes( { num_results : isNaN( parseInt( new_num_results ) ) ? 0 : ( parseInt( new_num_results ) > 0 ? parseInt( new_num_results ) : 0 ) } ) }
							value={ attributes.num_results }
							help={ ( attributes.num_results ) ? __( "Return the first", "blocks4cs" ) + " " + attributes.num_results + " " + __( "events", "blocks4cs" ) : __( "All events", "blocks4cs" ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( "Featured Events Only", "blocks4cs" ) }
							checked={ attributes.featured }
							onChange={ ( new_featured ) => setAttributes( { featured : new_featured } ) }
							value={ attributes.featured }
							help={ attributes.featured ? __( "Only featured events", "blocks4cs" ) : __( "All events", "blocks4cs" ) }
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={ __("Event Cards Advanced Controls", "blocks4cs" ) }
					initialOpen={false}
				>
					<PanelRow>
						<TextControl
							label={ __( "Calendar Categories", "blocks4cs" ) }
							onChange={ ( new_categories ) => setAttributes( { categories : new_categories } ) }
							value={ attributes.categories }
							help={ __( "Comma separated category numbers", "blocks4cs" ) + ( attributes.categories ? " - " + __( "only category(s)", "blocks4cs" ) + ": " + attributes.categories : " - " + __( "all categories", "blocks4cs" ) ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label={ __( "Event name filter", "blocks4cs" ) }
							onChange={ ( new_query ) => setAttributes( { q : new_query } ) }
							value={ attributes.q }
							help={ ( attributes.q == "" ) ? __( "All events", "blocks4cs" ) : __( "Return only events with", "blocks4cs" ) +  " '" + attributes.q + "' " + __( "in the event name", "blocks4cs" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label={ __( "Event Ids", "blocks4cs" ) }
							onChange={ ( new_event_ids ) => setAttributes( { event_ids : new_event_ids } ) }
							value={ attributes.event_ids }
							help={ __( "Comma separated Event Ids", "blocks4cs" ) + ( attributes.event_ids !== "" ? " - " +  __( "Show events with Id(s)", "blocks4cs" ) + ": " + attributes.event_ids : " - " + __( "all events", "blocks4cs" ) ) }
						/>
					</PanelRow>	
					<PanelRow>
						<SelectControl
							label={ __( "Merge", "blocks4cs" ) }
							options={ [
										{ label:  __( "None", "blocks4cs" ), value: "" },
										{ label:  __( "Sequence", "blocks4cs" ), value: "sequence" },
										{ label:  __( "Sequence Name", "blocks4cs" ), value: "sequence_name" },
										{ label:  __( "Signup to Sequence", "blocks4cs" ), value: "signup_to_sequence" },
										{ label:  __( "Show all", "blocks4cs" ), value: "show_all" },
									] }
							onChange={ ( new_merge ) => setAttributes( { merge : new_merge } ) }
							value={ attributes.merge }
							help={ __( "Whether to merge events in a sequence or show all events", "blocks4cs" ) }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label={ __( "Sequence", "blocks4cs" ) }
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_sequence ) => setAttributes( { sequence : isNaN( parseInt( new_sequence ) ) ? 0 : ( parseInt( new_sequence ) >= 0 ? parseInt( new_sequence ) : 0 ) } ) }
							value={ attributes.sequence }
							help={ __( "Filter by sequence Id", "blocks4cs" ) + ": " + ( attributes.sequence ? __( "Events from Sequence ID", "blocks4cs" ) + ": " + attributes.sequence : __( "All events", "blocks4cs" ) ) }
						/>
					</PanelRow>
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
					block="b4cs/cs-event-cards"
					attributes={ attributes }
				/>
			</div>

		</>
	);
}
