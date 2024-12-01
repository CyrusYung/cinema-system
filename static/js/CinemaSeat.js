$(document).ready(function () {
  var SelectedSeatarr = [];
  var Normalseat = 0;
  var VIPseat = 0;
  var seatPrice = 0;
  var totalPrice = 0;

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
  $('#date').on('change', function () {
    $('#seatMap').html(`<svg
          id="SeatMap"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1280 720"
          style="top: 0; left: 0; height: 100%; width: 100%">
          <defs>
            <style>
              .cls-1 {
                fill: silver;
              }

              .cls-1,
              .cls-2 {
                stroke: #000;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

              .cls-2 {
                fill: #00a61f;
              }
            </style>
          </defs>

          <path id="矩形_3" data-name="矩形 3" class="cls-1" d="M-17-16H1325V759H-17V-16Z" />
          <image
            id="screen"
            x="178"
            y="99"
            width="909"
            height="17"
            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAA40AAAARCAYAAAB5GEmcAAABMklEQVR4nO3d3WrDMAwGUGfs/V85IwMz41mx3W2sKufclCaKDLkpX5Wfo5RyFgAAABh4c1IAAACICI0AAACEhEYAAABCQiMAAAChd6cGgEzO8+v5bcdxfH6/PlttTa0rwfa+30qf3qxud10AeCYmjQCkUYPWFbL64FX1NaXb1tfOguCoz27dbN1RXwB4FkIjAOnchcAd9fidPu2+1bqeySIAmQiNAKQUBcdeOwGc1QEA3wmNAKTx08niI641VtZZrQOAbDwIB4BU+nsZ7+5L/A2rvU0qAXhVJo0ApLF6SepfWp0mmjoC8CqERgBSuQuO0RNJH31AzqhPu2+1DgAyu37R/BUKQAo1jM3ecbj6nsbo+Fmf3bpo3dX+APCfhEYAAABCLk8FAAAgJDQCAAAwVkr5ACXYnxgxRyKxAAAAAElFTkSuQmCC" />

          <text x="11%" y="36%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">A</text>
          <text x="11%" y="48%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">B</text>
          <text x="11%" y="60%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">C</text>
          <text x="11%" y="75%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">D</text>
          <text x="11%" y="90%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">E</text>
          <text x="16%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">1</text>
          <text x="20%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">2</text>
          <text x="24%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">3</text>
          <text x="28%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">4</text>
          <text x="38%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">5</text>
          <text x="42%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">6</text>
          <text x="46%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">7</text>
          <text x="49.5%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">8</text>
          <text x="53%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">9</text>
          <text x="56%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">10</text>
          <text x="60%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">11</text>
          <text x="72%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">12</text>
          <text x="76%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">13</text>
          <text x="79.5%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">14</text>
          <g id="A1">
            <path id="A1" data-name="矩形 2" class="cls-2" d="M194,236h48v35H194V236Z" />
          </g>
          <g id="A4">
            <path id="A4" data-name="矩形 2" class="cls-2" d="M338,236h48v35H338V236Z" />
          </g>
          <g id="A3">
            <path id="A3" data-name="矩形 2" class="cls-2" d="M290,236h48v35H290V236Z" />
          </g>
          <g id="A2">
            <path id="A2" data-name="矩形 2" class="cls-2" d="M242,236h48v35H242V236Z" />
          </g>
          <g id="B1">
            <path id="B1" data-name="矩形 2" class="cls-2" d="M194,324h48v35H194V324Z" />
          </g>
          <g id="B4">
            <path id="B4" data-name="矩形 2" class="cls-2" d="M338,324h48v35H338V324Z" />
          </g>
          <g id="B3">
            <path id="B3" data-name="矩形 2" class="cls-2" d="M290,324h48v35H290V324Z" />
          </g>
          <g id="B2">
            <g id="B2"><path id="B2" data-name="矩形 2" class="cls-2" d="M242,324h48v35H242V324Z" /></g>
          </g>
          <g id="C1">
            <path id="C1" data-name="矩形 2" class="cls-2" d="M194,411h48v35H194V411Z" />
          </g>
          <g id="C4">
            <path id="C4" data-name="矩形 2" class="cls-2" d="M338,411h48v35H338V411Z" />
          </g>
          <g id="C3">
            <path id="C3" data-name="矩形 2" class="cls-2" d="M290,411h48v35H290V411Z" />
          </g>
          <g id="C2">
            <path id="C2" data-name="矩形 2" class="cls-2" d="M242,411h48v35H242V411Z" />
          </g>
          <g id="D1">
            <path id="D1" data-name="矩形 2" class="cls-2" d="M194,516h48v35H194V516Z" />
          </g>
          <g id="D4"><path id="D4" data-name="矩形 2" class="cls-2" d="M338,516h48v35H338V516Z" /></g>
          <g id="D3"><path id="D3" data-name="矩形 2" class="cls-2" d="M290,516h48v35H290V516Z" /></g>
          <g id="D2"><path id="D2" data-name="矩形 2" class="cls-2" d="M242,516h48v35H242V516Z" /></g>
          <g id="D14"><path id="D14" data-name="矩形 2" class="cls-2" d="M1008,517h48v35h-48V517Z" /></g>
          <g id="D13"><path id="D13" data-name="矩形 2" class="cls-2" d="M960,517h48v35H960V517Z" /></g>
          <g id="D12"><path id="D12" data-name="矩形 2" class="cls-2" d="M912,517h48v35H912V517Z" /></g>
          <g id="C14"><path id="C14" data-name="矩形 2" class="cls-2" d="M1008,412h48v35h-48V412Z" /></g>
          <g id="C13"><path id="C13" data-name="矩形 2" class="cls-2" d="M960,412h48v35H960V412Z" /></g>
          <g id="C12"><path id="C12" data-name="矩形 2" class="cls-2" d="M912,412h48v35H912V412Z" /></g>
          <g id="B14"><path id="B14" data-name="矩形 2" class="cls-2" d="M1008,326h48v35h-48V326Z" /></g>
          <g id="B13"><path id="B13" data-name="矩形 2" class="cls-2" d="M960,326h48v35H960V326Z" /></g>
          <g id="B12"><path id="B12" data-name="矩形 2" class="cls-2" d="M912,326h48v35H912V326Z" /></g>
          <g id="A14"><path id="A14" data-name="矩形 2" class="cls-2" d="M1008,236h48v35h-48V236Z" /></g>
          <g id="A13"><path id="A13" data-name="矩形 2" class="cls-2" d="M960,236h48v35H960V236Z" /></g>
          <g id="A12"><path id="A12" data-name="矩形 2" class="cls-2" d="M912,236h48v35H912V236Z" /></g>
          <g id="A6"><path id="A6" data-name="矩形 2" class="cls-2" d="M520,237h48v35H520V237Z" /></g>
          <g id="A10"><path id="A10" data-name="矩形 2" class="cls-2" d="M712,237h48v35H712V237Z" /></g>
          <g id="A9"><path id="A9" data-name="矩形 2" class="cls-2" d="M664,237h48v35H664V237Z" /></g>
          <g id="A8"><path id="A8" data-name="矩形 2" class="cls-2" d="M616,237h48v35H616V237Z" /></g>
          <g id="A7"><path id="A7" data-name="矩形 2" class="cls-2" d="M568,237h48v35H568V237Z" /></g>
          <g id="A11"><path id="A11" data-name="矩形 2" class="cls-2" d="M760.5,237.5h48v35h-48v-35Z" /></g>
          <g id="A5"><path id="A5" data-name="矩形 2" class="cls-2" d="M472.5,237.5h48v35h-48v-35Z" /></g>
          <g id="B6"><path id="B6" data-name="矩形 2" class="cls-2" d="M521,325h48v35H521V325Z" /></g>
          <g id="B10"><path id="B10" data-name="矩形 2" class="cls-2" d="M713,325h48v35H713V325Z" /></g>
          <g id="B9"><path id="B9" data-name="矩形 2" class="cls-2" d="M665,325h48v35H665V325Z" /></g>
          <g id="B8"><path id="B8" data-name="矩形 2" class="cls-2" d="M617,325h48v35H617V325Z" /></g>
          <g id="B7"><path id="B7" data-name="矩形 2" class="cls-2" d="M569,325h48v35H569V325Z" /></g>
          <g id="C6"><path id="C6" data-name="矩形 2" class="cls-2" d="M522,411h48v35H522V411Z" /></g>
          <g id="C10"><path id="C10" data-name="矩形 2" class="cls-2" d="M714,411h48v35H714V411Z" /></g>
          <g id="C9"><path id="C9" data-name="矩形 2" class="cls-2" d="M666,411h48v35H666V411Z" /></g>
          <g id="C8"><path id="C8" data-name="矩形 2" class="cls-2" d="M618,411h48v35H618V411Z" /></g>
          <g id="C7"><path id="C7" data-name="矩形 2" class="cls-2" d="M570,411h48v35H570V411Z" /></g>
          <g id="D6"><path id="D6" data-name="矩形 2" class="cls-2" d="M523,516h48v35H523V516Z" /></g>
          <g id="D10"><path id="D10" data-name="矩形 2" class="cls-2" d="M715,516h48v35H715V516Z" /></g>
          <g id="D9"><path id="D9" data-name="矩形 2" class="cls-2" d="M667,516h48v35H667V516Z" /></g>
          <g id="D8"><path id="D8" data-name="矩形 2" class="cls-2" d="M619,516h48v35H619V516Z" /></g>
          <g id="D7"><path id="D7" data-name="矩形 2" class="cls-2" d="M571,516h48v35H571V516Z" /></g>
          <g id="E6">
            <path id="E6" data-name="矩形 2" class="cls-2" d="M522,621h48v35H522V621Z" style="fill: blue" />
          </g>
          <g id="E10">
            <path id="E10" data-name="矩形 2" class="cls-2" d="M714,621h48v35H714V621Z" style="fill: blue" />
          </g>
          <g id="E9">
            <path id="E9" data-name="矩形 2" class="cls-2" d="M666,621h48v35H666V621Z" style="fill: blue" />
          </g>
          <g id="E8">
            <path id="E8" data-name="矩形 2" class="cls-2" d="M618,621h48v35H618V621Z" style="fill: blue" />
          </g>
          <g id="E7">
            <path id="E7" data-name="矩形 2" class="cls-2" d="M570,621h48v35H570V621Z" style="fill: blue" />
          </g>
          <rect width="50" height="30" x="85%" y="69%" style="fill: blue; stroke-width: 1; stroke: black" />
          <text x="90%" y="72%" font-weight="bold">First-class seat</text>
          <rect width="50" height="30" x="85%" y="76%" style="fill: #00a61f; stroke-width: 1; stroke: black" />
          <text x="90%" y="79%" font-weight="bold">Normal seat</text>
          <rect width="50" height="30" x="85%" y="83%" style="fill: gray; stroke-width: 1; stroke: black" />
          <text x="90%" y="86%" font-weight="bold">Selected By You</text>
          <rect width="50" height="30" x="85%" y="90%" style="fill: red; stroke-width: 1; stroke: black" />
          <text x="90%" y="93%" font-weight="bold">Occupied</text>
        </svg>
      </div>`);

    SelectedSeatarr = [];
    Normalseat = 0;
    VIPseat = 0;
    seatPrice = 0;

    $('#SeatPrice').val(seatPrice);
    $('#TotalPrice').val(seatPrice + ticketPrice);
    $('select#film').val('original');
    //console.log(Date.parse($('#date').val()));
  });

  $('#film').on('change', function () {
    $('#seatMap').html(`<svg
          id="SeatMap"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1280 720"
          style="top: 0; left: 0; height: 100%; width: 100%">
          <defs>
            <style>
              .cls-1 {
                fill: silver;
              }

              .cls-1,
              .cls-2 {
                stroke: #000;
                stroke-width: 1px;
                fill-rule: evenodd;
              }

              .cls-2 {
                fill: #00a61f;
              }
            </style>
          </defs>

          <path id="矩形_3" data-name="矩形 3" class="cls-1" d="M-17-16H1325V759H-17V-16Z" />
          <image
            id="screen"
            x="178"
            y="99"
            width="909"
            height="17"
            xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAA40AAAARCAYAAAB5GEmcAAABMklEQVR4nO3d3WrDMAwGUGfs/V85IwMz41mx3W2sKufclCaKDLkpX5Wfo5RyFgAAABh4c1IAAACICI0AAACEhEYAAABCQiMAAAChd6cGgEzO8+v5bcdxfH6/PlttTa0rwfa+30qf3qxud10AeCYmjQCkUYPWFbL64FX1NaXb1tfOguCoz27dbN1RXwB4FkIjAOnchcAd9fidPu2+1bqeySIAmQiNAKQUBcdeOwGc1QEA3wmNAKTx08niI641VtZZrQOAbDwIB4BU+nsZ7+5L/A2rvU0qAXhVJo0ApLF6SepfWp0mmjoC8CqERgBSuQuO0RNJH31AzqhPu2+1DgAyu37R/BUKQAo1jM3ecbj6nsbo+Fmf3bpo3dX+APCfhEYAAABCLk8FAAAgJDQCAAAwVkr5ACXYnxgxRyKxAAAAAElFTkSuQmCC" />

          <text x="11%" y="36%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">A</text>
          <text x="11%" y="48%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">B</text>
          <text x="11%" y="60%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">C</text>
          <text x="11%" y="75%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">D</text>
          <text x="11%" y="90%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">E</text>
          <text x="16%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">1</text>
          <text x="20%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">2</text>
          <text x="24%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">3</text>
          <text x="28%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">4</text>
          <text x="38%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">5</text>
          <text x="42%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">6</text>
          <text x="46%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">7</text>
          <text x="49.5%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">8</text>
          <text x="53%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">9</text>
          <text x="56%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">10</text>
          <text x="60%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">11</text>
          <text x="72%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">12</text>
          <text x="76%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">13</text>
          <text x="79.5%" y="25%" width="100" height="100" fill="black" font-size="140%" font-weight="bold">14</text>
          <g id="A1">
            <path id="A1" data-name="矩形 2" class="cls-2" d="M194,236h48v35H194V236Z" />
          </g>
          <g id="A4">
            <path id="A4" data-name="矩形 2" class="cls-2" d="M338,236h48v35H338V236Z" />
          </g>
          <g id="A3">
            <path id="A3" data-name="矩形 2" class="cls-2" d="M290,236h48v35H290V236Z" />
          </g>
          <g id="A2">
            <path id="A2" data-name="矩形 2" class="cls-2" d="M242,236h48v35H242V236Z" />
          </g>
          <g id="B1">
            <path id="B1" data-name="矩形 2" class="cls-2" d="M194,324h48v35H194V324Z" />
          </g>
          <g id="B4">
            <path id="B4" data-name="矩形 2" class="cls-2" d="M338,324h48v35H338V324Z" />
          </g>
          <g id="B3">
            <path id="B3" data-name="矩形 2" class="cls-2" d="M290,324h48v35H290V324Z" />
          </g>
          <g id="B2">
            <g id="B2"><path id="B2" data-name="矩形 2" class="cls-2" d="M242,324h48v35H242V324Z" /></g>
          </g>
          <g id="C1">
            <path id="C1" data-name="矩形 2" class="cls-2" d="M194,411h48v35H194V411Z" />
          </g>
          <g id="C4">
            <path id="C4" data-name="矩形 2" class="cls-2" d="M338,411h48v35H338V411Z" />
          </g>
          <g id="C3">
            <path id="C3" data-name="矩形 2" class="cls-2" d="M290,411h48v35H290V411Z" />
          </g>
          <g id="C2">
            <path id="C2" data-name="矩形 2" class="cls-2" d="M242,411h48v35H242V411Z" />
          </g>
          <g id="D1">
            <path id="D1" data-name="矩形 2" class="cls-2" d="M194,516h48v35H194V516Z" />
          </g>
          <g id="D4"><path id="D4" data-name="矩形 2" class="cls-2" d="M338,516h48v35H338V516Z" /></g>
          <g id="D3"><path id="D3" data-name="矩形 2" class="cls-2" d="M290,516h48v35H290V516Z" /></g>
          <g id="D2"><path id="D2" data-name="矩形 2" class="cls-2" d="M242,516h48v35H242V516Z" /></g>
          <g id="D14"><path id="D14" data-name="矩形 2" class="cls-2" d="M1008,517h48v35h-48V517Z" /></g>
          <g id="D13"><path id="D13" data-name="矩形 2" class="cls-2" d="M960,517h48v35H960V517Z" /></g>
          <g id="D12"><path id="D12" data-name="矩形 2" class="cls-2" d="M912,517h48v35H912V517Z" /></g>
          <g id="C14"><path id="C14" data-name="矩形 2" class="cls-2" d="M1008,412h48v35h-48V412Z" /></g>
          <g id="C13"><path id="C13" data-name="矩形 2" class="cls-2" d="M960,412h48v35H960V412Z" /></g>
          <g id="C12"><path id="C12" data-name="矩形 2" class="cls-2" d="M912,412h48v35H912V412Z" /></g>
          <g id="B14"><path id="B14" data-name="矩形 2" class="cls-2" d="M1008,326h48v35h-48V326Z" /></g>
          <g id="B13"><path id="B13" data-name="矩形 2" class="cls-2" d="M960,326h48v35H960V326Z" /></g>
          <g id="B12"><path id="B12" data-name="矩形 2" class="cls-2" d="M912,326h48v35H912V326Z" /></g>
          <g id="A14"><path id="A14" data-name="矩形 2" class="cls-2" d="M1008,236h48v35h-48V236Z" /></g>
          <g id="A13"><path id="A13" data-name="矩形 2" class="cls-2" d="M960,236h48v35H960V236Z" /></g>
          <g id="A12"><path id="A12" data-name="矩形 2" class="cls-2" d="M912,236h48v35H912V236Z" /></g>
          <g id="A6"><path id="A6" data-name="矩形 2" class="cls-2" d="M520,237h48v35H520V237Z" /></g>
          <g id="A10"><path id="A10" data-name="矩形 2" class="cls-2" d="M712,237h48v35H712V237Z" /></g>
          <g id="A9"><path id="A9" data-name="矩形 2" class="cls-2" d="M664,237h48v35H664V237Z" /></g>
          <g id="A8"><path id="A8" data-name="矩形 2" class="cls-2" d="M616,237h48v35H616V237Z" /></g>
          <g id="A7"><path id="A7" data-name="矩形 2" class="cls-2" d="M568,237h48v35H568V237Z" /></g>
          <g id="A11"><path id="A11" data-name="矩形 2" class="cls-2" d="M760.5,237.5h48v35h-48v-35Z" /></g>
          <g id="A5"><path id="A5" data-name="矩形 2" class="cls-2" d="M472.5,237.5h48v35h-48v-35Z" /></g>
          <g id="B6"><path id="B6" data-name="矩形 2" class="cls-2" d="M521,325h48v35H521V325Z" /></g>
          <g id="B10"><path id="B10" data-name="矩形 2" class="cls-2" d="M713,325h48v35H713V325Z" /></g>
          <g id="B9"><path id="B9" data-name="矩形 2" class="cls-2" d="M665,325h48v35H665V325Z" /></g>
          <g id="B8"><path id="B8" data-name="矩形 2" class="cls-2" d="M617,325h48v35H617V325Z" /></g>
          <g id="B7"><path id="B7" data-name="矩形 2" class="cls-2" d="M569,325h48v35H569V325Z" /></g>
          <g id="C6"><path id="C6" data-name="矩形 2" class="cls-2" d="M522,411h48v35H522V411Z" /></g>
          <g id="C10"><path id="C10" data-name="矩形 2" class="cls-2" d="M714,411h48v35H714V411Z" /></g>
          <g id="C9"><path id="C9" data-name="矩形 2" class="cls-2" d="M666,411h48v35H666V411Z" /></g>
          <g id="C8"><path id="C8" data-name="矩形 2" class="cls-2" d="M618,411h48v35H618V411Z" /></g>
          <g id="C7"><path id="C7" data-name="矩形 2" class="cls-2" d="M570,411h48v35H570V411Z" /></g>
          <g id="D6"><path id="D6" data-name="矩形 2" class="cls-2" d="M523,516h48v35H523V516Z" /></g>
          <g id="D10"><path id="D10" data-name="矩形 2" class="cls-2" d="M715,516h48v35H715V516Z" /></g>
          <g id="D9"><path id="D9" data-name="矩形 2" class="cls-2" d="M667,516h48v35H667V516Z" /></g>
          <g id="D8"><path id="D8" data-name="矩形 2" class="cls-2" d="M619,516h48v35H619V516Z" /></g>
          <g id="D7"><path id="D7" data-name="矩形 2" class="cls-2" d="M571,516h48v35H571V516Z" /></g>
          <g id="E6">
            <path id="E6" data-name="矩形 2" class="cls-2" d="M522,621h48v35H522V621Z" style="fill: blue" />
          </g>
          <g id="E10">
            <path id="E10" data-name="矩形 2" class="cls-2" d="M714,621h48v35H714V621Z" style="fill: blue" />
          </g>
          <g id="E9">
            <path id="E9" data-name="矩形 2" class="cls-2" d="M666,621h48v35H666V621Z" style="fill: blue" />
          </g>
          <g id="E8">
            <path id="E8" data-name="矩形 2" class="cls-2" d="M618,621h48v35H618V621Z" style="fill: blue" />
          </g>
          <g id="E7">
            <path id="E7" data-name="矩形 2" class="cls-2" d="M570,621h48v35H570V621Z" style="fill: blue" />
          </g>
          <rect width="50" height="30" x="85%" y="69%" style="fill: blue; stroke-width: 1; stroke: black" />
          <text x="90%" y="72%" font-weight="bold">First-class seat</text>
          <rect width="50" height="30" x="85%" y="76%" style="fill: #00a61f; stroke-width: 1; stroke: black" />
          <text x="90%" y="79%" font-weight="bold">Normal seat</text>
          <rect width="50" height="30" x="85%" y="83%" style="fill: gray; stroke-width: 1; stroke: black" />
          <text x="90%" y="86%" font-weight="bold">Selected By You</text>
          <rect width="50" height="30" x="85%" y="90%" style="fill: red; stroke-width: 1; stroke: black" />
          <text x="90%" y="93%" font-weight="bold">Occupied</text>
        </svg>
      </div>`);

    var seatarr = [];
    const formData = new FormData();
    formData.append('filmName', $('select#film').val());
    formData.append('Date', $('#date').val());
    console.log(formData);
    $.ajax({
      url: '/pay/seat',
      method: 'POST',
      data: formData,
      async: false,
      processData: false,
      contentType: false,
      success: async function (response) {
        console.log(response.seat.seat);
        response.seat.seat.forEach((ele, i) => {
          var seatString = ele.seat.toString();
          var seatNo = seatString.split(',');
          seatNo.forEach((ele) => {
            seatarr.push(ele);
          });
        });
        console.log(seatarr);
        seatarr.forEach((ele) => {
          console.log(ele);
          $('#' + ele)
            .children('path')
            .css('fill', 'red');
        });
      },
      error: function (error) {
        console.log('fail');
      },
    });
  });
  //$('#seatMap').append();
  var Overallchoosen = '';

  var ticketPrice = 0;
  var ticketCount = 0;
  var kidCount = 0;
  var AdultCount = 0;
  var StudentCount = 0;

  $(document).on('touch click', '#SeatMap g *', function (e) {
    e.preventDefault();
    if ($('#date').val() == '') {
      alert('Please choose the Date you are watching film.');
    } else {
      // reset active seat
      //$(this).parents('svg').find('path').removeClass('active');
      var choosenSeat = $(this).parent('g').attr('id');
      console.log(choosenSeat);
      var index = SelectedSeatarr.indexOf(choosenSeat);

      // if exist in array, pop ; if not exist, push
      if (SelectedSeatarr.includes(choosenSeat)) {
        SelectedSeatarr.splice(index, 1);
      } else {
        SelectedSeatarr.push(choosenSeat);
      }
      console.log(SelectedSeatarr);
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
      totalPrice = seatPrice + ticketPrice;
      $('#TotalPrice').val(totalPrice);
      //console.log($(this).parent('g').children('path').css('fill'));
      //console.log(choosenSeat);
      //console.log(Normalseat);
      //console.log(VIPseat);
    }
  });
  $('#KidCount').on('change', function () {
    kidCount = parseInt($('#KidCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    totalPrice = seatPrice + ticketPrice;
    $('#TotalPrice').val(totalPrice);
  });
  $('#AdultCount').on('change', function () {
    AdultCount = parseInt($('#AdultCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    totalPrice = seatPrice + ticketPrice;
    $('#TotalPrice').val(totalPrice);
  });
  $('#StudentCount').on('change', function () {
    StudentCount = parseInt($('#StudentCount').val());
    ticketCount = kidCount + AdultCount + StudentCount;
    $('#Ticket').val(ticketCount);
    ticketPrice = kidCount * 10 + AdultCount * 25 + StudentCount * 15;
    $('#TicketPrice').val(ticketPrice);
    totalPrice = seatPrice + ticketPrice;
    $('#TotalPrice').val(totalPrice);
  });
  var discount = false;
  var filmName = $('select#film').val();
  //console.log(film == 'original');
  $('#film').on('change', function () {
    filmName = $('select#film').val();
    console.log(filmName);
  });

  $('#Confirm').on('click', async function () {
    if (filmName == 'original') {
      alert('Please select a film');
    } else {
      if (
        Date.parse($('#date').val()) >= Date.parse('2024-12-1') &&
        Date.parse($('#date').val()) <= Date.parse('2024-12-31')
      ) {
        totalPrice = totalPrice * 0.8;
        $('#TotalPrice').val(totalPrice);
        discount = true;
      }
      if ($('#TicketPrice').val() == 0 || $('#SeatPrice').val() == 0) {
        alert('Please choose identities and Seat.');
      } else if (SelectedSeatarr.length != ticketCount) {
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
            totalPrice: totalPrice,
            filmName: filmName,
            Seat: SelectedSeatarr,
            Date: $('#date').val(),
            discount: discount,
          })
        );
        window.location.replace('./Payment.html');
      }
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
