import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { logAction } from '../../../Logging_Middleware/logger.js';

export default function UrlShortenerPage() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  // Load stored links from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('shortUrls');
    if (stored) {
      setLinks(JSON.parse(stored));
    }
  }, []);

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 7);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!url.trim()) return;
  
    const shortCode = generateShortCode();
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // expires in 7 days
  
    const newLink = {
      original: url,
      shortCode,
      expiry: expiry.toISOString(),
      clicks: [],
    };
  
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    localStorage.setItem('shortUrls', JSON.stringify(updatedLinks));
    setUrl('');
  
    // ✅ Logging happens here
    logAction('SHORTEN', {
      originalUrl: url,
      shortCode: shortCode,
      expiry: expiry.toISOString()
    });
  };
  
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>🔗 URL Shortener</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Shorten URL</Button>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Shortened Links</Typography>
        {links.length === 0 && <Typography>No links yet.</Typography>}
        {links.map((link, idx) => (
          <Box key={idx} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography><strong>Original:</strong> {link.original}</Typography>
            <Typography>
              <strong>Short URL:</strong>{' '}
              <a href={`/${link.shortCode}`} target="_blank" rel="noopener noreferrer">
                https://{link.shortCode}
              </a>
            </Typography>
            <Typography><strong>Expires:</strong> {new Date(link.expiry).toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Link to="/stats">📊 View Stats</Link>
      </Box>
    </Box>
  );
}
