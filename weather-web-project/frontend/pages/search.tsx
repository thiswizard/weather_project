import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';

// 도시명 → 기상청 격자 좌표 매핑
const cityToGrid: Record<string, { nx: number; ny: number }> = {
  서울: { nx: 60, ny: 127 },
  부산: { nx: 98, ny: 76 },
  대구: { nx: 89, ny: 90 },
  인천: { nx: 55, ny: 124 },
  광주: { nx: 58, ny: 74 },
  대전: { nx: 67, ny: 100 },
  울산: { nx: 102, ny: 84 },
};

// 날씨 데이터를 담을 타입 정의
interface WeatherData {
  city: string;
  temperature: string;
  humidity: string;
  wind: string;
  precipitation: string;
}

// 기상청 API 호출 함수
const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const location = cityToGrid[city];
  if (!location) throw new Error('지원하지 않는 도시입니다.');

  const { nx, ny } = location;
  const serviceKey = "UIFz6u5b8bJPQCEe98WRZgMNq4Fav1AbgmNnT7jCdsleZcPDqIiD646wbc1iJJ6Zdz0Vw1xmPcGjTMRLL9kT3Q%3D%3D";

  const now = new Date();
  const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
  const hours = now.getHours().toString().padStart(2, '0') + '00';
  const baseTime = hours;

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&numOfRows=10&pageNo=1&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}&dataType=JSON`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('API 요청 실패');

  const json = await response.json();
  const items = json.response.body.items.item;

  const result: Record<string, string> = {};
  for (const item of items) {
    result[item.category] = item.obsrValue;
  }

  return {
    city,
    temperature: result['T1H'],
    humidity: result['REH'],
    wind: result['WSD'],
    precipitation: result['PTY'],
  };
};

const Search = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) {
      setError('도시 이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchWeatherData(city.trim());
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || '날씨 정보를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        날씨 검색
      </Typography>
      <TextField
        label="도시 이름 (예: 서울)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
        검색
      </Button>

      {loading && <CircularProgress sx={{ marginTop: 2 }} />}
      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {weatherData && (
        <div style={{ marginTop: 20 }}>
          <Typography variant="h6">{weatherData.city} 현재 날씨</Typography>
          <Typography variant="body1">🌡️ 온도: {weatherData.temperature}°C</Typography>
          <Typography variant="body1">💧 습도: {weatherData.humidity}%</Typography>
          <Typography variant="body1">🌬️ 풍속: {weatherData.wind} m/s</Typography>
          <Typography variant="body1">
            ☔ 강수: {weatherData.precipitation === '0' ? '없음' : '있음'}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default Search;
