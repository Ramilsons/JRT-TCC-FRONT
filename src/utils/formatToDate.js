export default function formatToDate(stringDate){
    var dateParts = stringDate.split("/");
    var dateObject = new Date(dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
}