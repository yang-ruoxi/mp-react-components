import React, { useState, useEffect } from 'react';
import { PeriodicContext } from '../periodic-table/periodic-table-state/periodic-selection-context';
import { SelectableTable } from '../periodic-table/table-state';
import { TableLayout } from '../periodic-table/periodic-table-component/periodic-table.component';
import { ElementsInput } from './ElementsInput/ElementsInput';
import { FilterType, useMaterialsSearch } from './MaterialsSearchProvider';
import { Button } from 'react-bulma-components';
import { DualSlider } from './sliders/dual-slider';
import { DualRangeSlider } from './DualRangeSlider';

interface Props {
  className: string
}

export const SearchFilters: React.FC<Props> = (props) => {
  const { state, actions } = useMaterialsSearch();
  // const [values, setValues] = useState([10, 50]);
  
  function onSliderChange(values: ReadonlyArray<number>) {
    console.log(values);
    console.log(state.volume.values);
    actions.setVolumeFilter({values: values});
  }

  useEffect(() => {
    console.log('filter changed');
    console.log(state);
    actions.setSearchParams();
  }, [state.values]);

  function renderFilter(f) {
    switch(f.type) {
      case FilterType.ELEMENTS_INPUT:
        return (
          <PeriodicContext>
            {state.filters[0].props.type}
            <br />
            {state.filters[0].props.delimiter}
            <br />
            <ElementsInput 
              {...f.props}
              value={state.values[f.id]}
              onChange={v => actions.setFilterValue(v, f.id)}
              onPropsChange={p => actions.setFilterProps(p, f.id)}
            />
            <SelectableTable
              maxElementSelectable={20}
              forceTableLayout={TableLayout.MINI}
              hiddenElements={[]}
              onStateChange={enabledElements => {
                Object.keys(enabledElements).filter(el => enabledElements[el]);
              }}
              enabledElements={['Co']}
              disabledElements={['H', 'C']}
            />
          </PeriodicContext>
        );
      case FilterType.SLIDER:
        return (
          <div>
            {state.values.density.toString()}
            {state.values[f.id].toString()}
            <DualRangeSlider {...f.props} values={state.values[f.id]} onChange={v => actions.setFilterValue(v, f.id)}/>
          </div>
        );
      default:
        null;
    }
    return null;
  }

  return (
    <div className={props.className}>
      <div>
        <div>
          {state.filters.map((f, i) => (
            <div key={i}>
              {renderFilter(f)}
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop: '15px'}}>
        <Button onClick={actions.getData} className="is-primary" style={{marginRight: '5px'}}>Apply</Button>
        <Button onClick={actions.reset}>Reset</Button>
      </div>
    </div>
  );
}