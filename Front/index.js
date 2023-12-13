
$("#logoutBtn").click(function () {
    console.log("Logout button clicked");

    deleteCookie('token');
    checkLoginStatus();
});

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}


function checkLoginStatus() {
    let studentsContainer = document.getElementById('studentsContainer');

    studentsContainer.innerHTML = '';
    var jwtCookie = getCookie('token');
    if (jwtCookie) {
        $("#loginForm").hide();
        $("#addStudentForm").show();
        $("#getstudentsBtn").show();
        $("#getStudentByIdBtn").show();
        $("#studentIdInput").show();
        $("#logoutBtn").show()
    } else {
        $("#loginForm").show();
        $("#addStudentForm").hide();
        $("#getStudentByIdBtn").hide();
        $("#studentIdInput").hide();
        $("#getstudentsBtn").hide();
        $("#logoutBtn").hide()
    }
}


checkLoginStatus()


let lbtn = document.querySelector("#loginBtn");






lbtn.addEventListener('click', function (e) {
    e.preventDefault()
    let username = document.querySelector("#loginusername").value;
    let userpassword = document.querySelector("#loginPassword").value;

    if (!username || !userpassword) {
        console.error("Dont be empty");
        return;
    }
    var url = 'https://localhost:7251/api/account/signin'

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: userpassword
        }),
        success: function (data) {
            console.log(data)
            setCookie('token', data, 1);
            checkLoginStatus()
            document.querySelector("#loginusername").value = "";
            document.querySelector("#loginPassword").value = "";
        },
        error: function (error) {
            console.error("LOGIN ERROR", error);
            alert("Username or password wrong")
        }
    });


});

document.getElementById('addStudentBtn').addEventListener('click', function (e) {
    e.preventDefault();

        var studentName = document.getElementById('studentName').value;
        var studentAge = document.getElementById('studentAge').value;
        var studentSeriaNo = document.getElementById('studentSeriaNo').value;
        var studentScore = document.getElementById('studentScore').value;

        var studentData = {
            FullName: studentName,
            Age: studentAge,
            SeriaNo: studentSeriaNo,
            Score: studentScore
        };


        if (!studentName || !studentAge||! studentSeriaNo||!studentScore) {
            console.error("EMpty");
            return;
        }



        var jsonData = JSON.stringify(studentData);

        var url = 'https://localhost:7251/api/Student';


        var token = getCookie('token');

        if (token) {
            $.ajax({
                url: url,
                method: 'POST',
                headers: {
                    'Authorization': 'basic ' + token,
                    'Content-Type': 'application/json'
                },
                data: jsonData,
                success: function (data) {
                    alert("Student added");
                    document.getElementById('addStudentForm').reset();
                },
                error: function (error) {
                    alert('student dont added');
                    console.error("ERROR", error);
                }
            });
        } else {
            console.log("Token not.");
        }
});



document.getElementById('getstudentsBtn').addEventListener('click', function (e) {
    e.preventDefault();

    var token = getCookie('token');

    var url = 'https://localhost:7251/api/student';

    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'basic ' + token
        },
        success: function (data) {
            console.log(data)
            displayStudents(data)
        },
        error: function (error) {
            alert('enter username:john123 password:john123 for use methods')
            console.error("ERROR getStudents", error);
        }
    });
});



function displayStudents(students) {

    var studentsContainer = document.getElementById('studentsContainer');

    studentsContainer.innerHTML = '';

    students.forEach(function (student) {

        var studentElement = document.createElement('p');

        studentElement.textContent = 'Id:' + student.id +'FullName: ' + student.fullname + ', Age: ' + student.age + ', SeriaNo: ' + student.seriaNo +', Score: ' + student.score;
        studentsContainer.appendChild(studentElement);
    });
}


document.getElementById('getStudentByIdBtn').addEventListener('click', function (e) {
    e.preventDefault();

    var token = getCookie('token');
    var studentId = document.getElementById('studentIdInput').value; 

    if (!studentId) {
        alert("ID is required");
        return;
    }

    var url = 'https://localhost:7251/api/student/' + studentId; 

    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'basic ' + token
        },
        success: function (data) {
            console.log(data);
            displayStudents([data]);
        },
        error: function (error) {
            console.error("ERROR getStudentById", error);
            alert('Not Found');
        }
    });
});


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

