import styles from './message.module.css';

const ErrorMessage = ({ error }: { error: string[] | undefined }) => {
  return (
    <>
      {error?.map((message) => (
        <span key={crypto.randomUUID()} className={styles['error-message']}>
          {message}
        </span>
      ))}
    </>
  );
};

export default ErrorMessage;
