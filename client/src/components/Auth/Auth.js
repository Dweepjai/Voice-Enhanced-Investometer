import React, { useContext, useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { InvestmentTrackerContext } from '../../context/context';
import axios from "axios";

import useStyles from './styles';
import Input from './Input';

const initialState = { email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();

  const { dispatch } = useContext(InvestmentTrackerContext);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = form;
    const cpassword = confirmPassword;
    
    if (isSignup) {
      try {
        const res = await axios.post("/register", {
          email,
          password,
          cpassword,
        })
        window.alert("Signup Successful");
        switchMode();
      } catch (err) {
        console.log(err);
        window.alert("Signup Failed");
      }
    } else {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/signin", {
          email,
          password,
        })
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        window.alert("Signin Successful");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        console.log(err);
        window.alert("Signin Failed");
      }
    }
    setForm(initialState);
  };

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form method="POST" className={classes.form}>
          <Grid container spacing={2}>
            <Input name="email" value={form.email} label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" value={form.password} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" value={form.confirmPassword} label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
