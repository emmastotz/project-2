$(document).ready(function() {
  $(function () {
    $(".student-schedule").hide();
    $(".classes-display").hide();
  
    $(".subject-btn").on("click", function(event) {
      $("#classes-list").empty();
      var id = $(this).data("id");
      var subjectName = $(this).data("name").trim().replace(/\s/g, '');
  
      $.ajax("/subject/" + id, {
        type: "GET"
      }).then(function(result) {
        $(".classes-display").show();
        
        for (var i in result){
          let className = result[i].class_name;
          let classDiv = $("<li>");
          classDiv.addClass("list-group-item");
          classDiv.text(className);
  
          let classId = result[i].id;
          let btn = $("<button>");
          btn.attr("data-toggle", "dropdown");

          btn.addClass("btn btn-secondary btn-sm dropdown-toggle view-times");
          btn.attr("type", "button");
          btn.attr("id","dropdownMenuButton");
          btn.attr("aria-haspopup", "true");
          btn.attr("aria-expanded","false");
          btn.text("View Times");
          btn.attr("data-id", classId);
  
          $("#classes-list").append(classDiv);
          $("#classes-list").append(btn);
        };
      }).fail(function(err){
        console.log(err);
      });
    });
  
    $(document).on("click", ".view-times", function() {
      // $(".student-schedule").show();
      var id = $(this).data("id");
      console.log(id);
  
      $.ajax("/class/" + id, {
        type: "GET"
      }).then(function(res) {
        console.log(res);
        for (var i in res){
          console.log(res[i]);
          let dropdownMenu = $("<div>");
          dropdownMenu.addClass("dropdown-menu");
          dropdownMenu.attr("aria-labelledby","dropdownMenuButton")
          $("#classes-list").append(dropdownMenu);
  
          let a = $("<a>");
          a.addClass("dropdown-item");
          let dayCode = res[i].day_code;
          let startTime = res[i].start_time;
          let endTime = res[i].end_time;
          let time = dayCode + ": " + startTime + " - " + endTime;
          console.log(dayCode);
          console.log(startTime);
          console.log(endTime);
          console.log(time);
          $(a).text(time);
  
          $(".dropdown-menu").append(a);
  
        };
      }).fail(function(err){
        console.log(err);
      });
    });
    // $(".not-in-schedule").on("click", function(event) {
    //   var id = $(this).data("id");
    //   console.log(id);
  
    //   var scheduleState = {
    //     inSchedule: true
    //   };
  
    //   $.ajax("/classes/update/" + id, {
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
  
    //   $.ajax("/classes/delete/" + id, {
    //     type: "DELETE"
    //   }).then(function () {
    //     console.log("Deleted burger #", id);
    //     location.reload();
    //   }).fail(function(err){
    //     console.log("Error: " + err);
    //   });
    // });
  });
});

