"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  Paper
} from '@mui/material';
import { Lock, Person, HowToReg } from '@mui/icons-material';

const LoginPage = () => {
  const router = useRouter();
  const [isManager, setIsManager] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    // Keep your existing API call logic here
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 400,
          mt: 12,
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Lock sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            {isLogin ?
              `${isManager ? 'Manager' : 'User'} Login` :
              `${isManager ? 'Manager' : 'User'} Registration`
            }
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {!isLogin && (
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
              }}
              required
            />
          )}

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <Person sx={{ color: 'action.active', mr: 1 }} />
            }}
            required
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <Lock sx={{ color: 'action.active', mr: 1 }} />
            }}
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, py: 1.5 }}
            startIcon={isLogin ? <Lock /> : <HowToReg />}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color="secondary"
              onClick={() => setIsManager(!isManager)}
              sx={{ textTransform: 'none' }}
            >
              Switch to {isManager ? 'User' : 'Manager'}
            </Button>

            <Button
              color="secondary"
              onClick={() => setIsLogin(!isLogin)}
              sx={{ textTransform: 'none' }}
            >
              {isLogin ? 'Create Account' : 'Existing User? Login'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;