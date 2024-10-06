import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  resume: string;
}

const Staff: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/staff/uploads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Staff Dashboard</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id} className="mb-4">
            <div>Name: {student.name}</div>
            <div>Email: {student.email}</div>
            <div>Contact: {student.contactNumber}</div>
            <div>
              <a href={`http://localhost:5000/uploads/${student.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Staff;