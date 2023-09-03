"use client"

import React from 'react';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { useWakinakiDataContext } from '../context/WakinakiData';

interface WithDataHandlingProps {
  data: ApiResponseType;
  error: ApiErrorType;
  loading: boolean;
}

const getComponentDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withDataHandling = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithDataHandlingComponent = (props: P) => {
    const { data, error, loading, fetchData } = useWakinakiDataContext();
    if (error) {
        return <ErrorPage error={error} />;
    } else if (loading) {
        return <LoadingPage />;
    } else if (data) {
        return <WrappedComponent data={data} {...props} />;
    } else {
        fetchData();
        return <LoadingPage />;
    }
  };
  WithDataHandlingComponent.displayName = `WithDataHandling(${getComponentDisplayName(WrappedComponent)})`;
  return WithDataHandlingComponent;
};

export default withDataHandling;
