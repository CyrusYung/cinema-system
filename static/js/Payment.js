//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(document).ready(function () {
  $.ajax({
    url: '/auth/me',
    method: 'GET',
    success: function (response) {
      //console.log(response);
      //document.getElementById('icon').src = '';
      console.log('success');
    },
    error: function (error) {
      console.log('fail');
      alert('Please login');
      window.open('/login.html', '_self');
    },
  });

  var now = new Date();
  var datetime = now.toLocaleString();
  var SeatString = '';
  console.log(JSON.parse(localStorage.getItem('bookingtemp')));
  const bookinginfo = JSON.parse(localStorage.getItem('bookingtemp'));
  if (bookinginfo.discount == true) {
    $('#discount').removeClass('d-none');
  }
  $('#ticket').val(bookinginfo.ticketCount);
  $('#Kid').val(bookinginfo.kidCount);
  $('#Adult').val(bookinginfo.AdultCount);
  $('#Student').val(bookinginfo.StudentCount);
  $('#film').val(bookinginfo.filmName);
  bookinginfo.Seat.forEach((item) => {
    SeatString += item + ',';
  });
  var lastIndex = SeatString.lastIndexOf(',');
  SeatString = SeatString.substring(0, lastIndex);
  $('#seat').val(SeatString);
  $('#total').val(bookinginfo.totalPrice);

  $('#Confirm').on('click', async function () {
    console.log(document.getElementById('cardNo').value.length);
    if (document.getElementById('cardNo').value.length != 16) {
      alert('Invalid CardNo.');
    } else {
      const formData = new FormData();

      try {
        formData.append('kidCount', bookinginfo.kidCount);
        formData.append('AdultCount', bookinginfo.AdultCount);
        formData.append('StudentCount', bookinginfo.StudentCount);
        formData.append('ticketCount', bookinginfo.ticketCount);
        for (var i = 0; i < bookinginfo.Seat.length; i++) {
          formData.append('Seat[]', bookinginfo.Seat[i]);
        }
        formData.append('Price', bookinginfo.totalPrice);
        formData.append('CardNumber', $('#cardNo').val());
        formData.append('DateofFilm', bookinginfo.Date);
        formData.append('DateofPayment', datetime);
        formData.append('FilmName', bookinginfo.filmName);
        await $.ajax({
          type: 'POST',
          url: ' /pay/confirm',
          data: formData,
          async: false,
          processData: false,
          contentType: false,
          success: async function (data) {
            console.log(data);

            alert('Payment Success, Click "ok" to see ticket.');
            //document.getElementById('a').innerHTML = info.status;
            window.location.replace('./Confirm.html');
          },
          error: async function (data) {
            console.log(JSON.stringify(data));
            console.log(data.responseJSON.status);
            alert(data.responseJSON.message);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
