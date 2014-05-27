$(document).ready(function() {
  $('.myrobot').myRobot();
   $('.otherrobot').myRobot({
    'templates' : {
        'between' : '',
        'success' : '<span class="success">&#10003;</span>'
    }
   });
});
