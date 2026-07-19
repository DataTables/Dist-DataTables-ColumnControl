/// <reference types="jquery" />
import DataTables, { Api as Api$1 } from 'datatables.net';
export { default } from 'datatables.net';

declare const icons: {
    chevronRight: string;
    columns: string;
    contains: string;
    empty: string;
    ends: string;
    equal: string;
    greater: string;
    greaterOrEqual: string;
    groupAdd: string;
    groupClear: string;
    groupTop: string;
    groupRemove: string;
    info: string;
    less: string;
    lessOrEqual: string;
    menu: string;
    move: string;
    moveLeft: string;
    moveRight: string;
    notContains: string;
    notEmpty: string;
    notEqual: string;
    orderAddAsc: string;
    orderAddDesc: string;
    orderAsc: string;
    orderClear: string;
    orderDesc: string;
    orderRemove: string;
    orderNone: string;
    search: string;
    searchActive: string;
    searchClear: string;
    starts: string;
    tick: string;
    x: string;
};

type Icons = keyof typeof icons;
declare class Button {
    static classes: {
        container: string;
    };
    private _dom;
    private _s;
    /**
     * Get the active state of the button
     */
    active(): boolean;
    /**
     * Set the active state of the button
     *
     * @param active The active state
     * @returns Button instance
     */
    active(active: boolean): this;
    /**
     * A button can be marked as active by any of its sub-buttons (i.e. if it is a dropdown)
     * and each one needs to be able to enable this button without effecting the active state
     * trigged by any other sub-buttons. This method provides a way to do that.
     *
     * @param unique Unique id for the activate state
     * @param active If it is active
     * @returns Button instance
     */
    activeList(unique: string, active: boolean): this;
    /**
     * Scan over the dropdown element looking for any visible content. If there isn't any then
     * we hide this button.
     *
     * @returns Button instance
     */
    checkDisplay(): this;
    /**
     * Set the class name for the button
     *
     * @param className Class name
     * @returns Button instance
     */
    className(className: string): this;
    /**
     * Destroy the button, cleaning up event listeners
     */
    destroy(): void;
    /**
     * Relevant for drop downs only. When a button in a dropdown is hidden, we might want to
     * hide the host button as well (if it has nothing else to show). For that we need to know
     * what the dropdown element is.
     *
     * @param el Element that can be used for telling us about drop down elements.
     * @returns Button instance
     */
    dropdownDisplay(el: HTMLDivElement): this;
    /**
     * Get the DOM Button element to attach into the document
     *
     * @returns The Button element
     */
    element(): HTMLButtonElement;
    /**
     * Get the current enabled state for the button
     */
    enable(): boolean;
    /**
     * Set if the button should be enabled or not.
     *
     * @param enable Toggle the enable state
     * @returns Button instance
     */
    enable(enable: boolean): this;
    /**
     * Set the extra information icon
     *
     * @param icon Icon name
     * @returns Button instance
     */
    extra(icon: Icons | ''): this;
    /**
     * Set the event handler for when the button is activated
     *
     * @param fn Event handler
     * @returns Button instance
     */
    handler(fn: (e: Event) => void): this;
    /**
     * Set the icon to display in the button
     *
     * @param icon Icon name
     * @param iconActive Icon to use when in active state
     * @returns Button instance
     */
    icon(icon: string, iconActive?: string): this;
    /**
     * Get the text for the button
     */
    text(): string;
    /**
     * Set the text to appear in the button
     *
     * @param text Text to appear in the button
     * @returns Button instance
     */
    text(text: string): this;
    /**
     * Get the value for this button (if one is set)
     */
    value(): string | number;
    /**
     * Set the value for the button
     *
     * @param val Value to set
     */
    value(val: string | number): Button;
    /**
     * Create a new button for use in ColumnControl contents. Buttons created by this class can be
     * used at the top level in the header or in a dropdown.
     */
    constructor(dt: Api$1, host: ColumnControl);
    /**
     * Check if anything is making this button active
     *
     * @returns Self for chaining
     */
    private _checkActive;
}

interface IOptions {
    search: boolean;
    select: boolean;
}
type IHandler = (e: Event, btn: Button, btns: Button[], redraw: boolean) => void;
interface IOption {
    active?: boolean;
    icon?: string;
    label: string;
    value: string | number;
}
declare class CheckList {
    static classes: {
        container: string;
        input: string;
    };
    private _dom;
    private _s;
    /**
     * Add one or more buttons to the list
     *
     * @param options Configuration for the button(s) to add
     * @returns Self for chaining
     */
    add(options: IOption | IOption[], update?: boolean): this;
    /**
     * Find a button with a given value
     *
     * @param val Value to search for
     * @returns Found button
     */
    button(val: string | number): Button;
    /**
     * Remove all buttons from the list
     *
     * @returns Self for chaining
     */
    clear(): this;
    /**
     * Get the DOM container element to attach into the document
     *
     * @returns Container
     */
    element(): HTMLDivElement;
    /**
     * Set the event handler for what happens when a button is clicked
     *
     * @param fn Event handler
     */
    handler(fn: IHandler): this;
    /**
     * Indicate that this is a search control and should listen for corresponding events
     *
     * @param dt DataTable instance
     * @param idx Column index
     */
    searchListener(dt: Api$1): this;
    /**
     * Select all buttons
     *
     * @returns Self for chaining
     */
    selectAll(): this;
    /**
     * Deselect all buttons
     *
     * @returns Self for chaining
     */
    selectNone(): this;
    /**
     * Set the list's title
     *
     * @param title Display title
     * @returns Button instance
     */
    title(title: string): this;
    /**
     * Get the values that are currently selected in the list
     *
     * @returns Array of currently selected options in the list
     */
    values(): Array<string | number>;
    /**
     * Set the activate state of the buttons
     *
     * @param values Array of values to set as active
     */
    values(values: Array<string | number>): this;
    /**
     * Container for a list of buttons
     */
    constructor(dt: Api$1, host: ColumnControl, opts: IOptions);
    /**
     * Update the deselect counter
     */
    private _updateCount;
    /**
     * Add the buttons to the page - taking into account filtering
     */
    private _redraw;
}

interface IContentConfig$1 {
    /** @ignore */
    _parents?: Button[];
}
interface IContentPlugin<T = {}, K = {}> {
    classes?: K;
    defaults: T;
    init?: (this: ColumnControl, buttonConfig: T) => HTMLElement | HTMLButtonElement;
    extend?: (this: ColumnControl, buttonConfig: T) => IContentConfig$1;
}

interface ITitleConfig extends IContentConfig$1 {
    /** Element class name */
    className: string;
    /** Element text (shown in dropdown). If null the column's class name is used. */
    text: string | null;
}
interface ITitle extends Partial<ITitleConfig> {
    extend: 'title';
}

interface ISpacerConfig extends IContentConfig$1 {
    /** Element class name */
    className: string;
    /** Element text (shown in dropdown) */
    text: string;
}
interface ISpacer extends Partial<ISpacerConfig> {
    extend: 'spacer';
}

interface ISearchTextConfig extends IContentConfig$1 {
    /** Allow the input clear icon to show, or not */
    clear: boolean;
    /** List of search operator which will not be used */
    excludeLogic: Array<string>;
    /** Placeholder text to apply to the `input` */
    placeholder: string;
    /** Title text to show above the search input. `[title]` will be replaced by the column title */
    title: string;
    /**
     * Text to apply to a `title` attribute for the search input. `[title]` will be replaced by
     * the column title
     */
    titleAttr: string;
}
interface ISearchText extends Partial<ISearchTextConfig> {
    extend: 'searchText';
}

interface ISearchNumberConfig extends IContentConfig$1 {
    /** Allow the input clear icon to show, or not */
    clear: boolean;
    /** List of search operator which will not be used */
    excludeLogic: Array<string>;
    /** Placeholder text to apply to the `input` */
    placeholder: string;
    /** Title text to show above the search input. `[title]` will be replaced by the column title */
    title: string;
    /**
     * Text to apply to a `title` attribute for the search input. `[title]` will be replaced by
     * the column title
     */
    titleAttr: string;
}
interface ISearchNumber extends Partial<ISearchNumberConfig> {
    extend: 'searchNumber';
}

interface ISearchListConfig extends IContentConfig$1 {
    /** Only use SearchList on columns where the options are defined by the Ajax data */
    ajaxOnly: boolean;
    /** Container class name */
    className: string;
    /** Define if a search list can be hidden if there is no data that comes back from the server
     * for it. Applies to Ajax options only (`ajaxOnly: true`).
     */
    hidable: boolean;
    /** List of options. If not given here, will be derived from Ajax data, or the table's data */
    options: Array<{
        label: string;
        value: any;
    }> | null;
    /** The data type to request for the data shown in the list */
    orthogonal: string;
    /** Show the list search input, or not */
    search: boolean;
    /** Show the select all / none buttons, or not */
    select: boolean;
    /** Text shown above the search list. `[title]` will be replaced by the column title. */
    title: string;
}
interface ISearchList extends Partial<ISearchListConfig> {
    extend: 'searchList';
}

interface ISearchDateTimeConfig extends IContentConfig$1 {
    /** Allow the input clear icon to show, or not */
    clear: boolean;
    /** List of search operator which will not be used */
    excludeLogic: Array<string>;
    /** Date / time format to use for the input. Will be auto detected if not given. */
    format: string;
    /**
     * Date filtering mask. Format is "YYYY-MM-DD[T ]hh:mm:ss.sss". Remove a component to remove
     * it from the comparison (that unit will be set to 0)
     */
    mask: string;
    /** Placeholder text to apply to the `input` */
    placeholder: string;
    /** Title text to show above the search input. `[title]` will be replaced by the column title */
    title: string;
    /**
     * Text to apply to a `title` attribute for the search input. `[title]` will be replaced by
     * the column title
     */
    titleAttr: string;
}
interface ISearchDateTime extends Partial<ISearchDateTimeConfig> {
    extend: 'searchDateTime';
}

interface ISearchDropdownConfig extends ISearchListConfig {
    /** Button config */
    text: string;
}
interface ISearchDropdown extends Partial<ISearchDropdownConfig> {
    extend: 'searchDropdown';
}

interface ISearchClearConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface ISearchClear extends Partial<ISearchClearConfig> {
    extend: 'searchClear';
}

interface ISearchConfig extends ISearchDateTimeConfig, ISearchNumberConfig, ISearchTextConfig, ISearchListConfig {
    /** Indicate if SearchList should be allowed or not (it is only used for Ajax loaded data) */
    allowSearchList: boolean;
}
interface ISearch$1 extends Partial<ISearchConfig> {
    extend: 'search';
}

interface IOrderRemoveConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderRemove extends Partial<IOrderRemoveConfig> {
    extend: 'orderRemove';
}

interface IOrderDescConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderDesc extends Partial<IOrderDescConfig> {
    extend: 'orderDesc';
}

interface IOrderClearConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderClear extends Partial<IOrderClearConfig> {
    extend: 'orderClear';
}

interface IOrderAscConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderAsc extends Partial<IOrderAscConfig> {
    extend: 'orderAsc';
}

interface IOrderAddDescConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderAddDesc extends Partial<IOrderAddDescConfig> {
    extend: 'orderAddDesc';
}

interface IOrderAddAscConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IOrderAddAsc extends Partial<IOrderAddAscConfig> {
    extend: 'orderAddAsc';
}

interface IOrderConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Icon to use for when there is ascending ordering applied to the column */
    iconAsc: string;
    /** Icon to use for when there is descending ordering applied to the column */
    iconDesc: string;
    /** Icon to use for when there is no ordering applied to the column */
    iconNone: string;
    /** Don't add the click listener if enabled */
    statusOnly: boolean;
    /** Button text (shown in dropdowns) */
    text: string;
}
interface IOrder extends Partial<IOrderConfig> {
    extend: 'order';
}

interface IReorderRightConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IReorderRight extends Partial<IReorderRightConfig> {
    extend: 'reorderRight';
}

interface IReorderLeftConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IReorderLeft extends Partial<IReorderLeftConfig> {
    extend: 'reorderLeft';
}

interface IReorderConfig extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}
interface IReorder extends Partial<IReorderConfig> {
    extend: 'reorder';
}

interface IInfoConfig extends IContentConfig$1 {
    /** The action on the button that will trigger the popup */
    activation: 'click' | 'hover';
    /** Button class name */
    className: string;
    /**
     * Text content. Start with `attr:` to read the content from the header
     * cell's attribute of the same name
     */
    content: string;
    /** Class name for the popover */
    contentClass: string;
    /** Pixel gap between the button and the popover */
    gap: number;
    /** The icon to use for the button */
    icon: string;
    /** Button text */
    text: string;
}
interface IInfo extends Partial<IInfoConfig> {
    extend: 'order';
}

interface IDropdownConfig extends IContentConfig$1 {
    /**
     * The first matching element with this selector will be focused on, when
     * the dropdown is shown. Empty string to disable
     */
    autoFocus: string;
    /** Button class name */
    className: string;
    /** Content to show in the dropdown */
    content: IContentConfig$1[];
    /** Class name to assign to the floating dropdown element */
    dropdownClass: string;
    /** Icon name */
    icon: string;
    /** Icon name for icon to display while active */
    iconActive: string;
    /** Button text (shown in an existing dropdown, not at the top level) */
    text: string;
}
interface IDropdown extends Partial<IDropdownConfig> {
    extend: 'dropdown';
}
interface IClasses {
    container: string | string[];
    liner: string | string[];
}

interface IColVisConfig extends IContentConfig$1 {
    /** Container class name */
    className: string;
    /** Column selector for what columns to have in the list */
    columns: string | number | Array<string | number>;
    /** Show the list search input, or not */
    search: boolean;
    /** Show the select all / none buttons, or not */
    select: boolean;
    /** Text shown above the column list */
    title: string;
}
interface IColVis extends Partial<IColVisConfig> {
    extend: 'colVis';
}

interface IColVisDropdownConfig extends IColVisConfig {
    /** Button config */
    text: string;
}
interface IColVisDropdown extends Partial<IColVisDropdownConfig> {
    extend: 'colVisDropdown';
}

interface IOrderStatus extends Partial<IOrderConfig> {
    extend: 'orderStatus';
}

interface IRowGroup extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Trigger ordering on the grouped data */
    order: boolean;
    /** Button text (shown in dropdown) */
    text: string;
}

interface IRowGroupAdd extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Trigger ordering on the grouped data */
    order: boolean;
    /** Button text (shown in dropdown) */
    text: string;
}

interface IRowGroupClear extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}

interface IRowGroupRemove extends IContentConfig$1 {
    /** Button class name */
    className: string;
    /** Button icon */
    icon: string;
    /** Button text (shown in dropdown) */
    text: string;
}

type IContentConfig = IColVis | IColVisDropdown | IDropdown | IInfo | IReorder | IReorderLeft | IReorderRight | IOrder | IOrderAddAsc | IOrderAddDesc | IOrderAsc | IOrderClear | IOrderDesc | IOrderRemove | IOrderStatus | IRowGroup | IRowGroupAdd | IRowGroupClear | IRowGroupRemove | ISearch$1 | ISearchClear | ISearchDropdown | ISearchDateTime | ISearchList | ISearchNumber | ISearchText | ISpacer | ITitle;
declare const contentTypes: {
    colVis: IContentPlugin<IColVisConfig, {}>;
    colVisDropdown: IContentPlugin<IColVisDropdownConfig, {}>;
    dropdown: IContentPlugin<IDropdownConfig, IClasses>;
    info: IContentPlugin<IInfoConfig, {}>;
    reorder: IContentPlugin<IReorderConfig, {}>;
    reorderLeft: IContentPlugin<IReorderLeftConfig, {}>;
    reorderRight: IContentPlugin<IReorderRightConfig, {}>;
    rowGroup: IContentPlugin<IRowGroup, {}>;
    rowGroupAdd: IContentPlugin<IRowGroupAdd, {}>;
    rowGroupClear: IContentPlugin<IRowGroupClear, {}>;
    rowGroupRemove: IContentPlugin<IRowGroupRemove, {}>;
    order: IContentPlugin<IOrderConfig, {}>;
    orderAddAsc: IContentPlugin<IOrderAddAscConfig, {}>;
    orderAddDesc: IContentPlugin<IOrderAddDescConfig, {}>;
    orderAsc: IContentPlugin<IOrderAscConfig, {}>;
    orderClear: IContentPlugin<IOrderClearConfig, {}>;
    orderDesc: IContentPlugin<IOrderDescConfig, {}>;
    orderRemove: IContentPlugin<IOrderRemoveConfig, {}>;
    orderStatus: IContentPlugin<IOrderConfig, {}>;
    search: IContentPlugin<ISearchConfig, {}>;
    searchClear: IContentPlugin<ISearchClearConfig, {}>;
    searchDropdown: IContentPlugin<ISearchDropdownConfig, {}>;
    searchDateTime: IContentPlugin<ISearchDateTimeConfig, {}>;
    searchList: IContentPlugin<ISearchListConfig, {}>;
    searchNumber: IContentPlugin<ISearchNumberConfig, {}>;
    searchText: IContentPlugin<ISearchTextConfig, {}>;
    spacer: IContentPlugin<ISpacerConfig, {}>;
    title: IContentPlugin<ITitleConfig, {}>;
};

interface ISSPData {
    [key: string]: string;
}
type ISearch = (type: string, term: string, loadingState: boolean) => void;
declare class SearchInput {
    static classes: {
        container: string[];
        input: string;
        select: string;
    };
    private _dom;
    private _search;
    private _dt;
    private _idx;
    private _lastValue;
    private _lastType;
    private _loadingState;
    private _type;
    private _sspTransform;
    private _sspData;
    private _colUnique;
    /**
     * Add a class to the container
     *
     * @param name Class name to add
     * @returns Self for chaining
     */
    addClass(name: string): this;
    /**
     * Clear any applied search
     *
     * @returns Self for chaining
     */
    clear(): this;
    /**
     * Set the clear icon feature can be used or not
     *
     * @param set Flag
     * @returns Self for chaining
     */
    clearable(set: boolean): this;
    /**
     * Get the container element
     *
     * @returns The container element
     */
    element(): HTMLDivElement;
    /**
     * Get the HTML input element for this control
     *
     * @returns HTML Input element
     */
    input(): HTMLInputElement;
    /**
     * Set the list of options for the dropdown
     *
     * @param opts List of options
     * @returns Self for chaining
     */
    options(opts: Array<{
        label: string;
        value: string;
    }>): this;
    /**
     * Set the placeholder attribute for the input element
     *
     * @param placeholder Placeholder string
     * @returns Self for chaining
     */
    placeholder(placeholder: string): this;
    /**
     * Run the search method
     *
     * @param force Force the search to happen, regardless of the last values
     */
    runSearch(force?: boolean): void;
    /**
     * Set the function that will be run when a search operation is required. Note that this can
     * trigger the function to run if there is a saved state.
     *
     * @param fn Search callback
     * @returns Self for chaining
     */
    search(fn: ISearch): this;
    /**
     * Set a value for the search input
     *
     * @param logic Logic type
     * @param val Value
     * @returns Self for chaining
     */
    set(logic: string, val: string): this;
    /**
     * Set a function to transform the input value before SSP data submission
     *
     * @param fn Transform function
     * @returns Self for chaining
     */
    sspTransform(fn: (val: string) => string): this;
    /**
     * Set extra information to be send to the server for server-side processing
     *
     * @param data Data object
     * @returns Self for chaining
     */
    sspData(data: ISSPData): this;
    /**
     * Set the text that will be shown as the title for the control
     *
     * @param text Set the title text
     * @returns Self for chaining
     */
    title(text: string): this;
    /**
     * Set the title attribute for the input element
     *
     * @param title Title attribute string
     * @returns Self for chaining
     */
    titleAttr(title: string): this;
    type(t: string): this;
    /**
     * Create a container element, for consistent DOM structure and styling
     */
    constructor(dt: Api$1, idx: number, columnUnique: number);
    /**
     * Load a DataTables state
     *
     * @param state State object being loaded
     */
    private _stateLoad;
}

type TContentItem = IContentConfig | keyof typeof contentTypes | TContentItem[];
interface IDefaults {
    className: string | string[];
    target: number | string;
    content: null | TContentItem[];
}
interface IConfig extends Partial<IDefaults> {
}
interface IContents {
    [name: string]: IContentPlugin;
}
/**
 *
 */
declare class ColumnControl {
    private _dom;
    private _dt;
    private _c;
    private _s;
    /**
     * Add a component to the destroy list. This is so there is a single destroy event handler,
     * which is much better for performance.
     *
     * @param component Any instance with a `destroy` method
     */
    destroyAdd(component: any): void;
    /**
     * Remove an instance from the destroy list (it has been destroyed itself)
     *
     * @param component Any instance with a `destroy` method
     */
    destroyRemove(component: any): void;
    /**
     * Get the DataTables API instance that hosts this instance of ColumnControl
     *
     * @returns DataTables API instance
     */
    dt(): Api$1<any>;
    /**
     * Get what column index this instance of ColumnControl is operating on
     *
     * @returns Column index
     */
    idx(): number;
    /**
     * Get the column index that was originally used for initialisation of this
     * column. This is important when used with ColReorder and when arrays can
     * be reordered (i.e. state saving on initialisation).
     *
     * @returns Column index
     */
    idxOriginal(): any;
    /**
     * Covert the options from `content` in the DataTable initialisation for this instance into a
     * resolved plugin and options.
     *
     * @param content The dev's supplied configuration for the content
     * @returns Resolved plugin information
     */
    resolve(content: string | any): any;
    /**
     * Get the unique id for the instance
     *
     * @returns Instant unique id
     */
    unique(): number;
    /**
     * Create a new ColumnControl instance to control a DataTables column.
     *
     * @param dt DataTables API instance
     * @param columnIdx Column index to operation on
     * @param opts Configuration options
     */
    constructor(dt: Api$1, columnIdx: number, opts: IConfig);
    /**
     * Resolve the configured target into a DOM element
     */
    private _target;
    static Button: typeof Button;
    static CheckList: typeof CheckList;
    static SearchInput: typeof SearchInput;
    /** Content plugins */
    static content: IContents;
    /** Defaults for ColumnControl */
    static defaults: IDefaults;
    /** SVG icons that can be used by the content plugins */
    static icons: {
        chevronRight: string;
        columns: string;
        contains: string;
        empty: string;
        ends: string;
        equal: string;
        greater: string;
        greaterOrEqual: string;
        groupAdd: string;
        groupClear: string;
        groupTop: string;
        groupRemove: string;
        info: string;
        less: string;
        lessOrEqual: string;
        menu: string;
        move: string;
        moveLeft: string;
        moveRight: string;
        notContains: string;
        notEmpty: string;
        notEqual: string;
        orderAddAsc: string;
        orderAddDesc: string;
        orderAsc: string;
        orderClear: string;
        orderDesc: string;
        orderRemove: string;
        orderNone: string;
        search: string;
        searchActive: string;
        searchClear: string;
        starts: string;
        tick: string;
        x: string;
    };
    /** Version */
    static version: string;
}

// Type definitions for DataTables ColumnControl
//
// Project: https://datatables.net/extensions/columncontrol/, https://datatables.net
// Definitions by:
//   SpryMedia
//   Andy Ma <https://github.com/andy-maca>



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables' types integration
 */
declare module 'datatables.net' {
	interface Config {
		/**
		 * Common ColumnControl extension options to apply to all columns
		 */
		columnControl?: ConfigColumnControl | Array<TContentItem | ConfigColumnControl>;
	}

	interface ConfigColumns {
		/**
		 * Column specific column configuration options
		 *
		 * @returns Api for chaining with the additional ColumnControl methods
		 */
		columnControl?: ConfigColumnControl | Array<TContentItem | ConfigColumnControl>;
	}

	interface DataTablesStatic {
		/**
		 * ColumnControl class
		 */
		ColumnControl: {
			/**
			 * Create a new ColumnControl instance for a specific column
			 */
			new (
				dt: Api<any>,
				columnIdx: number,
				config: ConfigColumnControl
			): DataTablesStatic['ColumnControl'];

			/**
			 * ColumnControl version
			 */
			version: string;

			/**
			 * Default configuration values
			 */
			defaults: ConfigColumnControl;
		};
	}

	interface ConfigLanguage {
		/** Column Control language options */
		columnControl: {
			/** Column visibility title */
			colVis?: string;

			/** Column visibility button text */
			colVisDropdown?: string;

			/** Dropdown button text */
			dropdown?: string;

			/** Add to ordering (ascending) button text */
			orderAddAsc?: string;

			/** Add to ordering (descending) button text */
			orderAddDesc?: string;

			/** Set ordering (ascending) button text */
			orderAsc?: string;

			/** Clear all ordering button text */
			orderClear?: string;

			/** Set ordering (descending) button text */
			orderDesc?: string;

			/** Remove column from multi-ordering button text */
			orderRemove?: string;

			/** Column reorder button text */
			reorder?: string;

			/** Move column left button text */
			reorderLeft?: string;

			/** Move column right button text */
			reorderRight?: string;

			/** Clear search button text */
			searchClear?: string;

			/** Search dropdown button text */
			searchDropdown?: string;

			/** Search list dropdown button text */
			searchList?: string;

			/** Spacer text */
			spacer?: string;

			/** List strings, used for searchList and colVis */
			list?: {
				/** Select all link text */
				add?: string;

				/** Label for when there is no label */
				empty?: string;

				/** Select none link text */
				none?: string;

				/** Search placeholder */
				search?: string;
			};

			/** Strings used for the <select> available for choosing different search logic */
			search?: {
				/** searchText options */
				text?: {
					equal?: string;
					notEqual?: string;
					starts?: string;
					ends?: string;
					empty?: string;
					notEmpty?: string;
				};

				/** searchDateTime options */
				datetime?: {
					equal?: string;
					notEqual?: string;
					greater?: string;
					less?: string;
					empty?: string;
					notEmpty?: string;
				};

				/** searchNumber options */
				number?: {
					equal?: string;
					notEqual?: string;
					greater?: string;
					greaterOrEqual?: string;
					less?: string;
					lessOrEqual?: string;
					empty?: string;
					notEmpty?: string;
				};
			};
		};
	}

	interface ApiColumnMethods<T> {
		/** Methods for ColumnControl */
		columnControl: {
			/**
			 * Clear any ColumnControl search that is applied to the selected column (both
			 * `searchList` and the input search types will be cleared).
			 */
			searchClear(): ApiColumnMethods<T>;

			/**
			 * Reload the options for the `searchList` content type, or provide new options.
			 *
			 * @param options Options to load in, or use `'refresh'` to read from the table.
			 */
			searchList(
				options: 'refresh' | string[] | Array<{ label: string; value: any }>
			): ApiColumnMethods<T>;
		};
	}

	interface ApiColumnsMethods<T> {
		columnControl: {
			/**
			 * Clear any ColumnControl search that is applied to the selected columns (both
			 * `searchList` and the input search types will be cleared).
			 */
			searchClear(): ApiColumnMethods<T>;

			/**
			 * Reload the options for the `searchList` content type, or provide new options.
			 *
			 * @param options Options to load in, or use `'refresh'` to read from the table.
			 */
			searchList(
				options: 'refresh' | string[] | Array<{ label: string; value: any }>
			): ApiColumnMethods<T>;
		};
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Options
 */
type TTfootTarget = `tfoot:${number}`;
type TTheadTarget = `thead:${number}`;

interface ConfigColumnControl {
	/**
	/**
	 * Designate the target header or footer row for where to insert the ColumnControl's content
	 */
	target: number | 'tfoot' | TTfootTarget | TTheadTarget;

	/**
	 * Class(es) to assign to the target row.
	 */
	className?: string | string[];

	/**
	 * Content to show in the cells.
	 */
	content?: TContentItem[];
}
