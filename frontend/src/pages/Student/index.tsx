import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const Student: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (resume) {
      const formData = new FormData();
      formData.append('resume', resume);
      formData.append('email', 'john.doe@example.com'); // Replace with actual user email

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/student/upload', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Resume uploaded successfully');
      } catch (error) {
        console.error('Upload failed', error);
        alert('Failed to upload resume');
      }
    } else {
      alert('Please select a file');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Student Dashboard</h2>
      <TextField label="Email" fullWidth type="email" value="john.doe@example.com" disabled />
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>Upload Resume</Button>
    </div>
  );
};

export default Student;