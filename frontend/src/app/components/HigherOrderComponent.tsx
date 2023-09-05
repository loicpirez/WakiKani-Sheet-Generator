"use client"

import React from 'react';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { useWakinakiDataContext } from '../context/WakinakiData';

// @TODO: replace any with the correct type

const getComponentDisplayName = (WrappedComponent: React.ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withDataHandling = <P extends any>(WrappedComponent: React.ComponentType<any>) => {
  const WithDataHandlingComponent = (props: any) => {
    const { data, error, loading, fetchData } = useWakinakiDataContext();
    if (error !== null) {
        return <ErrorPage error={error as Error} />;
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
