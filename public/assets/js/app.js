$(function () {
  $(".student-schedule").hide();
  $(".classes-display").hide();

  $(".subject-btn").on("click", function(event) {
    $("#classes-list").empty();
    var id = $(this).data("id");
    var subjectName = $(this).data("name").trim().replace(/\s/g, '');

    $.ajax("/" + id, {
      type: "GET"
    }).then(function(result) {
      $(".classes-display").show();
      $('.collapse').collapse('show');
      
      for (var i in result){
        console.log(result[i]);
        let className = result[i].class_name;
        let classDiv = $("<li>");
        classDiv.addClass("list-group-item");
        classDiv.text(className);

        let classId = result[i].id;
        let button = $("<button>");
        button.addClass("btn btn-secondary btn-sm add-class");
        button.text("Add to Schedule");
        button.attr("data-id", classId);

        $("#classes-list").append(classDiv);
        $("#classes-list").append(button);
      };
    }).fail(function(err){
      console.log(err);
    });
  });

  $(document).on("click", ".add-class", function() {
    $(".student-schedule").show();
    var id = $(this).data("id");
    console.log(id);

    // $.ajax("/" + id, {
    //   type: 
    // })
  });

  // $(".not-in-schedule").on("click", function(event) {
  //   var id = $(this).data("id");
  //   console.log(id);

  //   var scheduleState = {
  //     inSchedule: true
  //   };

  //   $.ajax("/api/classes/" + id, {
  //     type: "PUT",
  //     data: scheduleState
  //   }).then(function () {
  //     console.log("Added class #", id);
  //     location.reload();
  //   }).fail(function(err){
  //     console.log(err);
  //   });
  // });

  // $(".in-schedule").on("click", function (event) {
  //   var id = $(this).data("id");
  //   console.log(id);

  //   $.ajax("/api/classes/" + id, {
  //     type: "DELETE"
  //   }).then(function () {
  //     console.log("Deleted burger #", id);
  //     location.reload();
  //   }).fail(function(err){
  //     console.log("Error: " + err);
  //   });
  // });
});
