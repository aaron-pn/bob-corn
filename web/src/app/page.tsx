'use client';

import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next/client';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { URL_API } from './utils/constants';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!getCookie('clientId')) {
      const uuidId = uuidv4();
      setCookie('clientId', uuidId, {
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      });
    }
  }, []);

  const handlePurchase = async () => {
    const clientId = getCookie('clientId');
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API}/buy-corn`, {
        method: 'POST',
        body: JSON.stringify({
          userId: clientId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result.status === 429) {
        toast({
          title: 'Too many request',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Purchased',
          variant: 'default',
        });
      }
    } catch (error) {
      toast({
        title: 'Error during purchase',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const seeMyBuys = () => {
    router.push('/my-buys');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 w-screen h-screen">
      <h1 className="text-4xl font-bold">Buy corn</h1>
      <Button onClick={handlePurchase} disabled={isLoading}>
        Buy
      </Button>
      <Button onClick={seeMyBuys} disabled={isLoading}>
        See my buys
      </Button>
    </div>
  );
};

export default Home;
