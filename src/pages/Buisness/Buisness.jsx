import "./app.css";
import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Room } from "@material-ui/icons";
import axios from "axios";
import Register from "../Register";
import Login from "../Login";
import Footer from "../Footer/Footer";
import BNavbar from "../BNavbar/BNavbar";
import { useTranslation } from "react-i18next";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactSwitch from "react-switch";
import BPastorders from "../BPastorders/BPastorders";
import BCurrentorders from "../BCurrentorders/BCurrentorders";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoList from "../../components/todo/TodoList";
import { RxCross2 } from "react-icons/rx";
import Video from "../Video/Video";
import FAQH from "../../components/faq/FAQH";
import Button from 'react-bootstrap/Button';
import { Alert } from "react-bootstrap";

// Contains the value and text for the options
const languages = [
  { value: "", text: "Options" },
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
  { value: "ta", text: "Tamil" },
  { value: "ml", text: "Malayalam" },
  { value: "ur", text: "Urdu" },
  { value: "mr", text: "Marathi" },
  { value: "bn", text: "Bengali" },
  { value: "gu", text: "Gujarati" },
  { value: "te", text: "Telugu" },
];
function Buisness() {
  AOS.init();
  const myStoragee = window.localStorage;
  const myStorage = window.localStorage;
  const [todoList, setTodoList] = useState(
    myStoragee.getItem("todos") ? JSON.parse(myStoragee.getItem("todos")) : []
  );
  const todoChange = (add) => {
    let newTodoList = todoList;
    newTodoList.push(add);
    setTodoList(newTodoList);
  };

  const todoDelete = (id) => {
    const updatedTodos = todoList.filter((_, i) => i !== id);
    setTodoList(updatedTodos);
  };
  const [currentLang, setCurrentLang] = React.useState(
    myStoragee.getItem("Language")
  );
  const { t } = useTranslation();

  const [lang, setLang] = useState(myStoragee.getItem("Language"));

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:5173/business";
    window.location.replace(loc + "?lng=" + e.target.value);
    myStorage.setItem("Language", e.target.value);
  };
  function myGreeting() {
    onOpenModal();
    // setApp("toaste");
  }
  React.useEffect(() => {
    setTimeout(myGreeting, 5000);
  }, []);

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);

  const [open2, setOpen2] = React.useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const onOpenModal3 = () => setOpen3(true);
  const onCloseModal3 = () => setOpen3(false);

  const [blocked, setBlocked] = React.useState(myStorage.getItem("blocked"));
  
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(myStorage.getItem("Title"));
  const [desc, setDesc] = useState(myStorage.getItem("Desc"));
  const [check, setCheck] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 9,
  });
  const [tab, setTab] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const changeTab = (index) => {
    setTab(index);
  };
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const [per, Sper] = useState({
    lat: 47.040182,
    long: 17.071727,
  });

  const locUp = async () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setLat1(pos.coords.latitude);
      setLong1(pos.coords.longitude);
      Sper({
        lat: pos.coords.latitude,
        long: pos.coords.longitude,
      });
    });
  };
  useEffect(() => {
    locUp();
  }, []);

  //AUTO UPDATE LOCATION CODE HERE
  const handleSubmite2 = async (lat, long) => {
    const newPin = {
      username: currentUsername,
      title,
      desc,
      lat: lat,
      long: long,
      items: todoList,
    };
    // console.log(newPin);
    try {
      //console.log(newPin);
      const res = await axios.post(
        "http://localhost:8009/api/pins/updatepins",
        // "http://localhost:8009/api/pins/updatepins",
        newPin
      );

      setCheck(false);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
  };

  const locUp2 = async () => {
    var l1, l2;
    navigator.geolocation.getCurrentPosition((pos) => {
      l1 = pos.coords.latitude;
      l2 = pos.coords.longitude;

      handleSubmite2(l1, l2);
    });
  };
  React.useEffect(() => {
    start();
  }, []);
  function start() {
    let timerId = setInterval(() => {
      locUp2(per.lat, per.long);
    }, 5000);
  }
  //END OF AUTO LOCATION UPDATE CODE

  ///START OF ON VALUE CHANGE CODE

  const [lat1, setLat1] = React.useState("0");
  const [long1, setLong1] = React.useState("0");
  const [url, setUrl] = React.useState(myStorage.getItem("url"));
  const handleSubmit3 = async () => {
    let lat1, long1;

    navigator.geolocation.getCurrentPosition(async (posi) => {
      setViewport({
        ...viewport,
        latitude: posi.coords.latitude,
        longitude: posi.coords.longitude,
      });
      const lattt = {
        lat: posi.coords.latitude,
        long: posi.coords.longitude,
      };
      //console.log(lattt.lat+","+lattt.long);
      setLat1(() => {
        const newl = posi.coords.latitude;
        return newl;
      });
      setLong1(() => {
        const newl = posi.coords.longitude;
        return newl;
      });
    });
    await handleSubmite();
  };

  const handleSubmite = async (e) => {
    const newPin = {
      username: currentUsername,
      title,
      desc,
      lat: lat1,
      long: long1,
      items: todoList,
    };
    try {
      //console.log(newPin);
      const res = await axios.post(
        "http://localhost:8009/api/pins",
        // "http://localhost:8009/api/pins",
        newPin
      );

      setCheck(false);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
  };
  ///END OF ON VALUE CHANGE CODE

  const handleLogout = () => {
    //logout function
    setCurrentUsername(null);
    setUrl("");
    setBlocked(false);
    myStorage.removeItem("user");
  };
  let screenWidth = window.screen.width;
  // useEffect(() => {
  //   //console.log(screenWidth);
  // }, []);
  React.useEffect(() => {
    console.log(myStoragee.getItem("Checked"));
  }, []);
  // const [checked, setChecked] = useState((myStoragee.getItem("Checked")===null)?false:myStorage.getItem("Checked")); //variable for business hours
  const [checked, setChecked] = useState(myStoragee.getItem("Checked")); //variable for business hours

  //FUNCTION FOR BUSINESS HOURS
  const handleChange1 = async (val) => {
    setChecked(val);
    console.log(val);
    myStoragee.setItem("Checked", val);
    console.log(myStoragee.getItem("Checked"));
    if (!val) {
      const newPin = {
        username: currentUsername,
      };
      const res = await axios.post(
        "http://localhost:8009/api/pins/del",
        // "http://localhost:8009/api/pins/del",
        newPin
      );
      //console.log(res);
    }
    if (!val) {
      const newOrder = {
        username: currentUsername,
      };
      const res = await axios.post(
        "http://localhost:8009/api/items/deleteAll",
        // "http://localhost:8009/api/items/deleteAll",
        newOrder
      );
      console.log(res);
    }
    if (!val) {
      window.location.reload();
    }
    if (val) {
      await handleSubmite();
      window.location.reload();
    }
  };

  //FUNCTION TO GET PINS FROM DATABASE ON MAP
  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get(
          "http://localhost:8009/api/pins"
        );
        // console.log(allPins.data);
        setPins(() => {
          const newl = allPins.data;
          return newl;
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  });
  // [checked, reloadVar]
  const notify = () => toast("Updated!");

  const handleFormSubmit = async (e) => {
    // console.log("Hey I am clicked!");
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      lat: lat1,
      long: long1,
      items: todoList,
    };
    notify();
    //console.log(newPin);
    await axios.post(
      "http://localhost:8009/api/pins",
      // "http://localhost:8009/api/pins",
      newPin
    );
    window.location.reload();
    setCheck(false);
    setNewPlace(null);
    console.log("calledme before");

    notify();
    // calledme();
  };
  React.useEffect(() => {
    //console.log(url+" ,, "+blocked);
  });
  const [noteIns, setNoteIns] = React.useState([]);
  const apihawker = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:8009/api/web3/hawker",
      params: { HUser: currentUsername },
    };
    axios
      .request(options)
      .then((response) => {
        //console.log(response.data);
        // setLength(response.data.length);
        response.data.reverse();
        setNoteIns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  React.useEffect(() => {
    apihawker();
  }, []);
  React.useEffect(() => {
    console.log(blocked);
  });

  ////////////////////////////////////////////////new code
  const [url1,setUrl1]=React.useState();
  const [uname,setuname] =React.useState();
  const [error,setError]=React.useState(false);
  const [success,setSuccess]=React.useState(false);
  const submitOne1 = async (event) => {
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
    setUrl1(fil.url);
  }
  const upUrl= async(e) => {
    e.preventDefault();
    let newus={
      HUser:currentUsername,
      url:url1
    };
    try {
      e.preventDefault();
      await axios.post("http://localhost:8009/api/users/uurl", newus);
      setError(false);
      setSuccess(true);
        setUrl(url1);
        myStorage.setItem("url", url1);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }
  const upname = async(event) =>{
    setuname(event.target.value);
  }
  const upnameclick = async(e) =>{
    e.preventDefault();
    let newus={
      HUser:currentUsername,
      newname:uname
    };
    console.log(newus)
    try {

      await axios.post("http://localhost:8009/api/users/uname", newus);
      alert("name  updated")
      setError(false);
      setSuccess(true);
      myStorage.setItem("user", uname);
        setCurrentUsername(uname);
      await axios.post("http://localhost:8009/api/pins/updatepinname", newus);
      await axios.post("http://localhost:8009/api/items/itemupdate", newus);
      await axios.post("http://localhost:8009/api/web3/hawkerupdate", newus)
       

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

      await axios.post("http://localhost:8009/api/users/updatepass", newus);
      
        setError(false);
        setSuccess(true);
        alert("updated password")
      
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  //////////////////////////////////////////
  return (
    <>
      <Modal
        className="mode"
        open={open}
        onClose={onCloseModal}
        closeOnOverlayClick={false}
        center={true}
        closeIcon={<RxCross2 style={{ color: "white", fontSize: "25px" }} />}
      >
        <div className="moddd">
          <div className="mod-top">Please select your local language </div>
          <select value={lang} onChange={handleChange}>
            {languages.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </select>
        </div>
      </Modal>
      <Modal
        className="mode"
        open={open1}
        onClose={onCloseModal1}
        closeOnOverlayClick={false}
        center={true}
        closeIcon={<RxCross2 style={{ color: "white", fontSize: "25px" }} />}
      >
        <div className="loginn">
          <Login
            setUrl={setUrl}
            setBlocked={setBlocked}
            setShowLogin={onCloseModal1}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
            userName={t("n22")}
            password={t("n21")}
            heading={t("n25")}
            login={t("b2")}
            wrong={t("n29")}
          />
        </div>
      </Modal>
      <Modal
        className="mode"
        open={open2}
        onClose={onCloseModal2}
        closeOnOverlayClick={false}
        center={true}
        closeIcon={<RxCross2 style={{ color: "white", fontSize: "25px" }} />}
      >
        <div className="reginn">
        <Register
            setShowRegister={onCloseModal2}
            username={t("n22")}
            email={t("n23")}
            password={t("n21")}
            heading={t("n24")}
            register={t("b3")}
            aadhar={t("n27")}
            mobile={"Mobile number"}
            otp={"Otp"}
            upload={t("n28")}
            successful={t("n30")}
            wrong={t("n29")}
          />
        </div>
      </Modal>
      <Modal open={open3} onClose={onCloseModal3} center closeIcon={<RxCross2 style={{ color: "white", fontSize: "25px" }} />}>
      <div style={{color:"white"}}>Username: <span style={{fontWeight:"600",textAlign:"center"}}>{currentUsername}</span> <br />
      Profilepic: <img style={{width:"30px", height:"30px", borderRadius:"50%", marginTop:"2.5vh",marginBottom:"2.5vh"}} src={url} alt="alt" /></div>
      <div style={{color:"white",marginTop:"2.5vh",marginBottom:"2.5vh"}}>To see the update please relogin with the updated details</div> <br />
      
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Update name & profile pic.">
      <div className='photo199'>
            <input type='text' placeholder="Insert your name" className="insert199" onChange={upname} />
            <button className='update199' onClick={upnameclick}>UPDATE</button>
        </div>
        <div className='username199'>
        <label style={{color:"white",border:"none"}}>Upload</label>
            <input
              type="file"
              required
              onChange={submitOne1} />
              
        
        {success && (
          <span className="success">Updated !</span>
        )}
              {error && <span className="failure">Something is wrong !</span>}
            <button className='update199' onClick={upUrl}>UPDATE</button>
        </div>
      </Tab>
      <Tab eventKey="profile" title="Change password">
      <div className='photo199'>
            <input type='text' placeholder="Insert your old password" className="insert199" onChange={upoldpass} />
            
        </div>
        <div className='photo199'>
        <input type='text' placeholder="Insert your new password" className="insert199" onChange={upnewpass} />
            
            
        </div>
        {success && (
          <span className="success">Updated !</span>
        )}
              {error && <span className="failure">Something is wrong !</span>}
        <button className='update199' onClick={upPass}>UPDATE</button>
      </Tab>
      </Tabs>
        
      </Modal>
      <ToastContainer />
 
      <BNavbar
        url={url}
        user={currentUsername}
        changeTab={changeTab}
        num={noteIns.length}
      />
      {tab === 0 ? (
        <>
          <div className="parentcon1">
            <div className="mapdiv">
              <ReactMapGL
                className="mapwidth"
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoiYmlzd2EwMDd4IiwiYSI6ImNsZWprNGs3YzBjOGczb21pZzc5cjJqczIifQ.JS_Zgjwbm9RDW9H8KmGqKg"
                width={screenWidth > 800 ? "54vw" : "95vw"}
                height="60vh"
                transitionDuration="200"
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                onViewportChange={(viewport) => setViewport(viewport)}
                // onDblClick={currentUsername && handleAddClick}
              >
                <Marker
                  latitude={per.lat}
                  longitude={per.long}
                  offsetLeft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                  // onClick={() => {
                  //   handleSubmit();
                  // }}
                >
                  <Room
                    style={{
                      fontSize: 5 * viewport.zoom,
                      color: "blue",
                      cursor: "pointer",
                    }}
                  />
                </Marker>
                {pins.map((p) => (
                  <>
                    {p.blocked ? (
                      <></>
                    ) : (
                      <>
                        <Marker
                          latitude={p.lat}
                          longitude={p.long}
                          offsetLeft={-3.5 * viewport.zoom}
                          offsetTop={-7 * viewport.zoom}
                        >
                          <Room
                            style={{
                              fontSize: 5 * viewport.zoom,
                              color:
                                currentUsername === p.username
                                  ? "tomato"
                                  : "slateblue",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleMarkerClick(p._id, p.lat, p.long)
                            }
                          />
                        </Marker>
                      </>
                    )}
                    {p._id === currentPlaceId && (
                      <Popup
                        key={p._id}
                        latitude={p.lat}
                        longitude={p.long}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setCurrentPlaceId(null)}
                        anchor="left"
                      >
                        <div className="card">
                          <label>{t("n1")}</label>
                          <h4 className="place">{p.title}</h4>
                          <label>{t("n2")}</label>
                          <p className="desc">{p.desc}</p>
                          <label>{t("n3")}</label>
                          <p className="items">
                            {p.items.map((item, key) => (
                              <span key={key}>{item}, </span>
                            ))}
                          </p>
                          <label>{t("n4")}</label>
                          <p className="username">{p.username} </p>
                        </div>
                      </Popup>
                    )}
                  </>
                ))}

                {/* added code */}

                {noteIns.map((p) => (
                  <>
                    <Marker
                      latitude={p.Lat}
                      longitude={p.Long}
                      offsetLeft={-3.5 * viewport.zoom}
                      offsetTop={-7 * viewport.zoom}
                    >
                      <Room
                        style={{
                          fontSize: 5 * viewport.zoom,
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => handleMarkerClick(p._id, p.Lat, p.Long)}
                      />
                    </Marker>
                    {p._id === currentPlaceId && (
                      <Popup
                        key={p._id}
                        latitude={p.Lat}
                        longitude={p.Long}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => setCurrentPlaceId(null)}
                        anchor="left"
                      >
                        <div className="card">
                          <label>Customer name:</label>
                          <h4 className="place">{p.CUser}</h4>
                          <label>Message:</label>
                          <p className="desc">{p.Message}</p>
                          <label>Your Stage</label>
                          <p className="username">{p.HawkerStage} </p>
                        </div>
                      </Popup>
                    )}
                  </>
                ))}

                {/* added code */}
                {check && (
                  <>
                    <Marker
                      latitude={newPlace.lat}
                      longitude={newPlace.long}
                      offsetLeft={-3.5 * viewport.zoom}
                      offsetTop={-7 * viewport.zoom}
                    >
                      <Room
                        style={{
                          fontSize: 7 * viewport.zoom,
                          color: "tomato",
                          cursor: "pointer",
                        }}
                      />
                    </Marker>
                  </>
                )}
              </ReactMapGL>
            </div>
            <div className="writeup">
              <div className="writeuph">
                <h2 style={{ color: "white",textShadow:"2px 2px black",fontWeight:"600" }}>{t("line1")}</h2>
              </div>
              <span style={{ color: "white",fontWeight:"600" }}>{t("line2")}</span>
              <div className="busi_buttons">
                <div className="btn_div">
                  <button
                    className="btn_start"
                    style={{ background: "#00d3ad", border: "none" }}
                    onClick={() => {
                      const element = document.getElementById("gets");
                      element.scrollIntoView();
                    }}
                  >
                    {t("b1")} 
                    {/* //get started */}
                  </button>
                </div>

                {currentUsername && (
                  <div className="btn_div">
                    {/* <button onClick={onOpenModal3}>Open modal</button>  */}
                    <Button variant="success" onClick={onOpenModal3}>Update Profile</Button>{' '}

                    <button
                      className="btn_start"
                      style={{
                        background: "#5553B7",
                        color: "white",
                        borderRadius: "7px",
                        border: "none",
                      }}
                    >
                      {t("n5")} &nbsp;
                      <ReactSwitch
                        offColor="#bebebe"
                        onColor="#47aaf2"
                        // style={(checked)?{backgroundColor:"#47aaf2"}:{backgroundColor:"white"}}
                        checked={checked}
                        onChange={handleChange1}
                      />
                    </button>
                  </div>
                )}

                {currentUsername ? (
                  <div className="btn_div">
                    <button
                      className="btn_start login"
                      onClick={handleLogout}
                      style={{ backgroundColor: "#d40000", border: "none" }}
                    >
                      {t("b4")}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="btn_div">
                      <button
                        className="btn_start login"
                        onClick={() => onOpenModal1()}
                      >
                        {t("b2")}
                      </button>
                    </div>
                    <div className="btn_div">
                      <button
                        className="btn_start register"
                        onClick={() => onOpenModal2()}
                      >
                        {t("b3")}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
                <>
                  <div>
                    {checked && currentUsername !== null && (
                      <>
                        <div className="busi_forms">
                          <label
                            className="labelb"
                            style={{ color: "#818181", textDecoration: "none" }}
                          >
                            {t("n16")}:
                          </label>
                          <select
                            value={title}
                            onChange={async (e) => {
                              setTitle(e.target.value);
                              myStorage.setItem("Title", e.target.value);
                              handleSubmit3();
                            }}
                          >
                            <option value="">{t("n6")}</option>
                            <option value="Ice-Cream-Seller">{t("n7")}</option>
                            <option value="Vegetables/Fruits-Seller">
                              {t("n8")}
                            </option>
                            <option value="Cobbler">{t("n9")}</option>
                            <option value="Recycle">{t("n10")}</option>
                            <option value="Street-Food-Vendor">
                              {t("n11")}
                            </option>
                            <option value="Fish-Seller">{t("n12")}</option>
                            <option value="Electrician">{t("n13")}</option>
                            <option value="Bakery">{t("n14")}</option>
                            <option value="All-in-one-store">{t("n15")}</option>
                          </select>
                          <label className="labelb">{t("n17")}:</label>
                          <textarea
                            value={desc}
                            placeholder="Give a description about your business"
                            onChange={(e) => {
                              setDesc(e.target.value);
                              myStorage.setItem("Desc", e.target.value);
                              handleSubmit3();
                            }}
                          />
                          {/* <label>Items</label>
                  <textarea
                    placeholder="What items are you selling" /> */}
                          <label className="labelb">{t("n18")}</label>
                          <TodoList
                            setCurrentUsername={currentUsername}
                            todoChange={todoChange}
                            todoDelete={todoDelete}
                          />
                          <button
                            className="btn_start submit"
                            onClick={(e) => handleFormSubmit(e)}
                          >
                            {t("n19")}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
            </div>
          </div>
          <div id="gets" className="videobusi">
            {/* <GetStarted lang={lang} data-aos="fade-up" /> */}
            <Video url="https://www.youtube.com/watch?v=LapOdjjjJgQ" text={t("n20")} />
          </div>
        </>
      ) : tab === 1 ? (
        <>
          <BCurrentorders user={currentUsername} />{" "}
        </>
      ) : (
        <>
          <BPastorders user={currentUsername} />
        </>
      )}
      <FAQH />
      <Footer />
    </>
  );
}

export default Buisness;
