function errorMessageConfig() {
    setTypeMessage('error');
    setMessage('Preencha corretamente os campos');
    setMessageVisible(true);

    setTimeout(() => setMessageVisible(false), 4000);   
}

export default errorMessageConfig;