//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(document).ready(function () {
  $.ajax({
    url: '/auth/admin',
    method: 'GET',
    success: function (response) {
      console.log(response);
      console.log('success');
    },
    error: function (error) {
      alert('Unauthorized');
      console.log(error);
      if (error.message == 'Unauthorized') {
        window.open('/login.html', '_self');
      } else {
        window.open('/index.html', '_self');
      }
    },
  });
  $.ajax({
    type: 'GET',
    url: '/event/all',

    success: async function (data) {
      console.log(data);

      data.user.all.forEach((ele, i) => {
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
