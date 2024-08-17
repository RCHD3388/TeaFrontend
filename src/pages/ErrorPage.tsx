import React from 'react';

interface IMessageProps {
    messages: string;
}

const ErrorPage: React.FC<IMessageProps> = ({ messages }) => {
  return <div>{messages}</div>;
};

export default ErrorPage;
