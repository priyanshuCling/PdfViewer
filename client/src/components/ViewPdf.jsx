import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPdf = () => {
  const { id } = useParams();
  const [pdfPath, setPdfPath] = useState("");
  const [newPdfFile, setNewPdfFile] = useState(null);
  const [newPdfUrl, setNewPdfUrl] = useState("");

  useEffect(() => {
    const fetchPdfPath = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pdfs/${id}`
        );
        setPdfPath(response.data.pdfPath);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPdfPath();
  }, [id]);

  const handleFileChange = (e) => {
    setNewPdfFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!newPdfFile) return;
    const pdfUrl = URL.createObjectURL(newPdfFile);
    setNewPdfUrl(pdfUrl);
  };

  return (
    <div className="flex w-full mt-20 lg:mt-10">
      <div className="w-[18%]"></div>
      <div className="flex justify-center items-center h-screen w-[80%]">
        <div className="w-full lg:flex lg:flex-row flex-col justify-between h-screen">
          <div className="lg:w-1/2 w-full border p-4 ">
            <h2 className="text-lg font-bold mb-10">Existing PDF</h2>
            {pdfPath && (
              <embed
                src={`http://localhost:5000/${pdfPath}`}
                width="100%"
                height="750"
                type="application/pdf"
              />
            )}
          </div>
          <div className="lg:w-1/2 w-full border p-4 h-auto">
            <h2 className="text-lg font-bold">Upload New PDF</h2>
            <div className="flex justify-between p-1">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Display New PDF
              </button>
            </div>
            {newPdfUrl && (
              <embed
                src={newPdfUrl}
                width="100%"
                height="750"
                type="application/pdf"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPdf;
