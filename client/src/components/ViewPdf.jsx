import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPdf = () => {
  const { id } = useParams();
  const [oldPdfPath, setOldPdfPath] = useState("");
  const [newPdfPath, setNewPdfPath] = useState("");

  useEffect(() => {
    const fetchPdfPaths = async () => {
      try {
        const response = await axios.get(
          `https://pdfviewer-glf1.onrender.com/api/pdfs/${id}`
        );
        setOldPdfPath(response.data.oldPdfPath);
        setNewPdfPath(response.data.newPdfPath);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfPaths();
  }, [id]);

  return (
    <div className="flex w-full mt-20 lg:mt-10">
      <div className="w-[18%]"></div>
      <div className="flex justify-center items-center h-screen w-[80%]">
        <div className="w-full lg:flex lg:flex-row flex-col justify-between h-screen">
          <div className="lg:w-1/2 w-full border p-4">
            <h2 className="text-lg font-bold ">Existing PDF</h2>
            {oldPdfPath ? (
              <embed
                src={`https://pdfviewer-glf1.onrender.com/${oldPdfPath}`}
                width="100%"
                height="750"
                type="application/pdf"
              />
            ) : (
              <p>Loading old PDF...</p>
            )}
          </div>
          <div className="lg:w-1/2 w-full border p-4 h-auto">
            <h2 className="text-lg font-bold">New PDF</h2>
            {newPdfPath ? (
              <embed
                src={`https://pdfviewer-glf1.onrender.com/${newPdfPath}`}
                width="100%"
                height="750"
                type="application/pdf"
              />
            ) : (
              <p>Loading new PDF...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPdf;
