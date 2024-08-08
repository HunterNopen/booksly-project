export const saveBookStatus = (isbn: string, status: string) => {
    const currentStatuses = JSON.parse(localStorage.getItem('bookStatuses') || '{}');
    currentStatuses[isbn] = status;
    localStorage.setItem('bookStatuses', JSON.stringify(currentStatuses));
  };
  
  export const getBookStatus = (isbn: string): string | null => {
    const currentStatuses = JSON.parse(localStorage.getItem('bookStatuses') || '{}');
    return currentStatuses[isbn] || null;
  };
  
  export const removeBookStatus = (isbn: string) => {
    const currentStatuses = JSON.parse(localStorage.getItem('bookStatuses') || '{}');
    delete currentStatuses[isbn];
    localStorage.setItem('bookStatuses', JSON.stringify(currentStatuses));
  };

  export const getAllBookStatuses = () => {
    return JSON.parse(localStorage.getItem('bookStatuses') || '{}');
  };
  