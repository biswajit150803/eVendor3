import axios from "axios";
import React from "react";
import { useRef, useState } from "react";
import "./register.css";
import { Button } from "react-bootstrap";
import { Cancel } from "@material-ui/icons";

export default function Register({ setShowRegister,username,email,password,heading ,aadhar,
  // mobile,otpp,
  upload,register,successful,wrong}) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef=useRef();
  // const otpRef=useRef();
  const aadharRef = useRef();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newUser = {
  //     username: usernameRef.current.value,
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   };

  //   try {

  //     await axios.post("http://localhost:8009/api/users/register", newUser);
  //     setError(false);
  //     setSuccess(true);
      
  //   } catch (err) {
  //     setError(true);
  //   }
  // };

  ////////////////////////Aadhar Card////////////////////////

  const [File, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const validateAadhaarNumber = (aadhar) => {
    const aadhaarRegex = /^\d{12}$/;
    return (aadhaarRegex.test(aadhar));
  };

  const validateMobileNumber=(mobile)=>{
    const mobileReg=/^\d{10}$/;
    return (mobileReg.test(mobile));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (aadharRef.current.value.length !== 12 || !validateAadhaarNumber(aadharRef.current.value)) {
      alert("Please enter a valid Aadhar Number");
    }
    
      const newUser = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        url: url.secure_url,
        aadhar: aadharRef.current.value,
      };
      if(ver){
      try {

        await axios.post("http://localhost:8009/api/users/register", newUser);
        setError(false);
        setSuccess(true);

      } catch (err) {
        setError(true);
      }
      }
      else{
        alert("verify email first");
      }
  };

  const submitOne = async (event) => {
    const f1 = event.target.files[0];
    const data = new FormData()
    data.append("file", f1)
    data.append("upload_preset", "notepad")
    data.append("cloud_name", "dcyfkgtgv")
    const res = await fetch("https://api.cloudinary.com/v1_1/dcyfkgtgv/image/upload", {
      method: "post",
      body: data
    })
    const fil = await res.json();
    console.log(fil);
    setUrl(fil);
  }
  const [ver,setver]=React.useState(false);
  // const [otp, setOtp] = useState('');
  // const [generatedOtp, setGeneratedOtp] = useState('');
  // const [pnumber,setPnum]=useState('');
  // const generateOTP = async() => {
  //   // Generate a random 6-digit OTP
  //   const otp = Math.floor(100000 + Math.random() * 900000);
  //   setGeneratedOtp(otp.toString());
    
  //   try{
  //     let obj={
  //       otp:otp,
  //       pnumber:pnumber
  //     }
  //   const response=await axios.post("http://localhost:8009/api/users/send-otp",obj);
  //   console.log(response.data);
  //   }catch(err)
  //   {console.log(err)}
  // }
  // const verifyOTP = () => {
  //   if (otp === generatedOtp) {
  //     // OTP is correct, proceed with authentication
  //     alert('OTP verified successfully');
  //   } else {
  //     // OTP is incorrect
  //     alert('Invalid OTP. Please try again.');
  //   }
  // };
  // const CountryCode = "91";
  // const AUTHKEY="1ea28c5ce2b896d7";

  // var settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": `https://api.authkey.io/request?authkey=${AUTHKEY}&mobile=${RecepientMobile}
  //   &country_code=${CountryCode}&sms=Hello%2C%20your%20OTP%20is%201234&sender=${SENDERID}",
  //   "method": "GET"`
  // }
  
  // $.ajax(settings).done(function (response) {
  //   console.log(response);
  // });

  const [emailed,setEmailed]=useState('');

  const handleSendOTP = async () => {
    try {
      let obj={
        emailed:emailed
      }
      // Send a POST request to your backend route to generate and send OTP
      const response = await axios.post("http://localhost:8009/api/users/send-email-otp", obj);
      console.log(response.data); // Handle the response from the backend
    } catch (error) {
      console.log(error);
    }
  };

  const [getotp, setgetOTP] = useState("");
  
  const handleVerifyOTP = async () => {
    try {
      // Send a POST request to your backend route for OTP verification
      const response = await axios.post("http://localhost:8009/api/users/verify-otp", { getotp });
      
      if (response.data.success) {
        setver(true);
       window.alert("OTP verified successfully");
      } else {
        setver(false)
        window.alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="registerContainer">
    <h6 style={{color:"white"}}>{heading}</h6>
      <div className="formHawker reg">
      <label style={{border:"none",color:"white"}}>{username}</label>
        <input autoFocus placeholder="username" ref={usernameRef} style={{borderRadius:"3px"}}/>
        <label style={{border:"none",color:"white"}}>{email}</label>
        <div   className="otp19">
          <input type="email" placeholder="email" ref={emailRef} style={{borderRadius:"3px"}}
          onChange={(e)=>setEmailed(e.target.value)} />
          <Button onClick={handleSendOTP}><h6 className="otptext">Get OTP</h6></Button>
        </div>
        <div className="otp19">
          <input
          type="text"
          placeholder="Enter OTP"
          value={getotp}
          onChange={(e) => setgetOTP(e.target.value)}
          />
          <Button onClick={handleVerifyOTP}><h6 className="otptext">Verify OTP</h6></Button>
        </div>
        
        <label style={{border:"none",color:"white"}}>{password}</label>
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
          style={{borderRadius:"3px"}}
        />
        <label style={{border:"none",color:"white"}}>{aadhar}</label>
        <input
          min="6"
          placeholder="Aadhar Number"
          ref={aadharRef}
        />
        {/* <label style={{border:"none",color:"white"}}>{mobile}</label>
        <div style={{display:"flex",height:"3vh",alignItems:"center"}}>
        <input
          min="10"
          placeholder="Mobile Number"
          ref={mobileRef}
          style={{width:"13vw"}}
          onChange={(e) => setPnum(e.target.value)}
        /> */}
        {/* <Button onClick={generateOTP}>Get OTP</Button> 
        </div>*/}
        {/* <label style={{border:"none",color:"white"}}>{otpp}</label>
        <div style={{display:"flex",height:"3vh",alignItems:"center"}}>
        <input 
        type="text"
        placeholder="Enter OTP"
        value={otp}
        style={{width:"13vw"}}
        onChange={(e) => setOtp(e.target.value)}/>
        <Button onClick={verifyOTP}>Verify OTP</Button>
        </div> */}
        <label style={{color:"white",border:"none"}}>{upload}</label>
            <input
              type="file"
              required
              onChange={submitOne} />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            {/* <span style={{color:"white"}}>Upload Shop </span> */}
            
          </div>
          <p id="uidnote" className="instructions" style={{color:"orange",fontSize:"12px"}}>
            *Must Insert Image. in jpg/.png format preferably.
          </p>
        </div>
        <button className="registerBtn" onClick={handleSubmit}>
          {register}
        </button>
        {success && (
          <span className="success">{successful}</span>
        )}
        {error && <span className="failure">{wrong}</span>}
      </div>
       <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      /> */
    </div>
  );
}