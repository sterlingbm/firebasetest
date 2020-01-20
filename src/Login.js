import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import GetLoginData from "./GetLoginData";

class Login extends React.Component {
  constructor(props) {
    super(props);

    const firebaseConfig = {
      apiKey: "AIzaSyDPGYny9oNcGmheHi-Red7MAE49sujIvFw",
      authDomain: "react-1c45d.firebaseapp.com",
      databaseURL: "https://react-1c45d.firebaseio.com",
      projectId: "react-1c45d",
      storageBucket: "react-1c45d.appspot.com",
      messagingSenderId: "16073780429",
      appId: "1:16073780429:web:d790e8a412cf35073a8d84",
      measurementId: "G-ZHE51PLVJR"
    };

    try {
      firebase.initializeApp(firebaseConfig);
    } catch (err) {
      if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
      }
    }

    try {
      var db = firebase.firestore();
    } catch (e) {
      alert("firestore problem: " + e);
    }

    this.state = {
      currentUser: {
        email: ""
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fireBaseCreateAccount = this.fireBaseCreateAccount.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.createData = this.createData.bind(this);
    this.goGetData = this.goGetData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  updateCurrentUser() {
    alert("in update current user");
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        alert(user);
        this.setState({
          currentUser: firebase.auth().currentUser
        });
      } else {
        alert("failure");
        alert(user);
      }
    });
  }

  goGetData() {
    var db = firebase.firestore();
    var userId = String.valueOf(firebase.auth().currentUser);

    db.collection("users")
      .where("createdBy", "==", "AgUY7SyeQJXH9ISpieVhDpt2dOK2")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
          alert(JSON.stringify(doc.data()));
        });
      });
  }

  createData() {
    var db = firebase.firestore();

    db.collection("users")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815,
        createdBy: firebase.auth().currentUser.uid
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  signIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });

    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          alert("in auth state changed user exists");
          alert(user);
          this.setState({
            currentUser: firebase.auth().currentUser
          });
        } else {
          alert("failure");
          alert(user);
        }
      }.bind(this)
    );
  }

  fireBaseCreateAccount(email, password) {
    alert("email: " + email);
    alert("password: " + password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });

    alert("in update current user");
    firebase.auth().onAuthStateChanged(
      function(user) {
        if (user) {
          alert("in auth state changed user exists");
          alert(user);
          this.setState({
            currentUser: firebase.auth().currentUser
          });
        } else {
          alert("failure");
          alert(user);
        }
      }.bind(this)
    );

    //this.updateCurrentUser();
  }

  render() {
    return (
      <div>
        <p>Enter your shit skank ho:</p>
        Current User:{" "}
        {this.state.currentUser.email
          ? this.state.currentUser.email
          : "nothing"}
        <br />
        Email: {this.state.email}
        <br />
        Password: {this.state.password}
        <br />
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <input
          value="Sign Up"
          type="button"
          onClick={() =>
            this.fireBaseCreateAccount(this.state.email, this.state.password)
          }
        />
        <input
          value="Sign In"
          type="button"
          onClick={() => this.signIn(this.state.email, this.state.password)}
        />
        <br />
        <input
          value="Create Data"
          type="button"
          onClick={() => this.createData()}
        />
        <br />
        <input
          value="Get Data"
          type="button"
          onClick={() => this.goGetData()}
        />
      </div>
    );
  }
}

export default Login;
