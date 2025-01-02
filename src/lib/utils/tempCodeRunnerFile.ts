function getDates() {
    const currentDate = new Date();
    
    // Format today's date as YYYYMMDD for end_date
    const endDate = currentDate.toISOString().split('T')[0].replace(/-/g, '');
    
    // Subtract 2 weeks (14 days) from the current date for begin_date
    const beginDateObject = new Date(currentDate);
    console.log({beginDateObject: beginDateObject, currentDate: currentDate});
    
    beginDateObject.setDate(currentDate.getDate() - 14);
    const beginDate = beginDateObject.toISOString().split('T')[0].replace(/-/g, '');
    
    return { begin_date: beginDate, end_date: endDate };
}
