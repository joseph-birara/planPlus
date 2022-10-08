
import LogIn from './featurs/LogIn';
import store from './app/store'
import Register from './featurs/Register';
import React from 'react';
import Home from './featurs/Home';
 

class App extends React.Component {
  constructor() {
    super()
  
    this.state = {
      
      route: 'signin',
      logedIn: false,
      
    }
  }
 
  
  
  onRoutChange = (rout) => {
    if (rout === 'Home') {
      this.setState({ logedIn: true })
      
    }
    

    this.setState({route:rout})
  }
  render() {
    
    
  
  return (
    <div className='min-h-screen bg-gradient-to-l from-indigo-400 via-purple-500 to-pink-300'>
      <div className='bg-gradient-to-l from-green-400 to-blue-500' >
        {/* <Navigation logedIn={this.state.logedIn} onRoutChange={this.onRoutChange} />
      
        <Logo /> */}
        
      </div>

      {this.state.route === 'signin' ?
        <LogIn onRoutChange={this.onRoutChange} /> :
        
        (
          this.state.route === 'Register' ?
            <Register
              // loadUser={this.loadUser}
              onRoutChange={this.onRoutChange} /> :
            <div>
              
          <Home/>
              

         
      
      </div>)}
    
      
    </div>
  );
    }
}

export default App