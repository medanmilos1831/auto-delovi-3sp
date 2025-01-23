import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StoreService } from './StoreService';
import { EventHandler } from './EventHandler';

const StoreClientContext = createContext<any>(undefined);

const StoreClientProvider = ({ children, store }: PropsWithChildren<any>) => {
  return (
    <StoreClientContext.Provider
      value={{
        store: new StoreService(store),
        eventHandler: new EventHandler(),
      }}
    >
      {children}
    </StoreClientContext.Provider>
  );
};

const useDispatch = () => {
  const ctx = useContext(StoreClientContext);
  return (obj: { type: string; payload: any }) => {
    ctx.store.DISPATCH(obj);
    ctx.eventHandler.triggerEvent(obj.type);
  };
};

const useSelector = (selector: any, dep: any[]) => {
  const ctx = useContext(StoreClientContext);
  const [state, setState] = useState<any>({});
  const listener = useRef(() => {
    return selector(ctx.store.GET_STATE(), setState);
  });

  useEffect(() => {
    if (dep.length) {
      dep.forEach((i: any) => {
        ctx.eventHandler.addEventListener(
          i,
          () => {
            setState(listener.current());
          },
          {
            passive: true,
          }
        );
      });
    }
    return () => {
      dep.forEach((i: any) => {
        ctx.eventHandler.removeEventListener(i, listener.current);
      });
    };
  }, []);

  return {
    value: Object.keys(state).length ? state : selector(ctx.store.GET_STATE()),
    refreshSelector: () => selector(ctx.store.GET_STATE()),
    removeListener: (i: string) =>
      ctx.eventHandler.removeEventListener(i, listener.current),
  };
};

export { StoreClientProvider, useSelector, useDispatch };

// const ObserverClientContext = createContext<any>(undefined);

// const ObserverClientProvider = ({
//   children,
//   reducer,
//   state,
// }: PropsWithChildren<{ reducer: any; state: any }>) => {
//   return (
//     <ObserverClientContext.Provider value={new Observer(reducer, state)}>
//       {children}
//     </ObserverClientContext.Provider>
//   );
// };

// function useDispatch() {
//   const { DISPATCH } = useContext(ObserverClientContext) as any;
//   return DISPATCH;
// }
// function useSelector(
//   selector: (state: any, prevState: any) => any,
//   reducer_action_dependencies: string[]
// ) {
//   const { GET_STATE, subscribe, unsubscribe } = useContext(
//     ObserverClientContext
//   ) as any;
//   const prevValue = useRef<any>();
//   const [state, setState] = useState<any>(undefined);
//   const notifier = (observerState: any) => {
//     setState((prev: any) => {
//       const previous = !prev ? prevValue.current : prev;
//       if (prev) {
//         prevValue.current = undefined;
//       }
//       return {
//         ...prev,
//         ...selector(observerState, previous),
//       };
//     });
//   };
//   useEffect(() => {
//     if (reducer_action_dependencies.length === 0) return;
//     reducer_action_dependencies.forEach((i) => {
//       subscribe({
//         type: i,
//         subscriber: notifier,
//       });
//     });
//     return () => {
//       reducer_action_dependencies.forEach((i) => {
//         unsubscribe({
//           type: i,
//           subscriber: notifier,
//         });
//       });
//     };
//   }, []);
//   return {
//     value: state
//       ? state
//       : (() => {
//           const data = selector(GET_STATE(), undefined);
//           prevValue.current = data;
//           return data;
//         })(),
//     refreshSelector: () => selector(GET_STATE(), state),
//   };
// }

// export { ObserverClientProvider, useSelector, useDispatch };
