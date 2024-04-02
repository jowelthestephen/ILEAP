import React from 'react'
import { storage } from '../config/firebase'
import { useState } from 'react'
import {ref, uploadBytes} from "firebase/storage"
import {v4} from 'uuid'

const  ImageUpload = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null);

    const uploadImage = () => {
      console.log(selectedValue)
      if (imageUpload == null) return;
      const imageRef = ref(storage, `${selectedValue}/${imageUpload.name + v4()}`)
      uploadBytes(imageRef, imageUpload).then(() => {
        alert("Image Uploaded")
      })
    }

     const handleRadioChange = (value) => {
       setSelectedValue(value);
     };

  return (
    <div className='aaa'>
       <div className='bft'>
        <h1>4. Make the file is of type png or jpg</h1>
        <h1>5. Upload the file</h1>
        <h1>6. Choose the file you're uploading</h1>
        <h1>7. Click submit</h1>
       </div>
      <input className='cff'
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
      />
      <div className='labll'>

        <label >
          <input
            type="radio"
            value="Information"
            checked={selectedValue === "Information"}
            onChange={() => handleRadioChange("Information")}
          />
          Student Information form
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="STfeedback"
            checked={selectedValue === "STfeedback"}
            onChange={() => handleRadioChange("STfeedback")}
          />
          Student Feedback Form
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="SVfeedback"
            checked={selectedValue === "SVfeedback"}
            onChange={() => handleRadioChange("SVfeedback")}
          />
          SV feedback
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="Grades"
            checked={selectedValue === "Grades"}
            onChange={() => handleRadioChange("Grades")}
          />
          Grades Form
        </label>
        <br />
      </div>

      <button className='subsub' onClick={uploadImage}>Submit</button>
    </div>
  );
}

export default  ImageUpload