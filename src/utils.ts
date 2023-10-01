export const formatDate = (isoDate:string) =>{
const date = new Date(isoDate);

const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options)
return formattedDate
}