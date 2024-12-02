//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(function () {
  var seatarr = [];
  var ticketno = 150;
  $.ajax({
    url: '/pay/ticket',
    method: 'GET',
    success: function (response) {
      console.log(response);
      response.seat.ticket.forEach((ele, i) => {
        var seatString = ele.seat.toString();
        var seatNo = seatString.split(',');
        seatNo.forEach((ele) => {
          seatarr.push(ele);
        });
      });
      var ticketSell = seatarr.length;
      ticketno = ticketno - ticketSell;
      console.log('success');
    },
    error: function (error) {},
  });
  $.ajax({
    url: '/auth/me',
    method: 'GET',
    success: function (response) {
      //console.log(response);
      document.getElementById('welcome').innerHTML =
        'Welcome back!' + response.user.username + '(' + response.user.role + ')';
      //document.getElementById('icon').src = '';
      console.log('success');
    },
    error: function (error) {
      //you don't need to log in to see film info
      //alert('Please login');
      //window.open('/login.html', '_self');
    },
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
            <p><strong>Ticket available today:</strong> ` +
            ticketno +
            `</p>
          </div>
        </div>`
        );
      });
      // Toggle event details on card click
      $('.event-card').click(function () {
        $(this).next('.event-details').slideToggle();
      });
    },
    error: async function (err) {
      console.log(err);
      //alert(err.responseJSON.message);
    },
  });
});
