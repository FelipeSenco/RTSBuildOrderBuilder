import { useQuery } from "react-query";
import BuildOrdersContext from "../../Contexts/BuildOrdersContext";
import { useContext } from "react";
import { emptyWarcrafBuildOrder } from "../../__mocks__/buildOrderMocks";
import { onErrorLogger } from "../../utils";

export const useWarcraftBuildOrderQuery = (enabled: boolean) => {
  const { getWarcraftBuildOrders } = useContext(BuildOrdersContext);

  return useQuery("warcraft-build-orders", {
    queryFn: getWarcraftBuildOrders,
    enabled,
    initialData: [],
    onError: (error: Error) => onErrorLogger(error),
  });
};

export const useWarcraftBuildOrderByIdQuery = (id: string, enabled: boolean) => {
  const { getWarcraftBuildOrderById } = useContext(BuildOrdersContext);

  return useQuery(["warcraft-build-order", id], {
    queryFn: async () => await getWarcraftBuildOrderById(id),
    enabled,
    initialData: emptyWarcrafBuildOrder,
    onError: (error: Error) => onErrorLogger(error),
  });
};
