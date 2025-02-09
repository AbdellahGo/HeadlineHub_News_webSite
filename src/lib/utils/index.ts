import { newsCategories } from "../constants";

export function formatDate(fullDate: string, showHours?: boolean) {
    const date = new Date(fullDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 24h to 12h format
    const formattedHours = String(hours).padStart(2, '0');

    return `${year}-${month}-${day} ${showHours ? `${formattedHours}:${minutes} ${ampm}` : ''}`;
}





//? This function changes something like this "business Day" to this "business" Then tha function returns {name: 'Business', link: '/business'}:.

export function filterCategory(newsCategory: string): {name: string} {
    // Convert the input category to lowercase and split it into words
    const modifiedCategory = newsCategory?.toLowerCase().split(' ');

    // Filter the categories
    const filteredCategory = newsCategories?.filter((category) =>
        modifiedCategory?.some((word) => word === category.name?.toLowerCase())
    );

    return filteredCategory[0];
    
}

//? getDates is Returns today's date and 14 days ago date => example: {begin_date: 20241214, end_date: 20241207}
export function getDates() {
    const currentDate = new Date();
    
    // Format today's date as YYYYMMDD for end_date
    const endDate = currentDate?.toISOString().split('T')[0].replace(/-/g, '');
    
    // Subtract 2 weeks (14 days) from the current date for begin_date
    const beginDateObject = new Date(currentDate);
    
    beginDateObject.setDate(currentDate.getDate() - 14);
    
    const beginDate = beginDateObject?.toISOString().split('T')[0].replace(/-/g, '');
    
    return { begin_date: beginDate, end_date: endDate };
}



