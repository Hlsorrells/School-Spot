/* eslint-disable no-mixed-spaces-and-tabs */
$(document).ready(function () {
	console.log("loaded");

	var date_input = $("input[name=\"date\"]"); //our date input has the name "date"
	
	var options = {
		format: "yyyy/mm/dd",
		todayHighlight: true,
		autoclose: true,
	};
	date_input.datepicker(options);

	// Getting references to our form and input
	var newTaskForm = $(".newTaskForm");
	var taskText = $("#taskText");
	var dateInput = $("#date");

	// When the signup button is clicked, we create taskData
	newTaskForm.on("submit", function (event) {
		console.log(dateInput.val());

		event.preventDefault();
		var taskData = {
			taskDetails: taskText.val().trim(),
			dueDate: dateInput.val(),
		};

		console.log(taskData);

		// If we have a text and a date, run the postTask function
		postTask(taskData.taskDetails, taskData.dueDate);
		dateInput.val("");
		taskText.val("");
	});

	// Does a post to the newTask route If successful, we are refreshes page
	// Otherwise we log any errors
	function postTask(text, date) {
		console.log(text, date);

		$.post("/api/addTask", {
			taskDetail: text,
			dueDate: date,
		}).then(function (data) {
			console.log(data);
			window.location.reload();
			// If there's an error, handle it by throwing up a bootstrap alert
		});
		// .catch(handleLoginErr);
	}

	$(".enterGrade").on("click", function (event) {
		var id = $(this).data("id");
		console.log(id);
		// if data.name === id {
			//store it as taskGrade
		// console.log($(this).data("name"))
		var taskGrade = $(`.gradeDiv [data-value = ${id}]`).val().trim()
		console.log($(`.gradeDiv [data-value = ${id}]`).val().trim())
		
		$.ajax("/api/gradeTask/" + id + "/" + taskGrade, {
			type: "PUT",
		}).then(function () {
			console.log("Grade Entered!");
			// Reload the page to get the updated list
			location.reload();
		});
	});

	$(".remove").on("click", function (event) {
		var id = $(this).data("name");
		console.log(id);

		$.ajax("/api/deleteTask/" + id, {
			type: "DELETE",
		}).then(function () {
			console.log("Task Deleted!");
			// Reload the page to get the updated list
			location.reload();
		});
	});

	function handleLoginErr(err) {
		$("#alert .msg").text(err.responseJSON);
		$("#alert").fadeIn(500);
	}
});
