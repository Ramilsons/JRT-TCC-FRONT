export default function unmaskPhone(originalValue) {
    originalValue = originalValue.replace('(', '');
    originalValue = originalValue.replace(')', '');
    originalValue = originalValue.replace('-', ''); 
    originalValue = originalValue.replace(/\s/g, '');    

    return originalValue;
}