export const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';

    const date = new Date(dateStr);

    // Проверка на валидность даты
    if (isNaN(date.getTime())) return '';

  
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
};