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
  //$('#seatMap').append();
  var Overallchoosen = '';
  var Normalseat = 0;
  var VIPseat = 0;
  var seatPrice = 0;
  var ticketPrice = 0;
  var ticketCount = 0;
  var kidCount = 0;
  var AdultCount = 0;
  var StudentCount = 0;
  const Seatarr = [];
  $(document).on('touch click', '#SeatMap g *', function (e) {
    e.preventDefault();

    // reset active seat
    //$(this).parents('svg').find('path').removeClass('active');
    var choosenSeat = $(this).parent('g').attr('id');
    // if exist in array, pop ; if not exist, push
    if (Seatarr.includes(choosenSeat)) {
      Seatarr.pop(choosenSeat);
    } else {
      Seatarr.push(choosenSeat);
    }
    //console.log(Seatarr);
    // give the parent element class

    if (
      $(this).parent('g').children('path').css('fill') == 'rgb(0, 166, 31)' ||
      $(this).parent('g').children('path').css('fill') == 'rgb(0, 0, 255)'
    ) {
      $(this).parent('g').children('path').css('fill', 'gray');
      if (
        choosenSeat == 'E6' ||
        choosenSeat == 'E7' ||
        choosenSeat == 'E8' ||
        choosenSeat == 'E9' ||
        choosenSeat == 'E10'
      ) {
        VIPseat += 1;
      } else {
        Normalseat += 1;
      }
    } else if ($(this).parent('g').children('path').css('fill') == 'rgb(128, 128, 128)') {
      if (
        choosenSeat == 'E6' ||
        choosenSeat == 'E7' ||
        choosenSeat == 'E8' ||
        choosenSeat == 'E9' ||
        choosenSeat == 'E10'
      ) {
        VIPseat -= 1;
        $(this).parent('g').children('path').css('fill', 'blue');
      } else {
        Normalseat -= 1;
        $(this).parent('g').children('path').css('fill', '#00a61f');
      }
    }

    // grab the seat id

    Overallchoosen = Overallchoosen + choosenSeat + ',';
    seatPrice = VIPseat * 15 + Normalseat * 6;

    $('#SeatPrice').val(seatPrice);
    $('#TotalPrice').val(seatPrice + ticketPrice);
    //console.log($(this).parent('g').children('path').css('fill'));
    //console.log(choosenSeat);
    //console.log(Normalseat);
    //console.log(VIPseat);
  });
  $('#KidCount').on('change', function () {
    kidCount = parseInt($('#KidCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    $('#TotalPrice').val(seatPrice + ticketPrice);
  });
  $('#AdultCount').on('change', function () {
    AdultCount = parseInt($('#AdultCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    $('#TotalPrice').val(seatPrice + ticketPrice);
  });
  $('#StudentCount').on('change', function () {
    StudentCount = parseInt($('#StudentCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    $('#TotalPrice').val(seatPrice + ticketPrice);
  });
  $('#Confirm').on('click', function () {
    if ($('#TicketPrice').val() == 0 || $('#SeatPrice').val() == 0) {
      alert('Please choose identities and Seat.');
    } else if (Seatarr.length != ticketCount) {
      alert('Seat should be equal to the Total ticket bought.');
    } else {
      localStorage.setItem(
        'bookingtemp',
        JSON.stringify({
          StudentCount: StudentCount,
          kidCount: kidCount,
          AdultCount: AdultCount,
          ticketCount: ticketCount,
          ticketPrice: ticketPrice,
          seatPrice: seatPrice,
          totalPrice: seatPrice + ticketPrice,
          Seat: Seatarr,
        })
      );
      window.location.replace('./Payment.html');
    }
  });
});

//test svg id function
$('#D5').on('click', function (e) {
  e.preventDefault();

  // reset active seat
  $(this).removeClass('cls-2');

  // give the parent element class
  $(this).css('fill', 'red');
  // grab the seat id
  //var choosenSeat = $(this).parent('g').attr('id')
  //console.log(choosenSeat)
});
