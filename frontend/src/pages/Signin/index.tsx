import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface FormData {
  email: string;
  password: string;
  role: 'student' | 'staff';
}

const Signin: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', data);
      localStorage.setItem('token', response.data.token);
      if (data.role === 'staff') {
        navigate('/staff-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border gap-2 border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Signin</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField label="Email" fullWidth {...register('email', { required: true })} error={!!errors.email} helperText={errors.email && "Email is required"} />
        <TextField label="Password" fullWidth type="password" {...register('password', { required: true })} error={!!errors.password} helperText={errors.password && "Password is required"} />
        <RadioGroup row>
          <FormControlLabel value="student" control={<Radio />} label="Student" {...register('role', { required: true })} />
          <FormControlLabel value="staff" control={<Radio />} label="Staff" {...register('role', { required: true })} />
        </RadioGroup>
        <Button variant="contained" color="primary" type="submit">Sign in</Button>
      </form>
      <Link to='/signup'>
        <Button variant="contained" color="primary">Signup</Button>
      </Link>
    </div>
  );
}

export default Signin;