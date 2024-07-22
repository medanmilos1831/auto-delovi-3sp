import { ApiProvider } from '@/context';

// 171
// klare cetkin 7
// 4841 8787 8684 1951
// 160-5100102363259-88
// 1951

// dodati kataloski broj
// evening87

// auto-delovi-dobavnic-3sp.rs com
// hello

import { Axios } from '@/libs';
import { StoreClientProvider } from '@/observer';
import { router } from '@/router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <StoreClientProvider
      store={{
        reducer: (state: any, action: any) => {
          switch (action.type) {
            case 'addProduct':
              if (state.products.length === 0) {
                state.products = [
                  ...state.products,
                  {
                    qty: 1,
                    product: action.payload,
                  },
                ];
              }
              const index = state.products.findIndex(
                (i: any) => i.product.id === action.payload.id
              );
              if (index > -1) {
                return state;
              } else {
                state.products = [
                  ...state.products,
                  {
                    qty: 1,
                    product: action.payload,
                  },
                ];
              }
              return state;
            case 'setQyt':
              state.products[action.payload.index].qty = action.payload.value;
              return state;
            case 'removeItem':
              state.products.splice(action.payload, 1);
              return state;

            case 'clearProducts':
              state.products = action.payload;
              return state;
            case 'openCard':
              state.openCard = action.payload;
              return state;

            default:
              return state;
          }
        },
        state: {
          products: [],
          openCard: false,
        },
      }}
    >
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                retry: 0,
              },
            },
          })
        }
      >
        <ApiProvider value={new Axios()}>
          <RouterProvider router={router} />
        </ApiProvider>
      </QueryClientProvider>
    </StoreClientProvider>
  );
};

export { App };
