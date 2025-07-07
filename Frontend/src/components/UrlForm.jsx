import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { log } from '../../../Logging_Middleware/logger.js';

function generateShortCode() {
  return Math.random().toString(36).substring(2, 7);
}

export default function UrlForm({ onShorten }) {
  const [urls, setUrls] = useState(['']);

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddInput = () => {
    if (urls.length < 5) setUrls([...urls, '']);
  };

  const handleShorten = () => {
    const shortLinks = urls.map((url) => {
      const shortCode = generateShortCode();
      const expiry = new Date(Date.now() + 30 * 60000); // default 30 mins
      log(`Shortened URL: ${url} to /${shortCode}`);
      return {
        original: url,
        shortCode,
        expiry: expiry.toISOString(),
        clicks: []
      };
    });
    localStorage.setItem('shortLinks', JSON.stringify(shortLinks));
    onShorten(shortLinks);
  };

  return (
    <Box>
      {urls.map((url, index) => (
        <TextField
          key={index}
          label={`URL ${index + 1}`}
          value={url}
          onChange={(e) => handleChange(index, e.target.value)}
          fullWidth
          margin="normal"
        />
      ))}
      <Button onClick={handleAddInput} disabled={urls.length >= 5}>Add URL</Button>
      <Button variant="contained" onClick={handleShorten}>Shorten</Button>
    </Box>
  );
}