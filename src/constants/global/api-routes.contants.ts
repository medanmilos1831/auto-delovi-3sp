const API_DOMAIN = {
  PROGRAM: 'program',
  CATEGORY: 'category',
  PRODUCT: 'product',
  ABOUT: 'about',
  CONTACT: 'contact',
  HOME: 'home',
};
export const API_ROUTES = {
  PROGRAM: {
    BASE: `/${API_DOMAIN.PROGRAM}`,
    ALL: `${API_DOMAIN.PROGRAM}/all`,
    CREATE: `${API_DOMAIN.PROGRAM}/create`,
    UPDATE: `${API_DOMAIN.PROGRAM}/update`,
    REMOVE: `${API_DOMAIN.PROGRAM}/remove`,
  },
  CATEGORY: {
    BASE: `/${API_DOMAIN.CATEGORY}`,
    ALL: `${API_DOMAIN.CATEGORY}/all`,
    CREATE: `${API_DOMAIN.CATEGORY}/create`,
    UPDATE: `${API_DOMAIN.CATEGORY}/update`,
    REMOVE: `${API_DOMAIN.CATEGORY}/remove`,
  },
  PRODUCT: {
    BASE: `/${API_DOMAIN.PRODUCT}`,
  },
  ABOUT: {
    BASE: `/${API_DOMAIN.ABOUT}`,
  },
  CONTACT: {
    BASE: `/${API_DOMAIN.CONTACT}`,
  },
  HOME: {
    BASE: `/${API_DOMAIN.HOME}`,
  },
};
