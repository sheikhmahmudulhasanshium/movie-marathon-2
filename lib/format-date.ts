
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    if(dateString===""){return ''}
    return date.toLocaleDateString('en-GB', options);
};
