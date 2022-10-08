import React, { Component } from 'react'
import axios from 'axios'
import constants from '../constant'

export class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
             email: '',
            password: '',
           

        }
    }

    handlRegistration = () => {
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
    
      const {onRoutChange} = this.props
    
        return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
              className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
              <h3
                className="text-2xl font-bold text-center">Join us
              </h3>
              <form
                action="">
                <div
                  className="mt-4">
                <div>
                    <label
                      className="block"
                      htmlFor="Name">Name
                    </label>
                                <input
                                    onChange={e =>this.setState({name:e.target.value})}
                                    type="text"
                                    placeholder="Name"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                  <div
                    className="mt-4">
                    <label
                      className="block"
                      htmlFor="email">Email
                    </label>
                                <input
                                    onChange={e =>this.setState({email:e.target.value})}
                                    type="text"
                                    placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                <div className="mt-4">
                    <label
                      className="block">Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                <div className="mt-4">
                                <label
                                    className="block">Confirm Password</label>
                                <input
                                    onChange={e =>this.setState({password:e.target.value})}
                                    type="password"
                                    placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                </div>
                  <span
                    className="text-xs text-red-400">Password must be same!
                  </span>
                  <div
                    className="flex">
                                <button
                                    onClick={ this.handlRegistration}
                                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                                    Register
                                </button>
                 </div>
                            <div
                                className="mt-6 text-grey-dark">
                    Already have an account?
                                <p
                                    className="text-blue-600 hover:underline"
                                    onClick={() => onRoutChange('Register')}>
                              Log in
                          </p>
                    
                </div>
            </div>
        </form>
    </div>
</div>
    )
  }
}

export default Register