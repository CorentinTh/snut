export { formatDuration };

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const parts = [];

  if (days > 0) {
    parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  }

  if (remainingHours > 0) {
    parts.push(`${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`);
  }

  if (remainingMinutes > 0) {
    parts.push(`${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`);
  }

  if (remainingSeconds > 0) {
    parts.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`);
  }

  if (parts.length === 0) {
    return '0 seconds';
  }

  return parts.join(', ');
}
