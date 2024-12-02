//Yung Chun Hei 21099757D
//Li Man Sing 23030524D
$(function () {
  //<a href="./Profile.html">
  $('#iconbtn').on('click', function () {
    $.ajax({
      url: '/auth/me',
      method: 'GET',
      success: function (response) {
        window.open('/profile.html', '_self');
        console.log('success');
      },
      error: function (error) {
        window.open('/login.html', '_self');
      },
    });
  });
  $.ajax({
    url: '/auth/nav',
    method: 'GET',
    success: function (response) {
      console.log(response);
      $('#transaction').removeClass('d-none');
      document.getElementById('icon').src = './uploads/' + response.user.icon.data.filename;
      //'././' + response.user.icon.data.destination + response.user.icon.data.filename;
      console.log('success');
    },
    error: function (error) {
      $('#login').removeClass('d-none');
      $('#transaction').addClass('d-none');
    },
  });
});
