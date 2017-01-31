var employeeApp = angular.module('employeeApp', []);

var infoDisplayed = 0;
function show() {
    if (infoDisplayed == 0) {
        $.ajax({
            type: "GET",
            url: "http://localhost:50836/Service1.svc/GETDATA",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //headers:{
            //    'Content-Type': 'application/json;charset=UTF-8',
            //    'Access-Control-Allow-Origin': '*',
            //    'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
            //    'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
            //    'Access-Control-Max-Age': '1728000'
            //    },
            success: function (msg) {
                var table = document.getElementById("tableEmployees");

                $.each(msg, function (index, element) {
                    var row = table.insertRow(table.rows.length - 1);
                    row.style.verticalAlign = "Center";
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    cell1.contentEditable = true;
                    //cell1.setAttribute('contentEditable', 'true');
                    cell1.innerHTML = element.Id;
                    cell1.setAttribute('contenteditable', 'true');
                    cell2.innerHTML = element.Name;
                    cell3.innerHTML = element.Salary;

                    var btnEdit = document.createElement("BUTTON");
                    btnEdit.style.height = "25px";
                    btnEdit.style.width = "55px";
                    btnEdit.style.marginRight = "10px";
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
            },
        error: function (msg) {
            alert("Error: " + msg.status + " - " + msg.statusText);
        }
    });
    infoDisplayed = 1;
}
}