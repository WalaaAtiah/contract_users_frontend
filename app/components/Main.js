"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Swal from 'sweetalert2'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./main.css"
import Update from "./Update"

// import Update from "./Update";



export default function Todo() {
  const { tokens, refresh } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [userid, setuserid] = useState(null)
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [configstate, setconfig] = useState(null);


  const [flagForm, setFlagForm] = useState(false);
  const [moduleFlag, setModuleFlag] = useState(false);
  const [userInfo, setUserInfo] = useState([]);



  const url = `http://127.0.0.1:8000/`;

  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)

    const access = localStorage.getItem("access");
    setAccessString(access)
    const id = localStorage.getItem("userid");
    setAccessString(id)

    refresh(refresh_string);

    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };
    setconfig(config)
    axios
      .get(`${url}api/v1/client/list`, config)
      .then((result) => {
        setData(result.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




  const activeUser = []
  const NotActiveUser = []

  data.forEach(item => {
    if (item.Status == "Active") {
      activeUser.push(item)
    } else {
      NotActiveUser.push(item)
    }

  });
  let lingthactiveUser = activeUser.length
  let lengthNotActive = NotActiveUser.length



  const CreateHandler = () => {
    setFlagForm(true)
  };

  const closeForm = () => {
    setFlagForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(configstate);

    setFlagForm(false);
    console.log("inside create")
    const obj = {
      Name: e.target.Name.value,
      Mobile: e.target.Mobile.value,
      Email: e.target.Email.value,
      Country: e.target.Country.value,
      City: e.target.City.value,
      Date_of_Birth: e.target.date.value || "YYYY-MM-DD",
      Contract_Start_Date: e.target.startdate.value,
      Contract_End_Date: e.target.enddate.value,
      Status: e.target.status.value,
      owner: userid || 1,
    };
    console.log(obj)
    axios
      .post(`${url}api/v1/client/list`, obj, configstate)
      .then((result) => {
        console.log(result.data);

        axios
          .get(`${url}api/v1/client/list`, configstate)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log("getdelete", err);
          });
      })
      .catch((err) => {
        const res = err.response.data
        console.log("postSide", res);

        if (res.hasOwnProperty("Contract_Date")) {
          Swal.fire({
            icon: 'error',
            text: `${res.Contract_Date}`,
          });
        }


      });
  };

  const openModule = (item) => {
    console.log('open module')
    setModuleFlag(true);
    setUserInfo(item);
  };

  const closeModule = () => {
    setModuleFlag(false);
  };

  const deleteTask = (id) => {

    console.log(configstate)

    console.log(`${url}api/v1/client/${id}/`);
    axios
      .delete(`${url}api/v1/client/${id}/`, configstate)
      .then((res) => {
        axios
          .get(`${url}api/v1/client/list`, configstate)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log("getdelete", err);
          });
      })
      .catch(function (err) {
        console.log("deleteSide", err);
      });
  };


  return (
    <>
      <button class="Create" onClick={CreateHandler}>Add New User</button>
      {flagForm &&
        <div className="flex justify-center w-8/12 py-4 border-solid rounded-3xl shadow-gray-300">
          <div className=" bg-[white] border-solid  md:w-full lg:w-full  m-4 p-4 rounded-xl shadow-xl w-full dark:bg-black">
            <button
              onClick={closeForm}
              className="float-right border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700 "
            >
              ❌
            </button>
            <form action="" onSubmit={handleSubmit}>
              <div className="flex justify-around pb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block mr-6 font-bold text-right text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      required
                      className="flex-1 py-2 text-right px-12 text-gray-600 border-b-2 border-gray-400 outline-none focus:border-[#263159] "
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block mr-6 font-bold text-right text-gray-600"
                    >
                      Mobile
                    </label>
                    <input
                      type="text"
                      id="Mobile"
                      name="Mobile"
                      className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                    />
                  </div>

                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block mr-6 font-bold text-right text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                    />
                  </div>

                  <div className="flex items-center mb-2 ">
                    <label
                      className="inline-block mr-6 font-bold text-right text-gray-600"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="Country"
                      name="Country"
                      className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400"
                    />
                  </div>

                  <div className="flex items-center mb-2 ">
                    <label
                      className="inline-block mr-6 font-bold text-right text-gray-600 "
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="City"
                      name="City"

                      className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 outline-none focus:border-[#263159]"
                    />
                  </div>
                </div>
                <div>

                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block font-bold text-right text-gray-600 "
                    >
                      Date_of_Birth
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="flex-1 py-2 text-right text-gray-600 border-b-2 "
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block font-bold text-right text-gray-600"
                    >
                      Contract Start Date
                    </label>
                    <input
                      type="date"
                      id="startdate"
                      name="startdate"
                      required
                      className="flex-1 py-2 text-right text-gray-600 border-b-2"
                    />
                  </div>

                  <div className="flex items-center mb-2">
                    <label
                      className="inline-block font-bold text-right text-gray-600"
                    >
                      Contract_End_Date
                    </label>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      required
                      className="flex-1 py-2 text-right text-gray-600 border-b-2 "
                    />
                  </div>

                  <div className="flex items-center mb-2 ">
                    <label
                      className="inline-block mr-4 font-bold text-right text-gray-600 "
                    >
                      Status
                    </label>
                    <select name="status" id="status" className="px-6 border-2">
                      <option value="Active">Active</option>
                      <option value="not Active">not Active</option>

                    </select>
                  </div>


                </div>

              </div>



              <div className="text-center">
                <button className="px-8 py-2 font-bold text-white shadow-2xl bg-[#263159] rounded-3xl hover:bg-[#9fa9c9] hover:text-[#251749]">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      }
      <section >
        <div className="flex justify-center mt-10">
          <h1 className="pl-2 text-2xl border-b-2 text-blod border-[#495579] w-36"> Active users </h1>

        </div>

        <div className="container mx-auto">
          <div className="flex items-center justify-center w-full h-full px-4 py-24 sm:py-8">
            {/* Carousel for desktop and large size devices */}

            {/* Carousel for mobile and Small size Devices */}
            <CarouselProvider className=" md:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={lingthactiveUser} visibleSlides={3} step={3} infinite={true}>
              <div className="relative flex items-center justify-center w-full">
                <ButtonBack role="button" aria-label="slide backward" className="absolute left-0 z-30 ml-8 cursor-pointer focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="prev">
                  <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div id="slider" className="flex items-center justify-start w-full h-full transition duration-700 ease-out lg:gap-8 md:gap-6">
                      {activeUser.map((item, i) => (

                        <Slide index={i}>
                          <h2 className="text-base leading-4 text-[#263159] lg:text-xl lg:leading-5"># {item.id}</h2>
                          <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                            <img src="assets/home.jpg" alt="black chair and white table" className="object-cover object-center w-full filter brightness-50 invert-0" />
                            <div className="absolute w-full h-full p-6 bg-gray-800 bg-opacity-30">
                              <h2 className="text-base leading-4 text-center text-white lg:text-xl lg:leading-5">Name :  {item.Name}</h2>
                              <div className="h-full px-6 py-4">
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Country/City : {item.Country}/{item.City}</h3>
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Contract_Start_Date : {item.Contract_Start_Date}</h3>
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Contract_End_Date : {item.Contract_End_Date}</h3>

                                <div className="flex justify-around">

                                  <button class="update" role="button" onClick={() => openModule(item)}>Update</button>
                                  <button class="delete" role="button" onClick={() => deleteTask(item.id)}>DELETE</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Slide>
                      ))}

                    </div>
                  </Slider>
                </div>
                <ButtonNext role="button" aria-label="slide forward" className="absolute right-0 z-30 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                  <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>


      </section>
      <section >
        <div className="flex justify-center mt-10">
          <h1 className="w-48 pl-2 text-2xl border-b-2 text-blod border-[#495579]"> Not Active Users </h1>

        </div>

        <div className="container mx-auto">
          <div className="flex items-center justify-center w-full h-full px-4 py-24 sm:py-8">
            {/* Carousel for desktop and large size devices */}

            {/* Carousel for mobile and Small size Devices */}
            <CarouselProvider className=" md:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={lengthNotActive} visibleSlides={3} step={3} infinite={true}>
              <div className="relative flex items-center justify-center w-full">
                <ButtonBack role="button" aria-label="slide backward" className="absolute left-0 z-30 ml-8 cursor-pointer focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="prev">
                  <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div id="slider" className="flex items-center justify-start w-full h-full transition duration-700 ease-out lg:gap-8 md:gap-6">
                      {NotActiveUser.map((item, i) => (

                        <Slide index={i}>
                          <h2 className="text-base leading-4 text-[#263159] lg:text-xl lg:leading-5"># {item.id}</h2>
                          <div className="relative flex flex-shrink-0 w-full sm:w-auto">
                            <img src="assets/home.jpg" alt="black chair and white table" className="object-cover object-center w-full filter brightness-50 invert-0" />
                            <div className="absolute w-full h-full p-6 bg-gray-800 bg-opacity-30">
                              <h2 className="text-base leading-4 text-center text-white lg:text-xl lg:leading-5">Name :  {item.Name}</h2>
                              <div className="h-full p-6 ">
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Country/City : {item.Country}/{item.City}</h3>
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Contract_Start_Date : {item.Contract_Start_Date}</h3>
                                <h3 className="py-2 text-lg font-semibold leading-5 text-white lg:text-lg lg:leading-6">Contract_End_Date : {item.Contract_End_Date}</h3>
                                <div className="flex justify-around">

                                  <button class="update" role="button" onClick={() => openModule(item)}>Update</button>
                                  <button class="delete" role="button" onClick={() => deleteTask(item.id)}>DELETE</button>
                                </div>

                              </div>
                            </div>
                          </div>
                        </Slide>
                      ))}

                    </div>
                  </Slider>
                </div>
                <ButtonNext role="button" aria-label="slide forward" className="absolute right-0 z-30 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                  <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>

      </section>
      <Update
        isOpen={moduleFlag}
        close={closeModule}
        userInfo={userInfo}
        setData={setData}
      />

    </>
  );
}



