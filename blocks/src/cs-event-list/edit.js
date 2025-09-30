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
					title={__('Event List Configuration')}
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label="ChurchSuite Church Name"
							onChange={ ( new_church_name ) => setAttributes( { church_name : new_church_name } ) }
							value={ attributes.church_name }
							help="The church name from the start of the ChurchSuite URL"
						/>
					</PanelRow>	
					<PanelRow>
						<NumberControl
							label="Days Ahead"
							min={ 0 }
							max={ 365 }
							onChange={ ( new_days_ahead ) => setAttributes( { days_ahead : isNaN( parseInt( new_days_ahead ) ) ? 0 : ( parseInt( new_days_ahead ) > 0 ? parseInt( new_days_ahead ) : 0 ) } ) }
							value={ attributes.days_ahead }
							help={ ( attributes.days_ahead > 0 ) ? "Look " + attributes.days_ahead + " days ahead for events"
																 : ( attributes.days_ahead == 0 ) ? "Look for events happening today" : "Look for any events" }
						/>
					</PanelRow>
					<PanelRow>
						<NumberControl
							label="Number of Results"
							min={ 0 }
							max={ 1000 }
							onChange={ ( new_num_results ) => setAttributes( { num_results : isNaN( parseInt( new_num_results ) ) ? 0 : ( parseInt( new_num_results ) > 0 ? parseInt( new_num_results ) : 0 ) } ) }
							value={ attributes.num_results }
							help={ ( attributes.num_results ) ? "Return the first " + attributes.num_results + " events" : "All events" }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Featured Events Only"
							checked={ attributes.featured }
							onChange={ ( new_featured ) => setAttributes( { featured : new_featured } ) }
							value={ attributes.featured }
							help={ attributes.featured ? "Only featured events" : "All events" }
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody
					title={__('Event List Advanced Controls')}
					initialOpen={false}
				>
					<PanelRow>
						<TextControl
							label="Calendar Categories"
							onChange={ ( new_categories ) => setAttributes( { categories : new_categories } ) }
							value={ attributes.categories }
							help={ "Comma separated category numbers" + ( attributes.categories ? " - only category(s) " + attributes.categories : " - all categories" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label="Event name filter"
							onChange={ ( new_query ) => setAttributes( { q : new_query } ) }
							value={ attributes.q }
							help={ ( attributes.q == "" ) ? "All events" : "Return only events with '" + attributes.q + "' in the event name" }
						/>
					</PanelRow>	
					<PanelRow>
						<TextControl
							label="Event Ids"
							onChange={ ( new_event_ids ) => setAttributes( { event_ids : new_event_ids } ) }
							value={ attributes.event_ids }
							help={ "Comma separated Event Ids" + ( attributes.event_ids !== "" ? " - Show events with Id(s): " + attributes.event_ids : " - all events" ) }
						/>
					</PanelRow>	
					<PanelRow>
						<SelectControl
							label="Merge"
							options={ [
										{ label: "None", value: "" },
										{ label: "Sequence", value: "sequence" },
										{ label: "Sequence Name", value: "sequence_name" },
										{ label: "Signup to Sequence", value: "signup_to_sequence" },
										{ label: "Show all", value: "show_all" },
									] }
							onChange={ ( new_merge ) => setAttributes( { merge : new_merge } ) }
							value={ attributes.merge }
							help="Whether to merge events in a sequence or show all events"
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
					block="b4cs/cs-event-list"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
