import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from '../firebase'
// import { useHistory } from "react-router-dom";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    }

    // history = useHistory()

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {    
            const user = await generateUserDocument(userAuth);
            this.setState({ user });
        });
    };

    render() {
        return (
          <UserContext.Provider value={this.state.user}>
            {this.props.children}
          </UserContext.Provider>
        )
    }
}
export default UserProvider