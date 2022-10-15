import React, { useEffect, useState } from 'react'

function EmailPassWordValidation(props) {
    const [message, setmessage] = useState('')
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pt = /[0-9]/;
    const pt2 = /[A-Z]/;
    const pt3 = /[a-z]/;
    const validation = () => {
        
    
        if (props.password.length < 8) {
        
            setmessage("password too short!");
        }

        if (!props.email.match(mailformat)) {
            setmessage("too short  or email has a wrong format");
        }
        if (!props.password.match(pt)) {
            setmessage("password should contain number")
        }
        if (!props.password.match(pt2)) {
            setmessage("password should contain capital letter")
        }
        if (!props.password.match(pt3)) {
            setmessage("password should contain small letter")
        }
        
    }
    useEffect(validation,[props.email,props.password])
if (message)
  return (
      <div>
          
    </div>
  )
    else return ''
}

export default EmailPassWordValidation