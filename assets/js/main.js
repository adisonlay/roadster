$(document).ready(init)

const state = {
  start: null,
  end: null
};

function init(){
  $('#searchBoxGo').on('click', startTrip);
  $('#accordion').accordion({
    heightStyle: 'fill',
    animate: {
      easing: 'linear',
      duration: 100
    }
  });
}
let trip;

function startTrip(event){
  if (!state.start || !state.end) return;
  event.preventDefault();
  trip = new Trip(state);
  trip.renderRoute();
}

function initAutocomplete(element){
  let autocomplete = new google.maps.places.Autocomplete(
   element, {types: ['geocode']}
  );

  autocomplete.addListener('place_changed', () => {
    state[$(element).attr('data-location')] = autocomplete.getPlace();
  });
}

function autocompleteLoad(){
  initAutocomplete(document.querySelector('#searchBoxStart'));
  initAutocomplete(document.querySelector('#searchBoxEnd'));
}
