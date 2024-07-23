const getInitials = ({ appName }: { appName: string }) => {
    const words = appName.split(' ');
    if (words.length >= 2) return `${words[0][0]} ${words[1][0]}`.toUpperCase();
    else {
      return words[0].substring(0, 2).toUpperCase();
    }
  };
  
  const formatTitleForUrl = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };
  
  export { getInitials, formatTitleForUrl };
  