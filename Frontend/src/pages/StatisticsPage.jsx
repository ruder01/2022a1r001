import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { logAction } from '../../../Logging_Middleware/logger';


export default function StatisticsPage() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    logAction('VIEW_STATS'); // ✅ Logging middleware
  
    const stored = localStorage.getItem('shortUrls');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLinks(parsed);
      } catch (err) {
        console.error("Failed to parse shortUrls from localStorage:", err);
      }
    }
  }, []);
  

  if (!links || links.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5">📊 Link Statistics</Typography>
        <Typography>No short links found yet.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>📊 Link Statistics</Typography>
      {links.map((link, idx) => (
        <Box key={idx} sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography><strong>Original:</strong> {link.original}</Typography>
          <Typography>
            <strong>Short URL:</strong>{' '}
            <a
              href={`/${link.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
             https://{link.shortCode}
            </a>
          </Typography>
          <Typography><strong>Expires at:</strong> {new Date(link.expiry).toLocaleString()}</Typography>
          <Typography><strong>Total Clicks:</strong> {link.clicks?.length || 0}</Typography>

          {link.clicks && link.clicks.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2">Click Log:</Typography>
              {link.clicks.map((click, i) => (
                <Typography key={i} variant="body2">
                  - {new Date(click.timestamp).toLocaleString()} ({click.source || "direct"})
                </Typography>
              ))}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
