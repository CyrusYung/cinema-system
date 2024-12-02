//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(function () {
  var SeatString = '';
  const bookinginfo = JSON.parse(localStorage.getItem('bookingtemp'));
  bookinginfo.Seat.forEach((item) => {
    SeatString += item + ',';
  });
  var lastIndex = SeatString.lastIndexOf(',');
  SeatString = SeatString.substring(0, lastIndex);
  console.log(SeatString);
  document.getElementById('FilmName').innerHTML = 'FilmName: ' + bookinginfo.filmName;
  document.getElementById('seat').innerHTML = 'Seat: ' + SeatString;
  var now = new Date();
  var datetime = now.toLocaleString();
  document.getElementById('date').innerHTML = datetime;
  localStorage.removeItem('bookingtemp');
  $.ajax({
    url: '/pay/success',
    method: 'GET',
    success: function (response) {
      //console.log(response);
      var SeatString = '';
      console.log(response);
      document.getElementById('username').innerHTML = 'Username: ' + response.user.username;

      //document.getElementById('icon').src = '';
      console.log('success');
    },
    error: function (error) {
      //you don't need to log in to see film info
      //alert('Please login');
      //window.open('/login.html', '_self');
    },
  });
});
