import React, { useState, useRef, useEffect } from 'react';
import { useElements } from '../../periodic-table/periodic-table-state/table-store';
import { TABLE_DICO_V2 } from '../../periodic-table/periodic-table-data/table-v2';
import {
  getDelimiter,
  elementsArrayToElementState,
  formulaStringToArrays,
  getTruthyKeys,
  arrayToDelimitedString
} from '../../search/utils';
import { Form, Button } from 'react-bulma-components';
const { Input, Field, Control } = Form;
import { FaBalanceScale, FaBandAid, FaBlender, FaCaretDown, FaCaretUp, FaTimes } from 'react-icons/fa';
import { PeriodicContext } from '../../periodic-table/periodic-table-state/periodic-selection-context';
import { MaterialsInputBox } from './MaterialsInputBox';
import { TableLayout } from '../../periodic-table/periodic-table-component/periodic-table.component';
import { SelectableTable } from '../../periodic-table/table-state';
import classNames from 'classnames';
import { usePrevious } from '../../../utils/hooks';

/**
 * An input field component for searching by mp-id, elements, or formula.
 * Renders a text input and a periodic table within a PeriodicContext to support
 * two-way binding between the input and periodic table.
 * i.e. when elements are typed into the field, they are selected in the table,
 * and when elements are selected in the table, they are appended to the field's input.
 */

/**
 * Search types supported by this field
 * Displayed to users in the dropdown
 */
export enum MaterialsInputField {
  ELEMENTS = 'elements',
  FORMULA = 'formula',
  MP_ID = 'task_ids'
}

export interface MaterialsInputBoxProps {
  value: string;
  parsedValue: string | string[];
  field: string;
  debounce?: number;
  showFieldDropdown?: boolean;
  hidePeriodicTable?: boolean;
  isChemSys?: boolean;
  liftInputRef?: (value: React.RefObject<HTMLInputElement>) => any;
  onChange: (value: string) => void;
  onPropsChange?: (propsObject: any) => void;
  onFieldChange?: (value: string) => void;
  onSubmit?: (value?: any) => any;
  onFocus?: (value?: any) => any;
  onBlur?: (value?: any) => any;
}

interface MaterialsInputProps extends MaterialsInputBoxProps {
  periodicTableMode?: string;
}

export const MaterialsInput: React.FC<MaterialsInputProps> = props => {
  const [inputRef, setInputRef] = useState<React.RefObject<HTMLInputElement>>();
  const [isChemSys, setIsChemSys] = useState<boolean>(() => props.isChemSys ? props.isChemSys : false);
  // const prevChemSys = usePrevious(isChemSys);
  const [periodicTableClicked, setPeriodicTableClicked] = useState(false);
  const [showPeriodicTable, setShowPeriodicTable] = useState(() =>
    props.periodicTableMode === 'toggle' && !props.hidePeriodicTable ? true : false
  );

  const getOnFocusProp = () => {
    if (props.periodicTableMode === 'onFocus') {
      return setShowPeriodicTable(true);
    } else {
      return;
    }
  };

  const getOnBlurProp = () => {
    if (props.periodicTableMode === 'onFocus' && !periodicTableClicked) {
      return setShowPeriodicTable(false);
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    if (props.onSubmit) {
      e.preventDefault();
      e.stopPropagation();
      setShowPeriodicTable(false);
      props.onSubmit();
    }
  };

  // const checkIfChemSys = (value) => {
  //   if (value.match(/-/gi)) {
  //     return setIsChemSys(true);
  //   } else if (value.match(/,|\s/gi)) {
  //     return setIsChemSys(false);
  //   } else {
  //     return setIsChemSys(prevChemSys);
  //   }
  // };

  useEffect(() => {
    let newIsChemSys = isChemSys;
    if (props.value.match(/-/gi) || (props.value.length < 3 && !props.value.match(/,|\s/gi))) {
      newIsChemSys = true;
    } else if(props.value.match(/,|\s/gi)) {
      newIsChemSys = false;
    }
    if (props.onPropsChange) props.onPropsChange({isChemSys: newIsChemSys});
    setIsChemSys(newIsChemSys);
  }, [props.value]);

  const materialsInputControl = 
    <MaterialsInputBox
      value={props.value}
      parsedValue={props.parsedValue}
      field={props.field}
      debounce={props.debounce}
      isChemSys={props.isChemSys}
      onChange={props.onChange}
      onFieldChange={props.onFieldChange}
      onSubmit={props.onSubmit ? handleSubmit : undefined}
      onFocus={getOnFocusProp}
      onBlur={getOnBlurProp}
      liftInputRef={ref => setInputRef(ref)}
      showFieldDropdown={props.showFieldDropdown}
    />;

  let materialsInputField: JSX.Element | null = null; 
  
  if (props.onSubmit) {
    materialsInputField =
      <form onSubmit={handleSubmit}>
        <Field className="has-addons">
          <Control>
            <button
              type="button"
              className="button has-oversized-icon is-size-2"
              onClick={() => setShowPeriodicTable(!showPeriodicTable)}
            >
                <i
                  className={classNames(
                    'icon-fontastic-periodic-table-squares',
                    {'is-active': showPeriodicTable}
                  )}
                />
            </button>            
          </Control>
          {materialsInputControl}
          <Control>
            <Button color="primary" type="submit">
              Search
            </Button>
          </Control>
        </Field>
      </form>;
  } else {
    materialsInputField =
      <Field className="has-addons">
        {materialsInputControl}
      </Field>;
  }

  let chemSysCheckbox: JSX.Element | null = null;

  if (props.field === 'elements' && !props.onSubmit) {
    chemSysCheckbox = 
      <label className="checkbox is-block">
        <input
          type="checkbox"
          role="checkbox"
          checked={isChemSys}
          aria-checked={isChemSys}
          onChange={(e) => {
            let newValue = '';
            if (e.target.checked) {
              newValue = props.value.replace(/,\sand|,\s|,|\s/gi, '-');
            } else {
              newValue = props.value.replace(/-/gi, ',');
            }
            setIsChemSys(e.target.checked);
            if (props.onPropsChange) props.onPropsChange({isChemSys: e.target.checked});
            props.onChange(newValue);
          }}
        />
        <span>Contains no other elements</span>
      </label>
  }

  return (
    <div>
      <PeriodicContext>
        {materialsInputField}
        {chemSysCheckbox}
        <div
          className={classNames('table-transition-wrapper-small','can-hide-with-transition', {
            'is-hidden-with-transition': !showPeriodicTable,
            'mt-3': showPeriodicTable
          })}
          onMouseDown={event => {
            setPeriodicTableClicked(true);
            setTimeout(() => {
              if (inputRef && inputRef.current) inputRef.current.focus();
              setPeriodicTableClicked(false);
            }, 250);
          }}
        >
          <SelectableTable
            maxElementSelectable={20}
            forceTableLayout={TableLayout.MINI}
            hiddenElements={[]}
            onStateChange={enabledElements => {
              Object.keys(enabledElements).filter(el => enabledElements[el]);
            }}
          />
        </div>
      </PeriodicContext>
    </div>
  );
};
