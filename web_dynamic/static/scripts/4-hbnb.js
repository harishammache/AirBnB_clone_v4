$(document).ready(function() {
  // Variable to store the list of Amenity IDs
  const amenityIDs = [];

  // Function to update the list of Amenities in the h4 tag
  function updateAmenities() {
      const amenitiesList = Object.values(amenityIDs).join(', ');
      if (amenitiesList.length > 0) {
          $('div.amenities h4').text(amenitiesList);
      } else {
          $('div.amenities h4').html('&nbsp;');
      }
  }

  // Event listener for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function() {
      const amenityID = $(this).data('id');
      const amenityName = $(this).data('name');
      if ($(this).is(':checked')) {
          // Add Amenity ID to the variable if checkbox is checked
          if (!amenityIDs.includes(amenityName)) {
              amenityIDs.push(amenityName);
          }
      } else {
          // Remove Amenity ID from the variable if checkbox is unchecked
          const index = amenityIDs.indexOf(amenityName);
          if (index !== -1) {
              amenityIDs.splice(index, 1);
          }
      }
      // Update the h4 tag inside the div Amenities
      updateAmenities();
  });

  // Request the status from the API
  $.post('http://0.0.0.0:5001/api/v1/places_search/', function(data) {
      if (data.status === 'OK') {
          $('#api_status').addClass('available');
      } else {
          $('#api_status').removeClass('available');
      }
  });
});
