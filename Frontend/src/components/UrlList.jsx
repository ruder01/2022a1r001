import { Box, Typography } from '@mui/material';

export default function UrlList({ links }) {
  return (
    <Box>
      {links.map((link, idx) => (
        <Box key={idx} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="body1"><strong>Original:</strong> {link.original}</Typography>
          <Typography variant="body1">
            <strong>Short URL:</strong>{' '}
            <a
              href={`/${link.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              https:{link.shortCode}
            </a>
          </Typography>

          <Typography variant="body2" color="text.secondary">
            <strong>Expires at:</strong> {new Date(link.expiry).toLocaleString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
