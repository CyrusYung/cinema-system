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
});
