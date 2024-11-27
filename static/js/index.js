$(function () {
  $('#logout').on('click', function () {
    console.log('yo');
    if (window.confirm('Confirm to logout?')) {
      $.ajax({
        url: 'auth/logout',
        method: 'POST',
        success: function (data) {
          window.open('/login.html', '_self');
          console.log('logout');
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
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
});
