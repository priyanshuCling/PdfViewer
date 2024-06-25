import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, existingData }) => {
  const [formData, setFormData] = useState({
    nameOfPerson: "",
    nameOfOldPdf: "",
    nameOfNewPdf: "",
    oldPdfFile: null,
    newPdfFile: null,
  });

  useEffect(() => {
    if (existingData) {
      setFormData({
        nameOfPerson: existingData.nameOfPerson,
        nameOfOldPdf: existingData.nameOfOldPdf,
        nameOfNewPdf: existingData.nameOfNewPdf,
        oldPdfFile: null,
        newPdfFile: null,
      });
    } else {
      setFormData({
        nameOfPerson: "",
        nameOfOldPdf: "",
        nameOfNewPdf: "",
        oldPdfFile: null,
        newPdfFile: null,
      });
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append(
      "nameOfPerson",
      formData.nameOfPerson || existingData.nameOfPerson
    );
    data.append(
      "nameOfOldPdf",
      formData.nameOfOldPdf || existingData.nameOfOldPdf
    );
    data.append(
      "nameOfNewPdf",
      formData.nameOfNewPdf || existingData.nameOfNewPdf
    );
    if (formData.oldPdfFile) {
      data.append("oldPdfFile", formData.oldPdfFile);
    }
    if (formData.newPdfFile) {
      data.append("newPdfFile", formData.newPdfFile);
    }

    try {
      if (existingData) {
        const response = await axios.put(
          `https://pdf-viewer-backend-ten.vercel.app/api/pdfs/${existingData._id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onSubmit(response.data, existingData._id);
      } else {
        const response = await axios.post(
          "https://pdf-viewer-backend-ten.vercel.app/api/pdfs",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onSubmit(response.data);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl mb-4">
          {existingData ? "Edit PDF" : "Add PDF"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block mb-1">Name of Person</label>
            <input
              type="text"
              name="nameOfPerson"
              className="w-full px-2 py-1 border"
              value={formData.nameOfPerson}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Name of Old PDF</label>
            <input
              type="text"
              name="nameOfOldPdf"
              className="w-full px-2 py-1 border"
              value={formData.nameOfOldPdf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Name of New PDF</label>
            <input
              type="text"
              name="nameOfNewPdf"
              className="w-full px-2 py-1 border"
              value={formData.nameOfNewPdf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Upload Old PDF</label>
            <input
              type="file"
              name="oldPdfFile"
              className="w-full px-2 py-1 border"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Upload New PDF</label>
            <input
              type="file"
              name="newPdfFile"
              className="w-full px-2 py-1 border"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              {existingData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
