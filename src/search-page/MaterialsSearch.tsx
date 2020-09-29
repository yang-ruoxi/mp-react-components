import React, { useState, useEffect } from 'react';
import { MaterialsSearchProvider } from './MaterialsSearchProvider';
import { SearchFilters } from './SearchFilters';
import { MaterialsDataTable } from './MaterialsDataTable';

export const MaterialsSearch = () => {
  return (
    <div className="columns" style={{padding: '15px'}}>
      <MaterialsSearchProvider>
        <SearchFilters className="column"/>
        <MaterialsDataTable className="column is-two-thirds"/>
      </MaterialsSearchProvider>
    </div>
  );
}