VenuesController = RouteController.extend({
  // onBeforeAction: function(){
  //   // getUserGeolocation();
  //   this.next();
  // },

  subscriptions: function () {
    this.subscribe('Venues', this.params._id);
  },

  data: function () {
    return Venues.findOne({_id: this.params._id});
  },

  index: function() {
    this.render('VenueList', {
      data:  { 
        venues: Venues.find(
          { 'location.coordinates': 
            { 
              $near : !!Session.get('currentUserCoords') ? Session.get('currentUserCoords') : Meteor.settings.public.Defaults.defaultUserCoords
            }   
          }
        )
      }
    })
  },

  detail: function () {
    this.render('VenueDetail', {
      data: Venues.findOne({_id: this.params._id})
    });
  }, 

  create: function(data){
    this.render('VenueCreate');
  },

  edit: function(){
    this.state.set('isEditing', true);
    this.render('VenueDetail');
  }
});
