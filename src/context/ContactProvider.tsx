import { useQuery } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';
import { client } from '../prismic';

const ContactContext = createContext<any>(undefined);
const ContactProvider = ({ children }: PropsWithChildren) => {
  const query = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      return await client.getSingle('contact');
    },
    // placeholderData: new Array(30).fill(null),
  });
  return (
    <ContactContext.Provider value={query}>{children}</ContactContext.Provider>
  );
};

const useContact = () => {
  const ctx = useContext(ContactContext);
  return ctx;
};

export { ContactProvider, useContact };
