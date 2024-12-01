$(function () {
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
