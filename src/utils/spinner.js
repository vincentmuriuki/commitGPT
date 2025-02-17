import ora from 'ora';

export const showSpinner = (message) => ora(message).start();
