// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDO7frL8_nOzkhLUq4qt6rRMce0A10_xTo",
    authDomain: "login-with-firebase-data-ebad4.firebaseapp.com",
    projectId: "login-with-firebase-data-ebad4",
    storageBucket: "login-with-firebase-data-ebad4.appspot.com",
    messagingSenderId: "285237284401",
    appId: "1:285237284401:web:8d0af0cb75f46fe59d4f10"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth =  firebase.auth()
  const database = firebase.database()

  function register () {
    email = document.getElementsById('email').value
    password = document.getElementsById('password').value

if (validate_email(email) == false || validate_password(password) == false) {
    alert ('Email or Password is Out of line!!')
    return
}
if (validate_field() == false || validate)
  }

  auth.createUserWithEmailAndPassword (email, password)
  .then(function(){
    var user = auth.currentUser
    var database_ref = database.ref()
    var user_data = {
        email : email,
        password : password,
        last_login : Date.now()
    }
    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
  })
  .catch(function(error){
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })


  function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
  }

  function validate_password(password){
    if (password < 6) {
        return false
    } else {
        return true
    }
  }

  function validate_field(field) {
    if (field == null){
        return false
    } 
    
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
  }