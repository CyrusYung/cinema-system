$(function () {
  $.ajax({
    url: '/auth/nav',
    method: 'GET',
    success: function (response) {
      console.log(response);

      document.getElementById('icon').src = '../././uploads/1732540001897bug.png';
      //'././' + response.user.icon.data.destination + response.user.icon.data.filename;
      console.log('success');
    },
    error: function (error) {},
  });
});
