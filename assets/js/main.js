/** @method $
    @param {document} document
    @method ready
    @param {callback} init
    Calls given callback function when document is loaded
 */
$(document).ready(init)

/** @constant state
    @type {string}
    @default
    Holds the start and end destination autocomplete object
 */
const state = {
  start: null,
  end: null
};
let trip;

/** @function init
    @param none
    Run script for Google Maps API after document load
    Add a click handler to DOM button '#searchBoxGo'
*/
function init(){
  let apiScript = $('<script>');
  apiScript.attr('src', `https://maps.googleapis.com/maps/api/js?key=${KEYS.maps}&libraries=places&callback=autocompleteLoad`);
  apiScript.attr('async', 'true');
  $('body').append(apiScript);
  $('#searchBoxGo').on('click', startTrip);
}

/** @function startTrip
    @param {event} event
    Limits input and creates a Trip object and renders the map
 */
function startTrip(event){
  if (!state.start || !state.end) return;
  event.preventDefault();
  trip = new Trip(state);
  trip.renderRoute();
}

/** @function initAutoComplete
    @param {element} element
    Creates autocomplete object and adds it to the global state object
 */
function initAutocomplete(element){
  let autocomplete = new google.maps.places.Autocomplete(
    element, {types: ['geocode']}
  );
  autocomplete.addListener('place_changed', () => {
    state[$(element).attr('data-location')] = autocomplete.getPlace();
  });
}

/** @function autocompleteLoad
    @param none
    Initializes auto complete functionality on the two input boxes
    '#searchBoxStart' & '#searchBoxEnd'
 */
function autocompleteLoad(){
  initAutocomplete(document.querySelector('#searchBoxStart'));
  initAutocomplete(document.querySelector('#searchBoxEnd'));
}
