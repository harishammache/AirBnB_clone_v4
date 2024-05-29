$(document).ready(function() {
  // Variable to store the list of Amenity IDs
  var amenityIDs = [];

  // Function to update the list of Amenities in the h4 tag
  function updateAmenities() {
      $('#Amenities').empty();
      if (amenityIDs.length > 0) {
          var amenitiesList = $('<ul></ul>');
          amenityIDs.forEach(function(amenityID) {
              var amenityItem = $('<li></li>').text(amenityID);
              amenitiesList.append(amenityItem);
          });
          $('#Amenities').append(amenitiesList);
      } else {
          $('#Amenities').text('No amenities selected');
      }
  }

  // Event listener for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
      var amenityID = $(this).attr('data-id');
      if ($(this).is(':checked')) {
          // Add Amenity ID to the variable if checkbox is checked
          if (amenityIDs.indexOf(amenityID) === -1) {
              amenityIDs.push(amenityID);
          }
      } else {
          // Remove Amenity ID from the variable if checkbox is unchecked
          var index = amenityIDs.indexOf(amenityID);
          if (index !== -1) {
              amenityIDs.splice(index, 1);
          }
      }
      // Update the h4 tag inside the div Amenities
      updateAmenities();
  });
});
