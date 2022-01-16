import { useState } from 'react';

const useManual = () => {
    const lastDate = localStorage.getItem('manualPopUpDate') || new Date();
    const NowDate = new Date()
    const [isPopUpOpen, setIsPopUpOpen] = useState(lastDate<=NowDate);
    const setDate = () => {
      localStorage.setItem('manualPopUpDate', new Date(new Date().setDate(new Date().getDate() + 7)));
      setIsPopUpOpen(false);
    };
    return [isPopUpOpen, setDate];
  };
  
  export default useManual;