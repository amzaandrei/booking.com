import React, { useState } from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { Link, useHistory } from "react-router-dom";

import { auth } from '../../../firebase'

function SignIn({props}) {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            history.push({
                pathname: '/',
                state: 'userSignedIn'
            })
        })
        .catch(err => {
            setError("Error signing in with password and email")
            console.log("Error signing in with password and email", err)
        })       
        
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget
        if(name === 'userEmail'){
            setEmail(value)
        }else if(name === 'userPassword'){
            setPassword(value)
        }
        
    }

    return (
        <Paper className="asdasdas">
            <div className="asdas">
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="email" name="userEmail" label="Email" type="email"
                        value={email}
                        onChange = {(event)  => onChangeHandler(event)}
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
                        onChange = {(event)  => onChangeHandler(event)}
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
                        <Link to = "/passwordReset">
                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" style={{ textTransform: "none" }}
                    onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>Sign In</Button>
                </Grid>
                
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