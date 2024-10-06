import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
  role: 'student' | 'staff';
}

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const url = data.role === 'staff' ? 'http://localhost:5000/staff/create' : 'http://localhost:5000/student/create';

    try {
      await axios.post(url, data);
      alert('User created successfully');
      if (data.role === 'staff') {
        navigate('/staff-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Error creating user', error);
      alert('Failed to create user');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField label="Name" fullWidth {...register('name', { required: true })} error={!!errors.name} helperText={errors.name && "Name is required"} />
        <TextField label="Email" fullWidth type="email" {...register('email', { required: true })} error={!!errors.email} helperText={errors.email && "Email is required"} />
        <TextField label="Contact" fullWidth type="number" {...register('contactNumber', { required: true })} error={!!errors.contactNumber} helperText={errors.contactNumber && "Contact number is required"} />
        <TextField label="Password" fullWidth type="password" {...register('password', { required: true })} error={!!errors.password} helperText={errors.password && "Password is required"} />
        <RadioGroup row>
          <FormControlLabel value="student" control={<Radio />} label="Student" {...register('role', { required: true })} />
          <FormControlLabel value="staff" control={<Radio />} label="Staff" {...register('role', { required: true })} />
        </RadioGroup>
        <Button variant="contained" color="primary" type="submit">Create</Button>
      </form>
    </div>
  );
}

export default Signup;