import React, { useState } from "react";
import Modal from "./components/Modal/Modal";
import "./App.css";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='container'>
      <h1>User Details Modal</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>
      {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </div>
  );
};

export default App;
