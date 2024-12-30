'use client';
import PaymentsTable from '@/components/tables/table-my-buys';
import { getCookie } from 'cookies-next/client';
import { useEffect, useState } from 'react';
import { URL_API } from '../utils/constants';
import { Purchase } from '../utils/types';

const MyBuys = () => {
  const clientId = getCookie('clientId');
  const [data, setData] = useState<Purchase[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL_API}/my-buys/${clientId}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-screen h-screen">
      <div className="w-full md:w-1/2">
        <h1 className="font-bold text-4xl pb-12 ">My purchases</h1>
        <div>
          <PaymentsTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default MyBuys;
