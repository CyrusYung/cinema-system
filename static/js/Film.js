//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(document).ready(function () {
  $('#btn3').on('click', function () {
    $.ajax({
      url: '/auth/me',
      method: 'GET',
      success: function (response) {
        //console.log(response);

        console.log('success');
        window.open('/CinemaSeat.html', '_self');
      },
      error: function (error) {
        //you don't need to log in to see film info
        alert('Please login to buy ticket.');
        window.open('/login.html', '_self');
      },
    });
  });
  $('#btn1').on('click', function () {
    $.ajax({
      url: '/auth/me',
      method: 'GET',
      success: function (response) {
        //console.log(response);

        console.log('success');
        window.open('/CinemaSeat.html', '_self');
      },
      error: function (error) {
        //you don't need to log in to see film info
        alert('Please login to buy ticket.');
        window.open('/login.html', '_self');
      },
    });
  });
  $('#btn2').on('click', function () {
    $.ajax({
      url: '/auth/me',
      method: 'GET',
      success: function (response) {
        //console.log(response);

        console.log('success');
        window.open('/CinemaSeat.html', '_self');
      },
      error: function (error) {
        //you don't need to log in to see film info
        alert('Please login to buy ticket.');
        window.open('/login.html', '_self');
      },
    });
  });
});
