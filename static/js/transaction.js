//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(document).ready(async function () {
  $.ajax({
    url: '/pay/history',
    method: 'GET',
    success: async function (response) {
      console.log(response.user.history);

      //console.log('success');
      response.user.history.forEach((ele, i) => {
        $('tbody').append(
          '<tr><th scope="row">' +
            (i + 1) +
            '</th><td>' +
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
    error: function (error) {
      alert('Please login');
      window.open('/login.html', '_self');
    },
  });
});
