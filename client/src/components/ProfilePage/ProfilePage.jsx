import React, {Component} from "react";
import ReactDOM from "react-dom";

class ProfilePage extends Component{
    state ={
        name: "Mert",
        surname: "Yılmaz",
        username: "RoadSpell",
        email: "mertyilmazgd@outlook.com"
    }
    render() {
        return (
            <div>
                <h1>--Profile--</h1>
                <br/>
                <span>Name: {this.state.name}</span>
                <br/>
                <span>Surname: {this.state.surname}</span>
                <br/>
                <span>E-mail: {this.state.email}</span>
            </div>
        );
    }

}

export default ProfilePage;