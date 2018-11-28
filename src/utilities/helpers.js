var moment = require('moment');

/**
 * Functions to work with moment js
 */
function toCalendarDate( str ) {
    return moment( str).calendar();
}

function formatDate( str, format ) {
    return moment( str ).format( format );
}

function toDateString( str ) {
    return formatDate( str, "MMM Do YYYY" )
}

export { toCalendarDate, toDateString };