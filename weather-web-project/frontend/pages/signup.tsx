import React, { useState } from 'react'; // React , useState 사용하기
import { TextField, Button, Typography, Container } from '@mui/material'; // 필수 Next.js css 가져오기

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chkpassword, setChkpassword] = useState('');
  const [authemail, setAuthemail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
      <Typography variant="h5">회원가입</Typography>
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
          label="패스워드"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="패스워드 확인"
          variant="outlined"
          fullWidth
          margin="normal"
          value={chkpassword}
          onChange={(e) => setChkpassword(e.target.value)}
        />
        <TextField
          label="이메일 인증번호"
          variant="outlined"
          fullWidth
          margin="normal"
          value={authemail}
          onChange={(e) => setAuthemail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth>
          회원가입
        </Button>
        <Typography variant="h5" sx={{marginTop: 2}}>로그인</Typography>
      </form>
    </Container>
  );
};

export default Signup;
