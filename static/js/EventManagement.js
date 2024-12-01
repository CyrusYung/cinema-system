$(function () {
  $('#Confirm').on('click', async function () {
    var imgcheck = true;
    var VenueCheck = true;
    var TitleCheck = true;
    var DateCheck = true;
    var descriptionCheck = true;

    if (!$('#Venue').val()) {
      alert('Venue cannot be empty');
      VenueCheck = false;
    } else if (!$('#Date').val()) {
      alert('Date cannot be empty.');
      DateCheck = false;
    } else if (!$('#description').val()) {
      alert('description cannot be empty.');
      descriptionCheck = false;
    } else if (!$('#Title').val()) {
      alert('Title cannot be empty.');
      TitleCheck = false;
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
    form_Data.append('date', $('#Date').val());
    form_Data.append('description', $('#description').val());
    form_Data.append('title', $('#Title').val());
    form_Data.append('image', $('#image').prop('files')[0]);

    if (imgcheck && VenueCheck && TitleCheck && DateCheck && descriptionCheck) {
      try {
        $.ajax({
          type: 'POST',
          url: ' /event/insert',

          data: form_Data,
          async: false,
          contentType: false,
          processData: false,
          success: async function (data) {
            console.log(data);
            window.location.replace('./index.html');
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
    var DateCheck = true;
    var descriptionCheck = true;

    if (!$('#Venue').val()) {
      alert('Venue cannot be empty');
      VenueCheck = false;
    } else if (!$('#Date').val()) {
      alert('Date cannot be empty.');
      DateCheck = false;
    } else if (!$('#description').val()) {
      alert('description cannot be empty.');
      descriptionCheck = false;
    } else if (!$('#Title').val()) {
      alert('Title cannot be empty.');
      TitleCheck = false;
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
    form_Data.append('date', $('#Date').val());
    form_Data.append('description', $('#description').val());
    form_Data.append('title', $('#Title').val());
    form_Data.append('image', $('#image').prop('files')[0]);

    if (imgcheck && VenueCheck && TitleCheck && DateCheck && descriptionCheck) {
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
            window.location.replace('./index.html');
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
