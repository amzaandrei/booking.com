import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from '../firebase'

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {    
            const user = await generateUserDocument(userAuth);
            this.setState({ user });
            userAuth
            ? localStorage.setItem('authUser', JSON.stringify(user))
            : localStorage.removeItem('authUser')
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