import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Swal from 'sweetalert2'

export default function UpdateTask({ isOpen, close, userInfo, setData }) {
  const { tokens, refresh } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [userid, setUserId] = useState(null)




  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)
    refresh(refresh_string);
    console.log("update")

    const access = localStorage.getItem("access");
    setAccessString(access)
    const id = localStorage.getItem("userId")
    setUserId(id)

  }, [])





  const handleSubmit = (e) => {
    e.preventDefault();
    
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };
    console.log(config)
    const url = `http://127.0.0.1:8000/api/v1/client/`;
    const obj = {
      Name: e.target.Name.value,
      Mobile: e.target.Mobile.value,
      Email: e.target.Email.value,
      Country: e.target.Country.value,
      City: e.target.City.value,
      Date_of_Birth: e.target.date.value||"YYYY-MM-DD",
      Contract_Start_Date: e.target.startdate.value,
      Contract_End_Date: e.target.enddate.value,
      Status: e.target.status.value,
      owner: userid || 1,
    };
    console.log(`${url}${userInfo.id}/`)
    axios
      .put(`${url}${userInfo.id}/`, obj, config)
      .then((result) => {
        console.log(result.data);

        axios
          .get(`http://127.0.0.1:8000/api/v1/client/list`, config)
          .then((result) => {
            setData(result.data)
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const res=err.response.data
        console.log("updateSide", res);
        
      if (res.hasOwnProperty("Contract_Date")) {
          Swal.fire({
              icon: 'error',
              text: `${res.Contract_Date}`,
          });
      }
      
      });
    close();
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment} >
        <Dialog
          as="div"
          className="relative z-10 w-full"
          initialFocus={cancelButtonRef}
          onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-full text-lg oerflow-y-auto ">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 "
                enterTo="opacity-100 translate-y-0 "
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 "
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 "
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-3xl sm:my-2 ">
                  
                    <div className="w-full p-8 bg-white border-solid shadow-2xl rounded-3xl">
                      <button
                        onClick={close}
                        className="float-left border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700"
                      >
                        ❌
                      </button>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="flex justify-around pb-4">
                          <div className="mx-6">
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
                                defaultValue={userInfo.Name}
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
                                defaultValue={userInfo.Mobile}
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
                                defaultValue={userInfo.Email}
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
                                defaultValue={userInfo.Country}
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
                                defaultValue={userInfo.City}
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
                                defaultValue={userInfo.Date_of_Birth}
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
                                defaultValue={userInfo.Contract_Start_Date}
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
                                defaultValue={userInfo.Contract_End_Date}
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
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}