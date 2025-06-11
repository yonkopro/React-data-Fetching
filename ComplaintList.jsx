import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import '../App.css'
function ComplaintList(){
    const [complaints, setComplaints] = useState([]);

    useEffect(() =>{
        const getComplaintList = async() =>{
            try{
                const response = await axios.get('http://localhost:3001/complaint');
                setComplaints(response.data);
            }catch(error){
                console.log("Error fetching complaints: ", error)
            }
        };
        getComplaintList();
    }, []);


    return (
    <div className="complaint-list-container">
      <h2 className="complaint-list-title">Complaint List</h2>
      <div className="table-wrapper">
        <table className="complaint-table">
          <thead>
            <tr>
              <th>Complaint Name</th>
              <th>Reason</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={index}>
                <td>{complaint.complaintName}</td>
                <td>{complaint.complaintReason}</td>
                <td>{complaint.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintList;