/// <reference path="jquery-3.1.1.min.js" />
var infoDisplayed = 0;
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
    //cell1.innerHTML = element.Id;
    cell2.id = "Cell" + currentRow + "2";
    //cell2.innerHTML = element.Name;
    cell3.id = "Cell" + currentRow + "3";
    //cell3.innerHTML = element.Salary;
    cell4.id = "Cell" + currentRow + "4";

    var cellIdId = "Cell" + currentRow + "1";
    var cellNameId = "Cell" + currentRow + "2";
    var cellSalaryId = "Cell" + currentRow + "3";
    var cellModifyId = "Cell" + currentRow + "4";
    var btnEditId = "btnEdit" + currentRow;

    //var cellId = document.getElementById(cellIdId);
    //var cellName = document.getElementById(cellNameId);
    //var cellSalary = document.getElementById(cellSalaryId);
    //var btnEdit = document.getElementById(btnEditId);
    //var cellModify = document.getElementById(cellModifyId);

    //var valId = $("#newId").val();
    //$("#newId").removeChild($("#newId").childNodes[0]);
    

    $("#cellNameId").innerHTML = $("#newName").val();
    $("#newName").text = "";
    $("#cellSalaryId").innerHTML = $("#newSalary").val();
    $("#newSalary").text = "";

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
    btnDelete.style.height = "25px";
    btnDelete.style.width = "55px";
    var t = document.createTextNode("Delete");
    btnDelete.appendChild(t);
    cell4.appendChild(btnDelete);
}

function show() {
    if (infoDisplayed == 0) {
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
                    btnDelete.style.height = "25px";
                    btnDelete.style.width = "55px";
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
    }
}

function editRow(rowNo) {
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
}

function saveRow(rowNo) {
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
    cellName.removeChild(cellName.childNodes[0]);
    cellName.innerHTML = valName;

    var valSalary = cellSalary.childNodes[0].value;
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
        dataType: "json",
        data: JSON.stringify(emp),
        processData: true,
        contentType: 'application/json; charset=utf-8',
        success: function (data, status, jqXHR) {
            alert("Employee data modified successfully!");
        },
        error: function (msg) {
            alert("Error saving data: " + msg.status + " - " + msg.statusText);
        }
    })
}