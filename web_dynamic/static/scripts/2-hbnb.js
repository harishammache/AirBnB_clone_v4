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

    // New functionality to check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === "OK") {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function() {
        $('#api_status').removeClass('available');
    });
});