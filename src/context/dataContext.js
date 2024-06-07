import {createContext, useState} from 'react';

const DataContext = createContext();

const DataProvider = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const value = {
    loading,
    setLoading,
    showDeleteModal,
    setShowDeleteModal,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export {DataContext, DataProvider};
