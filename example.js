// Luke MacVicar
// luke_macvicar@student.uml.edu

$(document).ready(function() {

    $("#form").validate({
        errorPlacement: function(error, element) {
            var errorSpan = $("#err-" + element.attr("name"));
            errorSpan.html(error.text());
        },
        success: function(label, element) {
            $("#err-" + $(element).attr("name")).text("");
        },

        rules: {
            n1: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            n2: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            n3: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            n4: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },

        messages: {
            n1: {
                required: "Min Column is required",
                number: "Enter a valid number",
                range: "Must be between -50 and 50"
            },
            n2: {
                required: "Max Column is required",
                number: "Enter a valid number",
                range: "Must be between -50 and 50"
            },
            n3: {
                required: "Min Row is required",
                number: "Enter a valid number",
                range: "Must be between -50 and 50"
            },
            n4: {
                required: "Max Row is required",
                number: "Enter a valid number",
                range: "Must be between -50 and 50"
            }
        },

        submitHandler: function(form) {
            var minCol = parseInt($("#n1").val());
            var maxCol = parseInt($("#n2").val());
            var minRow = parseInt($("#n3").val());
            var maxRow = parseInt($("#n4").val());

            if (minCol > maxCol) {
                $("#result").text("Error: Min Column cannot be greater than Max Column").css("color", "red");
                return false;
            }
            if (minRow > maxRow) {
                $("#result").text("Error: Min Row cannot be greater than Max Row").css("color", "red");
                return false;
            }

            $("#result").text("");

            var cols = [];
            for (var c = minCol; c <= maxCol; c++) {
                cols.push(c);
            }
            var rows = [];
            for (var r = minRow; r <= maxRow; r++) {
                rows.push(r);
            }

            renderMultiplicationTableRange(rows, cols);
            return false;
        }
    });

    function renderMultiplicationTableRange(rows, cols) {
        var $container = $('#multiplicationTable');

        $container.html(''); 

        var table = document.createElement('table');
        table.className = 'mult-table';

        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');
        var empty = document.createElement('th');
        empty.textContent = '';
        headRow.appendChild(empty);

        for (var i = 0; i < cols.length; i++) {
            var th = document.createElement('th');
            th.textContent = cols[i];
            headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        for (var i = 0; i < rows.length; i++) {
            var rowVal = rows[i];
            var tr = document.createElement('tr');
            var rowHeader = document.createElement('th');
            rowHeader.textContent = rowVal;
            tr.appendChild(rowHeader);

            for (var j = 0; j < cols.length; j++) {
                var colVal = cols[j];
                var td = document.createElement('td');
                var prod = rowVal * colVal;
                td.textContent = prod;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        $container.append(table);
    }
});
