export const formatDateToInputValue = (seconds: number ): string => {
    const date = new Date(seconds * 1000);
    date.setHours(date.getHours() + 6);
    
    return date.toISOString().slice(0, 16);
}

export const formatDateToString = (seconds: any) => {
    return new Date(seconds * 1000).toLocaleDateString();
}