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
});
