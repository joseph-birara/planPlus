import axios from 'axios'
import React from 'react'
import constants from '../../constant'
import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
// import {
//   passInput,
//   emailInput
// } from './userSlice'



class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password:''

    }
  }
  // const [passWord, setpassWord] = useState('123')
  // const [email, setemail] = useState('hrejs')
  
    // const {onRoutChange} = this.props
 
   handleSubmit = () => {
    axios.post(`${constants}/auth/login`, {
    email: this.state.email,
    password: this.state.password
  })
      .then(response => {
        if (response.data.email === this.state.email) {
       this.props.onRoutChange('home')
          
        }
      })
    
  .catch(function (error) {
    console.log(error.response.data.err);
  });
  }
  render() {
    const { onRoutChange } = this.props
    return (
        <div className='flex justify-center'>
            <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white content-center align-middle ">
    
    <div className="text-center my-6">
      <h1 className="text-3xl font-semibold text-gray-700">Sign in</h1>
      <p className="text-gray-500">Sign in to access your account</p>
    </div>
   
    <div className="m-6">
      <form className="mb-4">
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                <input
                  required
                  value={this.state.email}
                 onChange={(e) => this.setState({ email:e.target.value})}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400">
                    Password</label>
                  <p 
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">
                    Forgot password? <Link to ='/newemail'/></p>
          </div>
                <input
                  required
                  value={this.password}
                  onChange={(e) =>this.setState({password:e.target.value})}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
        </div>
        <div className="mb-6">
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!this.state.password ||!this.state.email }
                  onClick={this.handleSubmit}
                  type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out">
                  Sign in</button>
        </div>
        <p className="text-sm text-center text-gray-400">
          Don't have an account yet? 
                <span
                  onClick={() => onRoutChange('Register')}
                  className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline">
                  Sign up</span>.
        </p>
      </form>
      
      
      
       
    </div>
  </div>
            
      </div>
    )
    }
  
}

export default LogIn