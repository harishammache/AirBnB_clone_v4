$(document).ready(function() {
  const checkAmenities = {};

  $('input:checkbox').change(function() {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      if ($(this).is(':checked')) {
          checkAmenities[amenityId] = amenityName;
      } else {
          delete checkAmenities[amenityId];
      }

      const amenitiesList = Object.values(checkAmenities).join(', ');
      $('.amenities h4').text(amenitiesList);
  });

  // Check API status
  $.get('http://0.0.0.0:5000/api/v1/status/', function(data) {
      if (data.status === "OK") {
          $('#api_status').addClass('available');
      } else {
          $('#api_status').removeClass('available');
      }
  }).fail(function() {
      $('#api_status').removeClass('available');
  });

  // Send POST request to places_search endpoint
  $.ajax({
      url: 'http://0.0.0.0:5000/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
          states: [], // Provide State IDs if needed
          cities: [], // Provide City IDs if needed
          amenities: [] // Provide Amenity IDs if needed
      }),
      success: function(data) {
          // Clear existing places
          $('.places').empty();

          // Loop through the result and create article tags
          data.forEach(function(place) {
              const article = $('<article>').addClass('place');
              // Populate article with place data
              article.html(`<h2>${place.name}</h2><div class="price_by_night">${place.price_by_night}</div><div class="information"><div class="max_guest">${place.max_guest} Guest(s)</div><div class="number_rooms">${place.number_rooms} Bedroom(s)</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div></div><div class="description">${place.description}</div>`);
              // Append article to section.places
              $('.places').append(article);
          });
      },
      error: function(xhr, status, error) {
          console.error('Error:', error);
      }
  });
});
