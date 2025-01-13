// import React from 'react'
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
// import {faCopy} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  //To toggle the password visibility
  const showPassword = () => {
    // alert("show the password  ");
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };
  //Save password to local storage
  const savePassword = () => {
    if (
      form.site.length > 8 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      
      toast.success("Password Saved!", { theme: "dark" });

      setform({ site: "", username: "", password: "" });
    } else {
      toast.error("Please enter valid details!", {theme: "dark"});
    }
  };

  //Edit password
  const editPassword = (id) => {
    console.log("Editing password with id: ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  //Delete password
  const deletePassword = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      console.log("Deleting password with id: ", id);
      const updatedPasswordArray = passwordArray.filter(
        (item) => item.id !== id
      );
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));

      toast.warn("Password Deleted!", { theme: "dark" });
    } else {
      console.log("Deletion canceled.");
    }
  };

  //Copy the text to clipboard
  const copyText = (text) => {
    // alert("copied to clipboard: "+text);
    toast.info("Copied to clipboard!", { theme: "dark" });
    navigator.clipboard.writeText(text);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* Toastify Toast */}
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:p-0 md:mycontainer min-h-[85.5vh]">
        {/* index.css */}
        {/* Name */}
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Key<span className="text-green-600">Sential/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your personalised and secure passwords manager
        </p>

        {/* Info Tiles */}
        <div className="text-black flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-lg border border-green-500 w-full px-4 py-2"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-5">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-lg border border-green-500 w-full px-4 py-2"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-lg border border-green-500 w-full px-4 py-2"
                type="pass"
                name="password"
                id="password"
              />
              <span
                className="absolute right-1 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={33}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          {/* Add Password Button */}
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              state="hover-rotation"
              colors="primary:#121331,secondary:#110a5c"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-2">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords Saved</div>}
          {/* Table from Table Layout in Tailwind readily available */}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-[5px]">Website URL</th>
                  <th className="py-[5px]">Username</th>
                  <th className="py-[5px]">Password</th>
                  <th className="py-[5px]">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* Website URL */}
                      <td className="py-[5px] text-center border border-gray-300">
                        <div className="flex items-center justify-center">
                          <a
                            href={item.site}
                            target="_blank"
                            // if I want the sites to be in blue
                            className="text-blue-500 underline"
                          >
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer ml-2"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </div>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-[5px] text-center border border-gray-300">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="cursor-pointer ml-2"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </div>
                        </div>
                      </td>

                      {/* Password */}
                      <td className="py-[5px] text-center border border-gray-300">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="cursor-pointer ml-2"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      {/* Edit */}
                      <td className="py-[5px] text-center border border-gray-300">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        {/* Delete */}
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/hwjcdycb.json"
                            trigger="hover"
                            stroke="bold"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
