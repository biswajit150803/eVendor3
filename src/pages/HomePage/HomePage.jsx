import React, { useEffect, useState } from "react";
import "./home.css";
import Footer from "../Footer/Footer";
import axios from "axios";
// import Navbar from '../Navbar/Navbar'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Categories from "../categories/categories";
import "react-responsive-modal/styles.css";
import Carousel from "react-bootstrap/Carousel";
import Map from "../Map/Map";
import Login from "../../components/Login";
import Navbare from "../../components/Navbare/Navbare";
import CCurrentorders from "../CCurrentorders/CCurrentorders";
import CPastorders from "../CPastorders/CPastorders";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { RxCross2 } from "react-icons/rx";
import Video from "../Video/Video";
import FAQC from "../../components/faq/FAQC";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  function myGreeting() {
    onOpenModal();
    // setApp("toaste");
  }
  React.useEffect(() => {
    setTimeout(myGreeting, 1000);
  }, []);
  const [open2, setOpen2] = React.useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  const [success, setS] = React.useState(false);
  // const [note,setNotes]=React.useState();
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = React.useState(
    myStorage.getItem("Customeruser")
  );
  function logged_in(data) {
    console.log(data);
    setS(data);
  }
  useEffect(() => {
    if (currentUsername) {
      setS(true);
    } else {
      setS(false);
    }
  }, [currentUsername]);
  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("Customeruser");
    window.location.reload();
  };
  const [tab, setTab] = React.useState(0);
  function changeTab(data) {
    setTab(data);
  }
  const navigate = useNavigate();
  const [option, setOption] = useState("");
  function handleChange(e) {
    setOption(e.target.value);
  }
  function handleRedirect() {
    if (option === "customer") {
      onCloseModal();
    } else if (option === "business") {
      navigate("/business");
    }
  }
  function prof(){
    onOpenModal2();
  }
  ////////////////////////////////////////////////new code
  const [url1,setUrl1]=React.useState();
  const [uname,setuname] =React.useState();
  const [error,setError]=React.useState(false);
  const [success1,setSuccess1]=React.useState(false);
  // const submitOne1 = async (event) => {
  //   const f1 = event.target.files[0];
  //   const data = new FormData()
  //   data.append("file", f1)
  //   data.append("upload_preset", "notepad")
  //   data.append("cloud_name", "dcyfkgtgv")
  //   const res = await fetch("https://api.cloudinary.com/v1_1/dcyfkgtgv/image/upload", {
  //     method: "post",
  //     body: data
  //   })
  //   const fil = await res.json();
  //   console.log(fil);
  //   setUrl1(fil.url);
  // }
  // const upUrl= async(e) => {
  //   e.preventDefault();
  //   let newus={
  //     HUser:currentUsername,
  //     url:url1
  //   };
  //   try {
  //     e.preventDefault();
  //     await axios.post("http://localhost:8009/api/users/uurl", newus);
  //     setError(false);
  //     setSuccess1(true);
  //       setUrl(url1);
  //       myStorage.setItem("url", url1);
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //   }
  // }
  const upname = async(event) =>{
    setuname(event.target.value);
  }
  const upnameclick = async(e) =>{
    e.preventDefault();
    let newus={
      CUser:currentUsername,
      newname:uname
    };
    console.log(newus)
    try {

      await axios.post("http://localhost:8009/api/customers/updatecus", newus);
      setError(false);
      setSuccess1(true);
      myStorage.setItem("user", uname);
        setCurrentUsername(uname);
        alert("updated username")
      await axios.post("http://localhost:8009/api/web3/customerupdate", newus)
          
        

    } catch (err) {
      console.log(err);
      setError(true);
    }
  }
  const [oldp,setoldp]=React.useState();
  const [newp,setnewp]=React.useState();
  const upoldpass=async(e)=>{
    setoldp(e.target.value);
  }
  const upnewpass=async(e)=>{
    setnewp(e.target.value);
  }
  const upPass=async(e)=>{
    e.preventDefault();
    console.log(oldp+",,"+newp);
    let newus={
      oldpassword: oldp,
      newpassword: newp,
      username: currentUsername
    }
    try {

      await axios.post("http://localhost:8009/api/customers/updatepass", newus);
      
        setError(false);
        setSuccess1(true);
        alert("updated password")
   
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  //////////////////////////////////////////
  return (
    <>
      <>
        {success ? (
          <>
            <div className="Appo" style={{ overflowX: "hidden" }}>
              <Navbare
                user={currentUsername}
                logout={handleLogout}
                changeTab={changeTab}
                prof={prof}
              />
              {tab === 0 ? (
                <>
                <Modal
                    className="mode"
                    open={open2}
                    onClose={onCloseModal2}
                    closeOnOverlayClick={false}
                    center={true}
                    closeIcon={<RxCross2 style={{ color: "white", fontSize: "25px" }} />}
                  >
                    <div style={{color:"white",marginTop:"2.5vh",marginBottom:"2.5vh"}}>Username: {currentUsername}</div> <br />
                    <div style={{color:"white",marginTop:"2.5vh",marginBottom:"2.5vh"}}>To see the update please relogin with the updated details</div> <br />
      
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Update name ">
      <div className='photo199'>
            <input type='text' placeholder="Insert your name" className="insert199" onChange={upname} />
            <button className='update199' onClick={upnameclick}>UPDATE</button>
            {error && <span className="failure">Something is wrong !</span>}
            {success1 && (
          <span className="success">Updated !</span>
        )}
        </div>
        
      </Tab>
      <Tab eventKey="profile" title="Change password">
      <div className='photo199'>
            <input type='text' placeholder="Insert your old password" className="insert199" onChange={upoldpass} />
            
        </div>
        <div className='photo199'>
        <input type='text' placeholder="Insert your new password" className="insert199" onChange={upnewpass} />
            
            
        </div>
        {error && <span className="failure">Something is wrong !</span>}
            {success1 && (
          <span className="success">Updated !</span>
        )}
        <button className='update199' onClick={upPass}>UPDATE</button>
      </Tab>
      </Tabs>
        
                  </Modal>
                  <header className="App-header">
                    <div className="body">
                      <section className="contain">
                        <div className="top-card banner-msg-box form_container msg">
                          <div className="top-Header">
                            Your own cart, at your location!
                          </div>
                          <div className="top-middle">
                            Craving for some street food or looking for nearby
                            local vendors? We got you covered!
                          </div>
                        </div>
                        <div className="slide">
                          <Carousel
                            className="slide"
                            controls={true}
                            keyboard={true}
                            touch={true}
                            interval={3000}
                          >
                            <Carousel.Item>
                              <img
                                className="d-block w-900 home-im"
                                src="./bakery1.jpg"
                                alt="First slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-900 home-im"
                                src="./veg1.jpg"
                                alt="Second slide"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-900 home-im"
                                src="./fish1.jpg"
                                alt="Third slide"
                              />
                            </Carousel.Item>
                          </Carousel>
                        </div>
                      </section>
                    </div>
                  </header>
                  <Map user={currentUsername} />
                  <Categories />
                  <div className="customervideo">
                    <Video
                      url="https://www.youtube.com/watch?v=LapOdjjjJgQ"
                      text="Want to know on how to use our platform?"
                    />
                  </div>
                  <FAQC />
                </>
              ) : tab === 1 ? (
                <>
                  {" "}
                  <CCurrentorders user={currentUsername} />{" "}
                </>
              ) : (
                <>
                  <CPastorders user={currentUsername} />
                </>
              )}
              {/* <About /> */}

              <div className="Footer">
                <Footer />
              </div>
            </div>
          </>
        ) : (
          <>
            <Login
              setShowLogin={logged_in}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
            />
          </>
        )}
      </>
    </>
  );
};

export default HomePage;
