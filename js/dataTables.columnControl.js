

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		var jq = require('jquery');
		var cjsRequires = function (root, $) {
			if ( ! $.fn.dataTable ) {
				require('datatables.net')(root, $);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root, $) {
				if ( ! root ) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				if ( ! $ ) {
					$ = jq( root );
				}

				cjsRequires( root, $ );
				return factory( $, root, root.document );
			};
		}
		else {
			cjsRequires( window, jq );
			module.exports = factory( jq, window, window.document );
		}
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


import ColumnControl from './ColumnControl';
import { createElement } from './util';
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API integration
 */
DataTable.ColumnControl = ColumnControl;
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables listeners for initialisation
 */
// Create header / footer rows that don't exist, but have been referenced in the ColumnControl
// targets. This needs to be done _before_ the header / footer structure is detected.
$(document).on('i18n.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    var thead = api.table().header();
    var tableInit = settings.oInit.columnControl;
    var defaultInit = ColumnControl.defaults;
    var baseTargets = [];
    var ackTargets = {};
    // Determine if there is only one header row initially. If there is, we might append more
    // after it. Mark the top row as the header row using `titleRow` in the DataTables configuration
    if (thead.querySelectorAll('tr').length <= 1 && settings.titleRow === null) {
        settings.titleRow = 0;
    }
    identifyTargets(baseTargets, tableInit);
    if (ColumnControl.defaults.content) {
        identifyTargets(baseTargets, defaultInit);
    }
    api.columns().every(function (i) {
        var columnInit = this.init().columnControl;
        identifyTargets(baseTargets, columnInit);
    });
    for (var i = 0; i < baseTargets.length; i++) {
        assetTarget(ackTargets, baseTargets[i], api);
    }
});
// Initialisation of ColumnControl instances - has to be done _after_ the header / footer structure
// is detected by DataTables.
$(document).on('preInit.dt', function (e, settings) {
    if (e.namespace !== 'dt') {
        return;
    }
    var api = new DataTable.Api(settings);
    var tableInit = settings.oInit.columnControl;
    var defaultInit = ColumnControl.defaults;
    var baseTargets = [];
    identifyTargets(baseTargets, tableInit);
    // Only add the default target if there is actually content for it
    if (ColumnControl.defaults.content) {
        identifyTargets(baseTargets, defaultInit);
    }
    api.columns().every(function (i) {
        var columnInit = this.init().columnControl;
        var targets = identifyTargets(baseTargets.slice(), columnInit);
        for (var i_1 = 0; i_1 < targets.length; i_1++) {
            // Each of the column, table and defaults configuration can be an array of config
            // objects, an array of content, or a configuration object. There might be multiple
            // targets for each one, and they might not exist! Therefore this is more complex
            // than it might be desirable.
            var columnTargetInit = getOptionsForTarget(targets[i_1], columnInit);
            var tableTargetInit = getOptionsForTarget(targets[i_1], tableInit);
            var defaultTargetInit = getOptionsForTarget(targets[i_1], defaultInit);
            if (defaultTargetInit || tableTargetInit || columnTargetInit) {
                new ColumnControl(api, this.index(), Object.assign({}, defaultTargetInit || {}, tableTargetInit || {}, columnTargetInit || {}));
            }
        }
    });
});
DataTable.Api.registerPlural('columns().ccSearchClear()', 'column().ccSearchClear()', function () {
    var ctx = this;
    return this.iterator('column', function (settings, idx) {
        // Note that the listeners for this will not redraw the table.
        ctx.trigger('cc-search-clear', [idx]);
    });
});
DataTable.ext.buttons.ccSearchClear = {
    text: function (dt) {
        return dt.i18n('columnControl.buttons.searchClear', 'Clear search');
    },
    init: function (dt, node, config) {
        var _this = this;
        dt.on('draw.DT', function () {
            var enabled = false;
            var glob = !!dt.search();
            // No point in wasting clock cycles if we already know it will be enabled
            if (!glob) {
                dt.columns().every(function () {
                    if (this.search.fixed('dtcc') || this.search.fixed('dtcc-list')) {
                        enabled = true;
                    }
                });
            }
            _this.enable(glob || enabled);
        });
        this.enable(false);
    },
    action: function (e, dt, node, config) {
        dt.search('');
        dt.columns().ccSearchClear();
        dt.draw();
    }
};
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation support - this is more involved than normal as targets might
 * need to be created, and also options needs to be resolved into a standard
 * ColumnControl configuration object, from the various forms allowed in the
 * DataTables configuration.
 */
/**
 * Given a ColumnControl target, make sure that it exists. If not, create it.
 *
 * @param ackTargets Cache for list of targets that have already been found or created
 * @param target Current target
 * @param dt DataTable API
 * @returns Void
 */
function assetTarget(ackTargets, target, dt) {
    // Check if we already know about the target - if so, we know that it must already be in place
    if (ackTargets[target]) {
        return;
    }
    var isHeader = true; // false for footer
    var row = 0;
    if (typeof target === 'number') {
        row = target;
    }
    else {
        var parts = target.split(':');
        if (parts[0] === 'tfoot') {
            isHeader = false;
        }
        if (parts[1]) {
            row = parseInt(parts[1]);
        }
    }
    // The header / footer have not yet had their structure read, so they aren't available via
    // the API. As such we need to do our own DOM tweaking
    var node = isHeader ? dt.table().header() : dt.table().footer();
    // If the node doesn't exist yet, we need to create it
    if (!node.querySelectorAll('tr')[row]) {
        var columns = dt.columns().count();
        var tr = createElement('tr');
        tr.setAttribute('data-dt-order', 'disable');
        for (var i = 0; i < columns; i++) {
            tr.appendChild(createElement('td'));
        }
        node.appendChild(tr);
    }
    ackTargets[target] = true;
}
/**
 * Given a target, get the config object for it from the parameter passed in
 *
 * @param target ColumnControl target
 * @param input The dev's configuration
 * @returns The resolved config object, if found
 */
function getOptionsForTarget(target, input) {
    var defaultTarget = ColumnControl.defaults.target;
    var selfTarget;
    if (isIContentArray(input)) {
        // Top level content array - e.g. `columnControl: ['order']`
        if (defaultTarget === target) {
            return {
                target: defaultTarget,
                content: input
            };
        }
    }
    else if (Array.isArray(input)) {
        // Top level array, some items of which will be configuration objects (possibly not all)
        for (var i = 0; i < input.length; i++) {
            var item = input[i];
            if (isIContentArray(item)) {
                // A content array, e.g. the inner array from: `columnControl: [['order']]
                if (defaultTarget === target) {
                    return {
                        target: defaultTarget,
                        content: item
                    };
                }
            }
            else if (isIConfig(item)) {
                // A config object, e.g. the object from: `columnControl: [{content: []}]`
                selfTarget = item.target !== undefined ? item.target : defaultTarget;
                if (target === selfTarget) {
                    return item;
                }
            }
            else {
                // A content object
                if (target === defaultTarget) {
                    return {
                        target: defaultTarget,
                        content: input
                    };
                }
            }
        }
    }
    else if (typeof input === 'object') {
        // An object can be either a config object, or an extending content object
        if (isIConfig(input)) {
            // Config object: columnControl: {content: []}
            selfTarget = input.target !== undefined ? input.target : defaultTarget;
            if (target === selfTarget) {
                return input;
            }
        }
        else {
            // content object: columnControl: [{extend: 'order'}]
            if (target === defaultTarget) {
                return {
                    target: defaultTarget,
                    content: input
                };
            }
        }
    }
}
/**
 * Get a list of all targets from the configuration objects / arrays
 *
 * @param targets Established list of targets - mutated
 * @param input Configuration object / array
 * @returns Updated array
 */
function identifyTargets(targets, input) {
    function add(target) {
        if (!targets.includes(target)) {
            targets.push(target);
        }
    }
    if (Array.isArray(input)) {
        if (input.length === 0) {
            // Empty array - assume it is empty content
            add(ColumnControl.defaults.target);
        }
        else {
            // Array of options, or an array of content
            input.forEach(function (item) {
                add(typeof item === 'object' && item.target !== undefined
                    ? item.target
                    : ColumnControl.defaults.target);
            });
        }
    }
    else if (typeof input === 'object') {
        // Full options defined: { target: x, content: [] }
        add(input.target !== undefined ? input.target : ColumnControl.defaults.target);
    }
    return targets;
}
/**
 * Check if an item is a configuration object or not
 *
 * @param item Item to check
 * @returns true if it is a config object
 */
function isIConfig(item) {
    return typeof item === 'object' && item.target !== undefined
        ? true
        : false;
}
/**
 * Determine if an array contains only content items or not
 *
 * @param arr Array to check
 * @returns true if is content only, false if not (i.e. is an array with configuration objects).
 */
function isIContentArray(arr) {
    var detectedConfig = false;
    if (!Array.isArray(arr)) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (isIConfig(arr[i])) {
            detectedConfig = true;
            break;
        }
    }
    return !detectedConfig;
}


return DataTable;
}));
