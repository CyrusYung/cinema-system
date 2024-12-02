//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(function () {
  $.ajax({
    url: '/pay/Allhistory',
    method: 'GET',
    success: async function (response) {
      console.log(response.user.history);

      //console.log('success');
      response.user.history.forEach((ele, i) => {
        $('tbody').append(
          '<tr><th scope="row">' +
            (i + 1) +
            '</th><td>' +
            ele.username +
            '</td><td>' +
            ele.bookingDetail.FilmName +
            '</td><td>' +
            ele.bookingDetail.kidCount +
            '</td><td>' +
            ele.bookingDetail.AdultCount +
            '</td><td>' +
            ele.bookingDetail.StudentCount +
            '</td><td>' +
            ele.bookingDetail.ticketCount +
            '</td><td>' +
            ele.bookingDetail.Price +
            '</td><td>' +
            ele.bookingDetail.DateofFilm +
            '</td></tr>'
        );
      });
    },
    error: function (error) {},
  });
  $.ajax({
    type: 'GET',
    url: '/event/all',

    success: async function (data) {
      console.log(data);

      data.user.all.forEach((ele, i) => {
        $('#Title2').append(`<option value="` + ele.title + `">` + ele.title + `</option>`);
        if (ele.dateTo && ele.dateFrom) {
          var dateString = ele.dateFrom + ' to ' + ele.dateTo;
        } else {
          dateString = 'Upcoming';
        }
        $('#eventContainer').append(
          `        <div class="col-md-6">
          <div
            class="card event-card"
            >
            <img src="` +
            './uploads/' +
            ele.img.data.filename +
            `" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">` +
            ele.title +
            `</h5>
              <p class="card-text"><strong>` +
            ele.subtitle +
            `</strong></p>
              <p class="card-date">Date: ` +
            dateString +
            `</p>
            </div>
          </div>
          <div class="event-details">
            <p>
              <strong>Description:</strong> ` +
            ele.description +
            `
            </p>
            <p><strong>Venue:</strong> ` +
            ele.venue +
            `</p>
          </div>
        </div>`
        );
      });
    },
    error: async function (err) {
      console.log(err);
      //alert(err.responseJSON.message);
    },
  });
  $('#Confirm').on('click', async function () {
    var imgcheck = true;
    var VenueCheck = true;
    var TitleCheck = true;
    var SubtitleCheck = true;
    var DateToCheck = true;
    var DateFromCheck = true;
    var descriptionCheck = true;

    if (!$('#Venue').val()) {
      alert('Venue cannot be empty');
      VenueCheck = false;
    } else if (!$('#description').val()) {
      alert('description cannot be empty.');
      descriptionCheck = false;
    } else if (!$('#Title').val()) {
      alert('Title cannot be empty.');
      TitleCheck = false;
    } else if (!$('#Subtitle').val()) {
      alert('Subtitle cannot be empty.');
      SubtitleCheck = false;
    } else if (!$('#image').prop('files')[0]) {
      alert('Event Image cannot be empty.');
      imgcheck = false;
    }
    /*else if (!($('.form-select').val() == 'user' || $('.form-select').val() == 'student')) {
      alert('Please select your role.');
      RePwcheck = false;
    }*/
    const form_Data = new FormData();

    //const hash = await bcrypt.hash($('#password').val(), 10);

    form_Data.append('venue', $('#Venue').val());
    form_Data.append('dateTo', $('#dateTo').val());
    form_Data.append('dateFrom', $('#dateFrom').val());
    form_Data.append('description', $('#description').val());
    form_Data.append('title', $('#Title').val());
    form_Data.append('Subtitle', $('#Subtitle').val());
    form_Data.append('image', $('#image').prop('files')[0]);

    if (imgcheck && VenueCheck && TitleCheck && SubtitleCheck && descriptionCheck) {
      try {
        $.ajax({
          type: 'POST',
          url: '/event/insert',

          data: form_Data,
          async: false,
          contentType: false,
          processData: false,
          success: async function (data) {
            console.log(data);
            window.location.replace('./adminIndex.html');
          },
          error: async function (err) {
            console.log(err);
            //alert(err.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  $('#Confirm2').on('click', async function () {
    var imgcheck = true;
    var VenueCheck = true;
    var TitleCheck = true;

    var descriptionCheck = true;

    if (!$('#Venue2').val()) {
      alert('Venue cannot be empty');
      VenueCheck = false;
    } else if (!$('#description2').val()) {
      alert('description cannot be empty.');
      descriptionCheck = false;
    } else if (!$('select#Title2').val()) {
      alert('Title cannot be empty.');
      TitleCheck = false;
    } else if (!$('#Newtitle').val()) {
      alert('New Title cannot be empty.');
      TitleCheck = false;
    } else if ($('select#Title2').val() == 'original') {
      alert('Choose a old title.');
      TitleCheck = false;
    } else if (!$('#image2').prop('files')[0]) {
      alert('Event Image cannot be empty.');
      imgcheck = false;
    }
    /*else if (!($('.form-select').val() == 'user' || $('.form-select').val() == 'student')) {
      alert('Please select your role.');
      RePwcheck = false;
    }*/
    const form_Data = new FormData();

    //const hash = await bcrypt.hash($('#password').val(), 10);
    form_Data.append('Newtitle', $('#Newtitle').val());
    form_Data.append('venue', $('#Venue2').val());
    form_Data.append('dateTo', $('#dateTo2').val());
    form_Data.append('dateFrom', $('#dateFrom2').val());
    form_Data.append('description', $('#description2').val());
    form_Data.append('title', $('select#Title2').val());
    form_Data.append('image', $('#image2').prop('files')[0]);

    if (imgcheck && VenueCheck && TitleCheck && descriptionCheck) {
      try {
        $.ajax({
          type: 'POST',
          url: ' /event/update',

          data: form_Data,
          async: false,
          contentType: false,
          processData: false,
          success: async function (data) {
            console.log(data);
            window.location.replace('./adminIndex.html');
          },
          error: async function (err) {
            console.log(err);
            //alert(err.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
