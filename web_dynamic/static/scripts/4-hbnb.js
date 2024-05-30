$(document).ready(function () {
    const nameAmenity = [];
    const idAmenity = [];

    $('input:checkbox').click(function () {
        if ($(this).is(":checked")) {
            nameAmenity.push($(this).attr('data-name'));
            idAmenity.push($(this).attr('data-id'));
        } else {
            const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
            const idIndex = idAmenity.indexOf($(this).attr('data-id'));
            nameAmenity.splice(nameIndex, 1);
            idAmenity.splice(idIndex, 1);
        }
        $('.amenities h4').text(nameAmenity.join(', '));
    });

    $.get("http://localhost:5001/api/v1/status/", data => {
        if (data.status == "OK") {
            $('DIV#api_status').addClass("available");
        } else {
            $('DIV#api_status').removeClass("available");
        }
    });

    function fetchPlaces(data) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $('SECTION.places').empty().append(data.map(place => {
                    return `<article>
                              <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                              </div>
                              <div class="information">
                                <div class="max_guest">${place.max_guest} Guests</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                              </div>
                              <div class="description">
                                ${place.description}
                              </div>
                            </article>`;
                }));
            }
        });
    }

    // Initial fetch without any filter
    fetchPlaces({});

    // Fetch places based on selected amenities when the button is clicked
    $('button').click(function () {
        fetchPlaces({ amenities: idAmenity });
    });
});
