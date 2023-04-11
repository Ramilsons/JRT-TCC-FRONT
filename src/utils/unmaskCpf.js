export default function unmaskCpf(originalValue) {
    originalValue = originalValue.replace('.', '');
    originalValue = originalValue.replace('.', '');
    originalValue = originalValue.replace('.', '');
    originalValue = originalValue.replace('-', ''); 

    return originalValue;
}