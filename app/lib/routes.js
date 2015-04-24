Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, { only: ['venue.detail'] });

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client',
  waitOn: function(){
  	return [
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('allVenues')
    ];
  }
});

Router.route('/venues/:_id', {
  name: 'venue.detail',
  controller: 'VenuesController',
  action: 'detail',
  where: 'client',
  waitOn: function(){
    return [
      Meteor.subscribe('VenueDetail', this.params._id),
      Meteor.subscribe('allUsers')
    ];
  }
});

Router.route('/venue/create', {
  name: 'venue.create',
  controller: 'VenuesController',
  where: 'client',
  action: 'create'
});


Router.route('/venues/:_id/edit', {
  name: 'venue.edit',
  controller: 'VenuesController',
  action: 'edit',
  where: 'client'
});
