import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { logAction } from '../../../Logging_Middleware/logger.js';

export default function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shortUrls')) || [];
    const link = data.find((item) => item.shortCode === shortcode);

    if (!link) {
      alert("Short URL not found!");
      window.location.href = "/";
      return;
    }

    // Track click
    link.clicks = link.clicks || [];
    const timestamp = new Date().toISOString();
    link.clicks.push({ timestamp });

    // Save updated data
    localStorage.setItem('shortUrls', JSON.stringify(data));

    // ✅ Log redirect action
    logAction('REDIRECT', {
      shortCode: shortcode,
      redirectedTo: link.original,
      timestamp,
    });

    // Redirect
    window.location.href = link.original;
  }, [shortcode]);

  return (
    <div>
      <h3>Redirecting...</h3>
    </div>
  );
}
