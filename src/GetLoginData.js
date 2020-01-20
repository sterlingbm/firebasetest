import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FilterableProductTable from "./FilterableProductTable";

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
      },
      listOfResults: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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

  goGetData() {
    var db = firebase.firestore();
    var userId = String.valueOf(firebase.auth().currentUser);
    var tempArray = [];

    db.collection("users")
      .where("createdBy", "==", "AgUY7SyeQJXH9ISpieVhDpt2dOK2")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push(doc.data());
          console.log(`${doc.id} => ${doc.data()}`);
          alert(JSON.stringify(doc.data()));
        });
      })
      .then(okay => {
        alert("tempArray: " + tempArray);

        this.setState({
          listOfResults: tempArray
        });
      });
  }

  render() {
    return (
      <div>
        <input
          value="Get Data"
          type="button"
          onClick={() => this.goGetData()}
        />

        <FilterableProductTable products={this.state.listOfResults} />
      </div>
    );
  }
}

export default Login;
