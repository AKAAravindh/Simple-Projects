// To hold user details

userDetails = {
    "max": { username: "max", email: "max@gmail.com", password: "max" },
    "maxwel": { username: "maxwel", email: "maxwel@gmail.com", password: "maxwel" }
}

// to store data in localStorage
function saveDetails() {
    if (userDetails) {
        localStorage.setItem("database", JSON.stringify(userDetails))
    }
}

// to fetch data from localStorage
function getDetails() {
    if (localStorage.getItem("database")) {
        userDetails = JSON.parse(localStorage.getItem("database"))
    }
}

// register
function register() {
    document.getElementById('rName').innerHTML = ""
    document.getElementById('rMail').innerHTML = ""
    document.getElementById('rPass1').innerHTML = ""
    document.getElementById('rPass2').innerHTML = ""

    let uname = rUname.value
    let mail = rEmail.value
    let pswd = rPswd.value
    let pswd2 = rPswd2.value
    uname = uname.trim()
    mail = mail.trim()
    // pswd = pswd.trim()
    // pswd2 = pswd2.trim()
    uname = uname.toLowerCase()

    if (uname && pswd && mail && pswd2) {
        console.log(uname, mail, pswd, pswd2);

        // if username already exists
        if (uname in userDetails) {
            alert("Username already exist... Please login!")
            document.getElementById('rName').innerHTML = "* Username already exist... Please login!"
        }
        else {
            // registration
            if (pswd === pswd2) {
                userDetails[uname] = { username: uname, email: mail, password: pswd }
                console.log(userDetails);
                alert("Registration succesfull")
                saveDetails()
                setTimeout(loader, 500)
                function loader() {
                    window.location = "login.html"
                }
            } else {
                document.getElementById('rPass2').innerHTML = "* Password doesnot match"
            }
        }
    } else {
        // alert("Please enter Username and Password")
        if (!uname) {
            document.getElementById('rName').innerHTML = "* Username is required"
        } else if (!mail) {
            document.getElementById('rMail').innerHTML = "* Email is required"
        } else if (!pswd) {
            document.getElementById('rPass1').innerHTML = "* Password is required"
        } else if (!pswd2) {
            document.getElementById('rPass2').innerHTML = "* Confirm password is required"
        }
    }
}

// login
function login() {
    document.getElementById('lName').innerHTML = ''
    document.getElementById('lPass').innerHTML = ''
    let user = lUname.value
    let password = lPswd.value

    user = user.trim()
    // password = password.trim()
    user = user.toLowerCase()

    getDetails()

    if (user && password) {
        if (user in userDetails) {
            let originalPassword = userDetails[user].password
            if (originalPassword == password) {
                // alert("Login successfull")

                localStorage.setItem("username", user)

                setTimeout(load, 1000)
                function load() {
                    window.location = "home.html"
                }
            } else {
                // alert("Incorrect password")
                document.getElementById('lPass').innerHTML = "* Login failed! Your password is incorrect."
            }
        } else {
            // alert("Incorrect username")
            document.getElementById('lName').innerHTML = "* Login failed! Please enter a valid username"
        }
    } else {
        // alert("Enter username and password")
        if (user) {
            document.getElementById('lPass').innerHTML = "* Password is required"
        } else {
            document.getElementById('lName').innerHTML = "* Username is required"
        }
    }
}

var userName = localStorage.getItem('username')

function logout() {
    localStorage.removeItem('username')
    window.location = "login.html"
}