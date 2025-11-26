"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";

const useCart = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart", email],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/myCart?email=${email}`
      );
      return data;
    },
    enabled: !!email,
  });

  return { cart, refetch, isLoading };
};

export default useCart;
