// pages/login.tsx

import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

const Login = () => { // 함수형 컴포넌트
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출시 페이지 새로고침 막기
    console.log('로그인 정보:', { email, password });
  };

  return (
    <Container maxWidth="xs" sx={{textAlign:'center'}}>
      <Typography variant="h3">
        로그인
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="이메일"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        <TextField
          label="비밀번호"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          로그인
        </Button>
        <Typography variant='h5' sx={{mt:3}}>
        회원가입
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
