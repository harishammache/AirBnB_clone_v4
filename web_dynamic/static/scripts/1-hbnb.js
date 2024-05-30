$(document).ready(function () {
  // Dictionary to store the selected Amenity IDs and names
  const selectedAmenities = {};

  // Function to update the list of Amenities in the h4 tag
  function updateAmenities() {
    const amenitiesList = Object.values(selectedAmenities).join(", ");
    if (amenitiesList.length > 0) {
      $("div.amenities h4").text(amenitiesList);
    } else {
      $("div.amenities h4").html("&nbsp;");
    }
  }

  // Event listener for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityID = $(this).data("id");
    const amenityName = $(this).data("name");
    if ($(this).is(":checked")) {
      // Add Amenity ID to the dictionary if checkbox is checked
      if (!selectedAmenities[amenityID]) {
        selectedAmenities[amenityID] = amenityName;
      }
    } else {
      // Remove Amenity ID from the dictionary if checkbox is unchecked
      delete selectedAmenities[amenityID];
    }
    // Update the h4 tag inside the div Amenities
    updateAmenities();
  });
});
