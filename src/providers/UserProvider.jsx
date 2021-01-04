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
            if(user !== null)
                this.setState({ user });
            else
                this.setState({ user: null })
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