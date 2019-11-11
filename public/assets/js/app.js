$(document).ready(function() {
  $(function () {
    $(".student-schedule").hide();
    $(".classes-display").hide();
  
    $(".subject-btn").on("click", function(event) {
      $("#classes-list").empty();
      let id = $(this).data("id");
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
          // btn.attr("data-toggle", "dropdown");

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
      let id = $(this).data("id");
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
  
          let aLink = $("<a>");
          aLink.addClass("dropdown-item");
          aLink.attr("data-id", res[i].id);
          let dayCode = res[i].day_code;
          let startTime = res[i].start_time;
          let endTime = res[i].end_time;
          let time = dayCode + ": " + startTime + " - " + endTime;
          console.log(dayCode);
          console.log(startTime);
          console.log(endTime);
          console.log(time);
          $(aLink).text(time);
  
          $(".dropdown-menu").append(aLink);
  
        };
      }).fail(function(err){
        console.log(err);
      });
    });

    $(document).on("click", ".dropdown-item", function(){
      // $(".student-schedule").show();
      let id = $(this).data("id");
      
      var scheduleState = {
        inSchedule: true
      };

      $.ajax("/classes/update/" + id, {
        type: "PUT",
        data: scheduleState
      }).then(function () {
        console.log("Updated class at id #: " + id);
        location.reload();
      }).success(function(res){
        $.ajax("/schedule/" + id, function() {
          type: "GET"
        }).then(function(){
          // append to timetable
          var appendToTimetable = function (day) {
            timetable.addEvent(res[i].subject_code, day, new Date(2015,7,17,startTimeArray[0],startTimeArray[1]), new Date(2015,7,17,endTimeArray[0],endTimeArray[1]));
          }
          
          //this is assuming we are only getting data with boolean = true
          for(var i in res) {
            if(res[i].inSchedule){
              //SPLITTING THE DATA IN THE TIMES SO WE CAN USE IT IN THE TIME TABLE
              var startTimeArray = res.start_time.split(":");
              var endTimeArray = res.end_time.split(":");
              if(res[i].day_code==="MWF"){
                appendToTimetable("Monday");
                appendToTimetable("Wednesday");
                appendToTimetable("Friday");

              } else if (res[i].day_code==="TR"){
                appendToTimetable("Tuesday");
                appendToTimetable("Thursday");

              }else if (res[i].day_code==="MW"){
                appendToTimetable("Monday");
                appendToTimetable("Wednesday")

              }else if (res[i].day_code==="W"){
                appendToTimetable("Wednesday");

              }else if(res[i].day_code==="T"){
                appendToTimetable("Tuesday")

              } else if(res[i].day_code==="R"){
                appendToTimetable("Thursday");
              }
            }
          }
        });
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

