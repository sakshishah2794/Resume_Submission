import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create FormData to send data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('resume', resume);

    try {
      // Send data to the backend
      await axios.post('/api/resumes', formData);
      console.log('Resume submitted!');
    } catch (error) {
      console.error('Error submitting resume:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, and resume file */}
      {/* ... */}
    </form>
  );
};

export default ResumeForm;