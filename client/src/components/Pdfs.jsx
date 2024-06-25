import { GrFormView } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Pdfs = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(
          "https://pdf-viewer-backend-neon.vercel.app/api/pdfs"
        );
        setPdfs(response.data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setError("Error fetching PDFs. Please try again.");
      }
    };

    fetchPdfs();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setError("");
    setSuccess("");
  };

  const handleAddPdf = (pdf, id) => {
    if (id) {
      setPdfs(pdfs.map((p) => (p._id === id ? pdf : p)));
    } else {
      setPdfs([...pdfs, pdf]);
    }
    setModalOpen(false);
    setSuccess("PDF added/updated successfully!");
  };

  const handleEdit = (pdf) => {
    setEditData(pdf);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://pdf-viewer-backend-neon.vercel.app/api/pdfs/${id}`
      );
      setPdfs(pdfs.filter((pdf) => pdf._id !== id));
      setSuccess("PDF deleted successfully!");
    } catch (error) {
      console.error("Error deleting PDF:", error);
      setError("Error deleting PDF. Please try again.");
    }
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row ml-20">
      <div className="lg:w-[13%]"></div>
      <div className="pt-20 w-full lg:w-[70%] mx-auto">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h1 className="text-2xl">PDFs</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border hidden lg:table">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 py-2 px-4">Name of Person</th>
                <th className="w-1/4 py-2 px-4">Old PDF</th>
                <th className="w-1/4 py-2 px-4">New PDF</th>
                <th className="w-1/4 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pdfs.map((pdf, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="border py-2 px-4">{pdf.nameOfPerson}</td>
                  <td className="border py-2 px-4">{pdf.nameOfOldPdf}.pdf</td>
                  <td className="border py-2 px-4">{pdf.nameOfNewPdf}.pdf</td>
                  <td className="border py-2 px-4">
                    <div className="flex justify-around">
                      <button
                        className="text-blue-500 hover:text-blue-700 text-3xl"
                        onClick={() => handleView(pdf._id)}
                      >
                        <GrFormView />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 text-xl"
                        onClick={() => handleEdit(pdf)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 text-xl"
                        onClick={() => handleDelete(pdf._id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="lg:hidden">
            {pdfs.map((pdf, index) => (
              <div key={index} className="border p-4 mb-4">
                <div className="mb-2">
                  <strong>Name of Person: </strong>
                  {pdf.nameOfPerson}
                </div>
                <div className="mb-2">
                  <strong>Name of Old PDF: </strong>
                  {pdf.nameOfOldPdf}.pdf
                </div>
                <div className="mb-2">
                  <strong>Name of New PDF: </strong>
                  {pdf.nameOfNewPdf}.pdf
                </div>
                <div className="flex justify-around">
                  <button
                    className="text-blue-500 hover:text-blue-700 text-3xl"
                    onClick={() => handleView(pdf._id)}
                  >
                    <GrFormView />
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700 text-xl"
                    onClick={() => handleEdit(pdf)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 text-xl"
                    onClick={() => handleDelete(pdf._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddPdf}
          existingData={editData}
        />
      </div>
    </div>
  );
};

export default Pdfs;
