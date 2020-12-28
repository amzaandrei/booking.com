import React, { useState } from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { useHistory, Link } from "react-router-dom";

import { auth, generateUserDocument, signInWithGoogle } from '../../../firebase'

function SignIn() {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null)

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault()

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            generateUserDocument(user, {displayName})
        }
        catch (err) {
            setError('Error Signing up with the email and password!')
        }
        
        history.push({
            pathname: '/',
            state: 'userSignedUp'
        })

        setEmail("")
        setPassword("")
        setDisplayName("")

    }

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget
        if(name === 'userEmail'){
            setEmail(value)
        }else if(name === 'userPassword'){
            setPassword(value)
        }else if(name === 'displayName'){
            setDisplayName(value)
        }
    }

    const signInWithGoogleHandler = () => {
        signInWithGoogle()
        history.push({
            pathname: '/',
            state: 'userSignedUp'
        })
    }

    return (
        <Paper className="asdasdas">
            <div className="asdas">
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="displayName" name="displayName" label="DisplayName" type="displayName"
                        value={displayName}
                        onChange= {(event)  => onChangeHandler(event)}
                        fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="email" name="userEmail" label="Email" type="email"
                        value={email}
                        onChange= {(event)  => onChangeHandler(event)}
                        fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" name="userPassword" label="Password" type="password"
                        value={password}
                        onChange= {(event)  => onChangeHandler(event)}
                        fullWidth required />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Link to="/signin" style={{ textDecoration: 'none'}}>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Do you have already an account?</Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" style={{ textTransform: "none" }}
                    onClick = {(event) => {createUserWithEmailAndPasswordHandler(event, email, password)}}>SignUp</Button>
                </Grid>
                <button className="bg-red-500 hover:bg-red-600 w-full py-2 text-white" onClick={signInWithGoogleHandler}>
                    Sign In with Google
                </button>
                {error !== null && (
                    <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
                    {error}
                    </div>
                )}
            </div>
        </Paper>
    );
}

export default SignIn