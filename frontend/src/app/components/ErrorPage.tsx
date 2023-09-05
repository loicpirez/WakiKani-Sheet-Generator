interface ErrorPageProps {
  error: Error;
}

const ErrorPage = ({ error }: ErrorPageProps): JSX.Element => {
  return <div className='h-32 w-full flex items-center justify-center'>
    {error && error.message}
  </div>
}

export default ErrorPage;