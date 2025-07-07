export const logAction = (type, details = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    details,
  };

  const existingLogs = JSON.parse(localStorage.getItem('logs')) || [];
  existingLogs.push(log);
  localStorage.setItem('logs', JSON.stringify(existingLogs));
};
