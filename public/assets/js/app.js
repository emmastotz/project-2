$(document).ready(function() {
  $(function () {
    $(".student-schedule").hide();
    $(".classes-display").hide();
  
    $(".subject-btn").on("click", function(event) {
      $("#classes-list").empty();
      let id = $(this).data("id");
      var subjectName = $(this).data("name").trim().replace(/\s/g, '');
  
      $.ajax("/class/" + id, {
        type: "GET"
      }).then(function(result) {
        $(".classes-display").show();
        console.log(result);
        
        for (var i in result){
          let className = result[i].number_title;
          let startTime = result[i].start_time;
          let endTime = result[i].end_time;
          let dayCode = result[i].day_code;
          let idValue = result[i].id;
          let time = dayCode + ": " + startTime + " - " + endTime;
          let classDiv = $("<li>");
          classDiv.addClass("list-group-item");
          classDiv.append("<strong>" + className + "</strong>");
          classDiv.append("<br>");
          classDiv.append(time);

          let btn = $("<button>");
          btn.addClass("btn btn-primary btn-sm add-class");
          btn.attr("type","submit");
          btn.text("Add to Schedule");
          btn.attr("data-id",idValue);
  
          $("#classes-list").append(classDiv);
          $("#classes-list").append(btn);
        };
      }).fail(function(err){
        console.log(err);
      });
    });
// ====================================================
    $(document).on("click", ".add-class", function(){
      $(".student-schedule").show();
      let id = $(this).data("id");
      console.log(id);
      
      var scheduleState = {
        inSchedule: true
      };
      console.log(scheduleState);

      $.ajax("/classes/update/" + id, {
        type: "PUT",
        data: scheduleState
      }).done(function(res){
        console.log(res);
        $.ajax("/schedule/" + id, function() {
          type: "GET"
        }).then(function(){

          var appendToTimetable = function (day) {
            timetable.addEvent(res[i].subject_code, day, new Date(2015,7,17,startTimeArray[0],startTimeArray[1]), new Date(2015,7,17,endTimeArray[0],endTimeArray[1]));
          }
          
          //this is assuming we are only getting data with boolean = true
          for(var i in res) {
            if(res[i].inSchedule){
              //SPLITTING THE DATA IN THE TIMES SO WE CAN USE IT IN THE TIME TABLE
              var startTimeArray = res[i].start_time.split(":");
              var endTimeArray = res[i].end_time.split(":");
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

