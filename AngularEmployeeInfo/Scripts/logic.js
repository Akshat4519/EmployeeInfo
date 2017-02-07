/// <reference path="jquery-3.1.1.min.js" />
var infoDisplayed = 0;
var toRefresh = 0;
var finalRowCount = 0;
$(document).ready(function () {
    this.finalRowCount = $('#tableEmployees').length - 1;

    $("#btnAddEmployee0").bind('click', addEmployee);
});


function displayInfo() {
    $("#lblEmployees").hide();
    $("#registration").slideDown();
    show();
}

function addEmployee(rowCount) {
    $('#inputInfo').html("");

    var isValid = validateAddInput();

    if (isValid) {
        rowCount = finalRowCount;
        var table = document.getElementById("tableEmployees");
        var currentRow = rowCount - 1;
        var row = table.insertRow(currentRow);
        row.style.verticalAlign = "Center";
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.id = "Cell" + currentRow + "1";
        cell2.id = "Cell" + currentRow + "2";
        cell3.id = "Cell" + currentRow + "3";
        cell4.id = "Cell" + currentRow + "4";

        var cellIdId = "Cell" + currentRow + "1";
        var cellNameId = "Cell" + currentRow + "2";
        var cellSalaryId = "Cell" + currentRow + "3";
        var cellModifyId = "Cell" + currentRow + "4";
        var btnEditId = "btnEdit" + currentRow;

        $("#" + cellNameId).html($("#newName :input").val());
        $("#newName :input").val("");
        $("#" + cellSalaryId).html($("#newSalary :input").val());
        $("#newSalary :input").val("");

        var btnEdit = document.createElement("BUTTON");
        btnEdit.id = "btnEdit" + currentRow;
        btnEdit.style.height = "25px";
        btnEdit.style.width = "55px";
        btnEdit.style.marginRight = "10px";
        btnEdit.onclick = function () { editRow(currentRow) };
        var t = document.createTextNode("Edit");
        btnEdit.appendChild(t);
        cell4.appendChild(btnEdit);

        var btnDelete = document.createElement("BUTTON");
        btnDelete.id = "btnDelete" + currentRow;
        btnDelete.style.height = "25px";
        btnDelete.style.width = "55px";
        btnDelete.onclick = function () { deleteRow(currentRow) };
        var t = document.createTextNode("Delete");
        btnDelete.appendChild(t);
        cell4.appendChild(btnDelete);

        finalRowCount++;

        var emp = { 'Name': $("#" + cellNameId).html(), 'Salary': $("#" + cellSalaryId).html() };

        $.ajax({
            type: "POST",
            url: "http://localhost:50836/Service1.svc/AddData",
            data: JSON.stringify(emp),
            processData: true,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var newId = data.all['0'].textContent;
                var cellId_previous = "Cell" + currentRow + "1";
                $('#' + cellId_previous).html(newId);

                $('#inputInfo').css("color", "green");
                $('#inputInfo').text("* Employee Info added.. *");
            },
            error: addFailed
        })
    }
}

function addFailed(msg) {
    $('#inputInfo').css("color", "red");
    $('#inputInfo').text("Error adding data: " + msg.status + " - " + msg.statusText);
    $("#inputInfo").show();
}

function validateAddInput() {
    var name = $('#newName :input').val();
    var salary = $('#newSalary :input').val();

    $('#inputInfo').css("color", "red");
    if (name.length == 0) {
        $('#inputInfo').text("* Please enter the name of the employee *");
        $("#newName :input").focus();
        $("#inputInfo").show();
        return false;
    }
    else if (!name.match(/^[a-zA-Z ]+$/)) {
        $('#inputInfo').text("* Please use alphabets only for employees' name *");
        $("#newName :input").focus();
        $("#inputInfo").show();
        return false;
    }
    else if (salary.length == 0) {
        $('#inputInfo').text("* Please enter the salary of the employee *");
        $("#newName :input").focus();
        $("#inputInfo").show();
        return false;
    }
    else if (!salary.match(/^[0-9]+$/)) {
        $('#inputInfo').text("* Please use numbers only for employees' salary *");
        $("#newName :input").focus();
        $("#inputInfo").show();
        return false;
    }
    else
        return true;
}

function show() {
    if (infoDisplayed == 0 || toRefresh == 1) {
        $.ajax({
            type: "GET",
            url: "http://localhost:50836/Service1.svc/GETDATA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                var table = document.getElementById("tableEmployees");

                $.each(msg, function (index, element) {
                    var currentRow = table.rows.length - 1;
                    var row = table.insertRow(currentRow);
                    row.style.verticalAlign = "Center";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    cell1.id = "Cell" + currentRow + "1";
                    cell1.innerHTML = element.Id;
                    cell2.id = "Cell" + currentRow + "2";
                    cell2.innerHTML = element.Name;
                    cell3.id = "Cell" + currentRow + "3";
                    cell3.innerHTML = element.Salary;
                    cell4.id = "Cell" + currentRow + "4";

                    var btnEdit = document.createElement("BUTTON");
                    btnEdit.id = "btnEdit" + currentRow;
                    btnEdit.style.height = "25px";
                    btnEdit.style.width = "55px";
                    btnEdit.style.marginRight = "10px";
                    btnEdit.onclick = function () { editRow(currentRow) };
                    var t = document.createTextNode("Edit");
                    btnEdit.appendChild(t);
                    cell4.appendChild(btnEdit);

                    var btnDelete = document.createElement("BUTTON");
                    btnDelete.id = "btnDelete" + currentRow;
                    btnDelete.style.height = "25px";
                    btnDelete.style.width = "55px";
                    btnDelete.onclick = function () { deleteRow(currentRow) };
                    var t = document.createTextNode("Delete");
                    btnDelete.appendChild(t);
                    cell4.appendChild(btnDelete);
                });
                finalRowCount = table.rows.length;
                $('#btnAddEmployee0').attr('id', "btnAddEmployee" + finalRowCount);
                $("btnAddEmployee" + finalRowCount).bind('click', function () { addEmployee(finalRowCount) });
            },
            error: function (msg) {
                alert("Error: " + msg.status + " - " + msg.statusText);
            }
        });
        infoDisplayed = 1;
        toRefresh = 0;
    }
}

function deleteRow(rowNo) {
    $('#inputInfo').html("");

    if (confirm("Are you sure you want to delete this row?")) {
        var cellIdDelete = $("#Cell" + rowNo + "1");

        var empId = cellIdDelete[0].innerHTML;

        $.ajax({
            type: "POST",
            url: "http://localhost:50836/Service1.svc/DeleteData",
            data: JSON.stringify(empId),
            processData: true,
            contentType: 'application/json; charset=utf-8',
            success: deleteSucceeded,
            error: deleteFailed
        })
    }
}

function deleteSucceeded(data, status, jqXHR) {
    $('#inputInfo').css("color", "green");

    $("#tableEmployees tr").not(':last').remove();

    toRefresh = 1;
    show();

    $('#inputInfo').text("* Employee Info deleted.. *");
    $("#inputInfo").show();
}

function deleteFailed(msg) {
    $('#inputInfo').css("color", "red");
    $('#inputInfo').text("Error deleting data: " + msg.status + " - " + msg.statusText);
    $("#inputInfo").show();
}

function editRow(rowNo) {
    $('#inputInfo').html("");

    var cellNameId = "Cell" + rowNo + "2";
    var cellSalaryId = "Cell" + rowNo + "3";
    var cellModifyId = "Cell" + rowNo + "4";
    var btnEditId = "btnEdit" + rowNo;
    var cellName = document.getElementById(cellNameId);
    var cellSalary = document.getElementById(cellSalaryId);
    var btnEdit = document.getElementById(btnEditId);
    var cellModify = document.getElementById(cellModifyId);

    var txtName = document.createElement("input");
    txtName.type = "text";
    txtName.value = cellName.innerHTML;
    cellName.innerHTML = "";
    cellName.appendChild(txtName);

    var txtSalary = document.createElement("input");
    txtSalary.type = "text";
    txtSalary.value = cellSalary.innerHTML;
    cellSalary.innerHTML = "";
    cellSalary.appendChild(txtSalary);

    btnEdit.onclick = function () { saveRow(rowNo) };
    var t = document.createTextNode("Save");
    btnEdit.removeChild(btnEdit.childNodes[0]);
    btnEdit.appendChild(t);

    $("#btnDelete" + rowNo).hide();
}

function saveRow(rowNo) {
    $('#inputInfo').html("");

    var cellIdId = "Cell" + rowNo + "1";
    var cellNameId = "Cell" + rowNo + "2";
    var cellSalaryId = "Cell" + rowNo + "3";
    var cellModifyId = "Cell" + rowNo + "4";
    var btnEditId = "btnEdit" + rowNo;

    var cellId = document.getElementById(cellIdId);
    var cellName = document.getElementById(cellNameId);
    var cellSalary = document.getElementById(cellSalaryId);
    var btnEdit = document.getElementById(btnEditId);
    var cellModify = document.getElementById(cellModifyId);

    var valName = cellName.childNodes[0].value;

    var valSalary = cellSalary.childNodes[0].value;

    cellName.removeChild(cellName.childNodes[0]);
    cellName.innerHTML = valName;

    cellSalary.removeChild(cellSalary.childNodes[0]);
    cellSalary.innerHTML = valSalary;

    btnEdit.onclick = function () { editRow(rowNo) };
    var t = document.createTextNode("Edit");
    btnEdit.removeChild(btnEdit.childNodes[0]);
    btnEdit.appendChild(t);

    var emp = { 'Id': cellId.innerHTML, 'Name': valName, 'Salary': valSalary };

    $.ajax({
        type: "POST",
        url: "http://localhost:50836/Service1.svc/SaveData",
        data: JSON.stringify(emp),
        processData: true,
        contentType: 'application/json; charset=utf-8',
        success: saveSucceeded,
        error: saveFailed
    })

    $("#btnDelete" + rowNo).show();
}

function saveSucceeded(data, status, jqXHR) {
    $('#inputInfo').css("color", "green");
    $('#inputInfo').text("* Employee Info saved.. *");
    $("#inputInfo").show();
}

function saveFailed(msg) {
    $('#inputInfo').css("color", "red");
    $('#inputInfo').text("Error saving data: " + msg.status + " - " + msg.statusText);
    $("#inputInfo").show();
}

