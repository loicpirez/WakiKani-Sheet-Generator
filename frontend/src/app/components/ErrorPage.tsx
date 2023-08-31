interface ErrorPageProps {
  error: ApiErrorType;
}

const ErrorPage = ({ error }: ErrorPageProps): JSX.Element => {
  return <div>{`Error: ${error.message}`}</div>;
}

export default ErrorPage;