import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";
const Modal = ({ isOpen, setIsOpen }) => {
  const [isValid, setIsValid] = useState(false);
  const modalRef = useRef(null);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phoneNum: "",
    dob: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateData = () => {
    const today = new Date();
    const birthDate = new Date(userDetails.dob);
    console.log(birthDate, today);
    if (userDetails.username === "" || userDetails.email === "") {
      console.log("Username and email are required.");
      setIsValid(false);
    } else if (
      userDetails.phoneNum === "" ||
      userDetails.phoneNum.length < 10
    ) {
      alert("Invalid phone number. Please enter a 10-digit phone number");
      setIsValid(false);
    } else if (
      birthDate.getFullYear() > today.getFullYear() ||
      birthDate.getFullYear() == today.getFullYear()
    ) {
      setIsValid(false);
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      setIsValid(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setUserDetails({
        username: "",
        email: "",
        phoneNum: "",
        dob: "",
      });
    }
  };

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // handleCloseModal();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    // <div className='modal_container' onClick={() => isOpen((prev) => !prev)}>
    <div className='modal'>
      <div className='modal-content' ref={modalRef}>
        <h3>Fill Details</h3>
        <form onSubmit={handleSubmit}>
          {/* <div className='form'> */}
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            required
            autoComplete='off'
            name='username'
            value={userDetails.username}
            placeholder='User name'
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor='email'>Email Address:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={userDetails.email}
            required
            autoComplete='off'
            onChange={(e) => handleChange(e)}
            placeholder='example@example.com'
          />
          <label htmlFor='phonenumber'>Phone Number:</label>
          <input
            type='tel'
            id='phone'
            name='phoneNum'
            value={userDetails.phoneNum}
            pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
            // required
            autoComplete='off'
            onChange={(e) => handleChange(e)}
            placeholder='1234567890'
          />
          <label htmlFor='birthdaytime'>Date of Birth:</label>
          <input
            type='date'
            id='dob'
            name='dob'
            value={userDetails.dob}
            required
            autoComplete='off'
            onChange={(e) => handleChange(e)}
          />
          <button
            className='submit-button'
            type='submit'
            onClick={validateData}
          >
            Submit
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Modal;
