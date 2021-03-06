/*****************************************************************************/
/* VenueCreate: Event Handlers */
/*****************************************************************************/
Template.VenueCreate.events({
	'click #location_name': function(event){
		var getCoords = function(){
			return Session.get('lat') !== undefined ? Session.get('currentUserCoords') : false;
		}
		if (!!getCoords()){
	  	var venues = Meteor.call('getVenues', getCoords(), function (error, response) {
	  		if (!error){
			  	var nearbySelect = '<select class="selectPicker"></select>'
			  			nearbySelectClass = 'selectPicker';
			  	if (!$(event.currentTarget).siblings('.' + nearbySelectClass).length){
				  	$(event.currentTarget).after(nearbySelect);
				  	_.each(response.data.response.venues, function(venue, i){
				  		var thisSelect = $(event.currentTarget).parent().find('.selectPicker');
		  				var categories = _.pluck(venue.categories, 'shortName');
				  		var venueItem = '<option value="'+ venue.name +'" data-subtext="'+ categories.join(', ') +'">'+ venue.name +'</option>';
				  		$(venueItem).appendTo(thisSelect);
				  	});
				  	$(event.currentTarget).parent().find('.selectPicker').selectpicker();	
			  	}
	  		}
			  else{
			  	throw new Meteor.Error(400, error.reason);
			  }
	  	});
		}
  },
	'keypress #location_address': function(event){
		// setTimeout(function(){
		// 	Session.set('streetAddress', event.currentTarget.value);
		// 	console.log("Approximate street address is: " + Session.get('streetAddress'));
		// }, 5000);
	},
	'submit #network_create': function(event, tmpl){
		event.preventDefault();
		var url = $('#location_name').val();
		var venue = {
			// 'name': tmpl.find('#location_name').val,
			// 'network':{
			// 	'ssid': tmpl.find('#network_name').val,
			// 	'password': tmpl.find('#network_password').val,
			// 	'isPublic': tmpl.find('#network_isPublic').checked,
			// 	'verified': false
			// },
			// 'location': {
			// 	'name': tmpl.find('#location_name').val,
			// 	'lat': Session.get('lat'),
			// 	'lon': Session.get('lon'),
			// 	'streetAddress': tmpl.find('#location_address').val,
			// 	'address': Session.get('locationData')
			// }
		};
		var venueID = Meteor.call('addVenue', venue, function (error, response){
			if (!error){
				console.log(response)
			} else {
				throw new Error(error);
			}
		});
		tmpl.find('form').reset();
		return false;
	}
});

/*****************************************************************************/
/* VenueCreate: Helpers */
/*****************************************************************************/
Template.VenueCreate.helpers({
	streetAddress: function(){
		return Session.get('streetAddress');
	},
	locationData: function(){
		return Session.get('locationData');
	},
	venues: function(){
		return Session.get('allVenues');
	}
});

/*****************************************************************************/
/* VenueCreate: Lifecycle Hooks */
/*****************************************************************************/

Template.VenueCreate.created = function () {
	getUserGeolocation();
};

Template.VenueCreate.rendered = function () {
};

Template.VenueCreate.destroyed = function () {
};
