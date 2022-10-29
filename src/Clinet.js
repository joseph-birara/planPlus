


import constants from "./GlobalVariabls/constant";
import axios from 'axios';



async function subscribe({serviceWorkerReg,userToken}) {
  // const {userToken} =useSelector(selectCurrentUsers)
  let subscription = await serviceWorkerReg.pushManager.getSubscription ();
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe ({
      userVisibleOnly: true,
      applicationServerKey: "BJ-kJrBQbrRwViibMQLy6T0fxprp6cVoX4IWx3wH5pzDbMJM7HEn5cS1naCsyehRWypOfubhB4wk_YOEFI_OzLs",
    });
    console.log("abouve the axious");
    axios.post (`${constants}/subscribe`, subscription,{
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    }).then(res => console.log(res, "axios result"));
    console.log("below the axious");
  }
}
async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/worker.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}


const pushAndSubscribe = async({userToken}) => {
   try {
      const serviceWorkerReg = await regSw ();
      await subscribe ({serviceWorkerReg,userToken});
    } catch (error) {
      console.log (error);
    }
  }
   
 

export {pushAndSubscribe}

