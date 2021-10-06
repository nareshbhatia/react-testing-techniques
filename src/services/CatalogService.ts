import { formatHttpError } from '@http-utils/core';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Catalog } from '../models';

// ---------- fetchCatalog ----------
export const fetchCatalog = async (): Promise<Catalog> => {
  try {
    const resp = await axios.get('/catalog');
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useCatalogQuery = () => {
  return useQuery('catalog', fetchCatalog);
};
