import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from '../firebase'
import axios from "axios"
// import { useHistory } from "react-router-dom";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {    
            const user = await generateUserDocument(userAuth);
            this.setState({ user });
            // storeUserToLocalDB(user)
        });
    };

    // storeUserToLocalDB = (user) => {
    //     const response = await axios.post(

    //     )
    // }

    render() {
        return (
          <UserContext.Provider value={this.state.user}>
            {this.props.children}
          </UserContext.Provider>
        )
    }
}
export default UserProvider