"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import { MuiTelInput } from "mui-tel-input";
import PhoneInput from "react-phone-number-input";

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
function valuetext(value: number) {
  return `${value}°C`;
}
const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [phone, setPhone] = React.useState("");
  const [imageURL, setImageURL] = useState("");
  const [hotelData, setHotelData] = useState<any>({});

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputURL = event.target.value;
    const directURL = extractDirectImageURL(inputURL);
    setImageURL(directURL || "");
    console.log(directURL);
  };

  const extractDirectImageURL = (url: string) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const imageURLParam = urlParams.get("url");
    return imageURLParam || url;
  };
  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      ...hotelData,
      hotelImage: imageURL,
      hotelRating: value,
      hotelPhoneNumber: phone,
    };
    // console.log(formData)
    try {
      const response = await fetch("http://localhost:8000/api/hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Data submitted successfully");
        // console.log("Data submitted successfully");
      } else {
        console.error("Error submitting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto  pt-5">
      <div className="pb-5 flex">
        <div>
          {imageURL && (
            <img
              src={imageURL}
              style={{ width: "200px", height: "60px" }}
              alt="Hotel"
            />
          )}
        </div>

        <div className="ml-[30%] w-[70%]">
          <label
            htmlFor="hotelImage"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel main image link
          </label>
          <input
            type="text"
            name="hotelImage"
            id="hotelImage"
            className="mt-1 p-2 border rounded-3xl w-full"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="hotelName"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Name
          </label>
          <input
            type="text"
            name="hotelName"
            id="hotelName"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelAriName"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Ari Name
          </label>
          <input
            type="text"
            name="hotelAriName"
            id="hotelAriName"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div >
          <label
            htmlFor="hotelRating"
            className="block text-sm font-bold text-gray-700 mr-2"
          >
            Hotel Rating
          </label>
          <div className="flex items-center gap-5">
            <input
              type="number"
              value={value || 0}
              name="hotelRating"
              id="hotelRating"
              className="flex-grow p-2 border rounded-3xl mr-2 max-w-[110px]"
            />
            <Box
              sx={{
                "& > legend": { mb: 0 },
              }}
              className="gap-[-20px]"
            >
              <Rating name="simple-controlled" value={value} />
              <Box sx={{ width: 120 }}>
                <Slider
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  aria-label="Temperature"
                  defaultValue={1}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  shiftStep={30}
                  step={1}
                  marks
                  min={1}
                  max={5}
                />
              </Box>
            </Box>
          </div>
        </div>
        <div>
          <label
            htmlFor="hotelPhoneNumber"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Phone Number
          </label>
          <MuiTelInput
            value={phone}
            onChange={handleChange}
            className="mui-tel-input bg-white  outline-none p-1 h-10 border-none rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelEmail"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Email
          </label>
          <input
            type="email"
            name="hotelEmail"
            id="hotelEmail"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelFullAddress"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Full Address
          </label>
          <input
            type="text"
            name="hotelFullAddress"
            id="hotelFullAddress"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelLandmark"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel Landmark
          </label>
          <input
            type="text"
            name="hotelLandmark"
            id="hotelLandmark"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
        <div>
          <label
            htmlFor="hotelCitySlug"
            className="block text-sm font-bold text-gray-700"
          >
            Hotel City Slug
          </label>
          <input
            type="text"
            name="hotelCitySlug"
            id="hotelCitySlug"
            onChange={handleChange1}
            className="mt-1 p-2 border rounded-3xl w-full"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
