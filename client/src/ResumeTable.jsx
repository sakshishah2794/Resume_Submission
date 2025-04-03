import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeTable = () => {
  const [resumes, setResumes] = useState([]); // State to store resumes

  useEffect(() => {
    // Fetch resumes when the component mounts
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/api/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    fetchResumes();
  }, []);

  return (
    <table>
      {/* Table headers */}
      {/* ... */}
      <tbody>
        {resumes.map((resume) => (
            <tr key={resume._id}>
              <td>{resume.name}</td>
              <td>{resume.email}</td>
              <td>
                <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer">
                  View/Download
                </a>
              </td>
            </tr>
          ))}
        
      </tbody>
    </table>
  );
};

export default ResumeTable;