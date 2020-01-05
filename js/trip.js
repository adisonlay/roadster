/** Class representing the trip as a whole throughout the application */
class Trip {
  /** Constructor creates necessary properties and creates/renders Route object
      @param {object} locations - Contains start and end locations
   */
  constructor(locations) {
    this.routeCallback = this.routeCallback.bind(this);
    this.placesCallback = this.placesCallback.bind(this);

    this.map = null;
    this.waypoints = [];

    this.route = new Route(locations, this.routeCallback);
    this.renderRoute();
  }

  /** @method routeCallback
      @param {array} waypoints - Contains waypoint objects
      @param {object} map - Google Maps Map object
      Creates Places & Weather objects and renders places
   */
  routeCallback(waypoints, map) {
    this.waypoints = waypoints;
    this.map = map;
    this.places = new Place(this.map, this.waypoints, this.placesCallback);
    this.weather = new Weather(this.waypoints);

    // Render places page once
    this.renderEntirePlace();

    $('#accordion').accordion({
      heightStyle: 'fill',
      animate: {
        easing: 'linear',
        duration: 100
      }
    });
  }

  /** @method renderRoute
      @param none
      Calls render method on route object
   */
  renderRoute() {
    this.route.render();
  }

  /** @method placesCallback
      @param none
   */
  placesCallback(placesArray) {
    const main = $('.main');
    let container = $('<div>').addClass('final__Container');
    main.empty();
    main.append(container);
    container.append($('<div>').text('ROADSTER').addClass('final__Logo'));
    container.append($('<div>').text('Your Trip').addClass('trip'));

    let placeListContainer = $('<div>').addClass('final__ListContainer');
    container.append(placeListContainer);

    for (let i = 0; i < placesArray.length; i++) {
      let placeContainer = $('<div>').addClass('place__Container');
      let stopName = placesArray[i].waypointName;
      let heading = $('<h1>').text(stopName);
      let ul = $('<ul>');

      if ((i !== 0) && (i !== placesArray.length - 1) && (!placesArray[i].waypointSelectedPlaces.length)) {
        ul.append($('<li>').text('No stops selected'));
      } else {
        if (i === 0) {
          ul.append($('<li>').text('Road trip start!'));
        }

        for (let j = 0; j < placesArray[i].waypointSelectedPlaces.length; j++) {
          let li = $('<li>');
          let anchor = $('<a>').attr('href', placesArray[i].waypointSelectedURLs[j]).attr('target', '_blank');
          anchor.text(placesArray[i].waypointSelectedPlaces[j]);
          let addressText = $('<p>').text(placesArray[i].waypointSelectedAddresses[j]);
          li.append(anchor, addressText);
          ul.append(li);
        }

        if (i === placesArray.length - 1) {
          ul.append($('<li>').text('Road trip finish!'));
        }
      }

      placeContainer.append(heading, ul);
      placeListContainer.append(placeContainer);
    }

    let printButton = $('<button>').addClass('btn btn--green').text('Print').click(() => {window.print()});
    container.append(printButton);
  }

  /** @method renderPlaces
    @param none
    Calls fetchNearbyPlaces & renderPlacesPage methods on places object
  */
  renderEntirePlace() {
    this.places.renderPlacesPage();
    this.places.fetchNearbyPlaces();
  }
}
