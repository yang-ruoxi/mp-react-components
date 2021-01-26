import { MaterialsInputField } from '../components/search/MaterialsInput';
import { Column, ColumnFormat, FilterGroup, FilterType } from '../components/search/SearchUI/types';

/**
 * Materials Explorer Test Configuration
 */
export const materialsGroups: FilterGroup[] = [
  {
    name: 'Material Definition',
    expanded: false,
    filters: [
      {
        name: 'ID',
        id: 'task_ids',
        type: FilterType.TEXT_INPUT,
      },
      {
        name: 'Include Elements',
        id: 'elements',
        type: FilterType.MATERIALS_INPUT,
        props: {
          field: MaterialsInputField.ELEMENTS,
        },
      },
      {
        name: 'Exclude Elements',
        id: 'exclude_elements',
        type: FilterType.MATERIALS_INPUT,
        props: {
          field: MaterialsInputField.EXCLUDE_ELEMENTS,
        },
      },
      {
        name: 'Formula',
        id: 'formula',
        type: FilterType.MATERIALS_INPUT,
        props: {
          field: MaterialsInputField.FORMULA,
        },
      },
    ],
  },
  {
    name: 'Basic Properties',
    expanded: false,
    filters: [
      {
        name: 'Volume',
        id: 'volume',
        type: FilterType.SLIDER,
        props: {
          domain: [5, 19407],
          step: 1,
        },
      },
      {
        name: 'Density',
        id: 'density',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 25],
          step: 0.1,
        },
      },
      {
        name: 'Number of Sites',
        id: 'nsites',
        type: FilterType.SLIDER,
        props: {
          domain: [1, 360],
          step: 1,
        },
      },
    ],
  },
  {
    name: 'Thermodynamics',
    expanded: false,
    filters: [
      {
        name: 'Energy Above Hull',
        id: 'e_above_hull',
        type: FilterType.SLIDER,
        units: 'meV/atom',
        conversionFactor: 0.001,
        props: {
          domain: [0, 1000],
          step: 0.01,
        },
      },
      {
        name: 'Formation Energy',
        id: 'formation_energy_per_atom',
        type: FilterType.SLIDER,
        units: 'eV/atom',
        props: {
          domain: [-10, 6],
          step: 0.1,
        },
      },
      {
        name: 'Stability',
        id: 'is_stable',
        type: FilterType.THREE_STATE_BOOLEAN_SELECT,
        props: {
          options: [
            {
              label: 'Is stable',
              value: true,
            },
            {
              label: 'Is not stable',
              value: false,
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Symmetry',
    expanded: false,
    filters: [
      {
        name: 'Spacegroup Symbol',
        id: 'spacegroup_symbol',
        type: FilterType.SELECT_SPACEGROUP_SYMBOL,
      },
      {
        name: 'Spacegroup Number',
        id: 'spacegroup_number',
        type: FilterType.SELECT_SPACEGROUP_NUMBER,
      },
      {
        name: 'Crystal System',
        id: 'crystal_system',
        type: FilterType.SELECT_CRYSTAL_SYSTEM,
      },
    ],
  },
  {
    name: 'Electronic Structure',
    expanded: false,
    filters: [
      {
        name: 'Band Gap',
        id: 'sc_band_gap',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 1,
        },
      },
      {
        name: 'Direct Band Gap',
        id: 'sc_direct',
        type: FilterType.THREE_STATE_BOOLEAN_SELECT,
        props: {
          options: [
            {
              label: 'Is direct',
              value: true,
            },
            {
              label: 'Is not direct',
              value: false,
            },
          ],
        },
      },
    ],
  },
  {
    name: 'Elasticity',
    expanded: false,
    filters: [
      {
        name: 'Bulk Modulus, Voigt',
        id: 'k_voigt',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Bulk Modulus, Reuss',
        id: 'k_reuss',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Bulk Modulus, Voigt-Reuss-Hill',
        id: 'k_vrh',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Shear Modulus, Voigt',
        id: 'g_voigt',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Shear Modulus, Reuss',
        id: 'g_reuss',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Shear Modulus, Voigt-Reuss-Hill',
        id: 'g_vrh',
        units: 'GPa',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 1000],
          step: 1,
        },
      },
      {
        name: 'Elastic Anisotropy',
        id: 'elastic_anisotropy',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 25],
          step: 1,
        },
      },
    ],
  },
  {
    name: 'Surfaces',
    expanded: false,
    filters: [
      {
        name: 'Weighted Surface Energy',
        id: 'weighted_surface_energy',
        units: 'J/m²',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 5],
          step: 0.01,
        },
      },
      {
        name: 'Surface Anisotropy',
        id: 'surface_anisotropy',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 25],
          step: 1,
        },
      },
      {
        name: 'Shape Factor',
        id: 'shape_factor',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 0.1,
        },
      },
    ],
  },
  {
    name: 'Piezoelectric',
    expanded: false,
    filters: [
      {
        name: 'Piezo Modulus',
        id: 'piezo_modulus',
        units: 'Cm²',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 0.01,
        },
      },
    ],
  },
  {
    name: 'Dielectric',
    expanded: false,
    filters: [
      {
        name: 'Total Dielectric Constant',
        id: 'e_total',
        units: '',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 0.01,
        },
      },
      {
        name: 'Ionic Dielectric Constant',
        id: 'e_ionic',
        units: '',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 0.01,
        },
      },
      {
        name: 'Static Dielectric Constant',
        id: 'e_static',
        units: '',
        type: FilterType.SLIDER,
        props: {
          domain: [0, 100],
          step: 0.01,
        },
      },
    ],
  },
];

export const materialsColumns: Column[] = [
  {
    name: 'Material Id',
    selector: 'task_id',
    format: ColumnFormat.LINK,
    formatArg: '/materials/',
    minWidth: '110px',
  },
  {
    name: 'Formula',
    selector: 'formula_pretty',
    format: ColumnFormat.FORMULA,
    minWidth: '130px',
  },
  {
    name: 'Space Group Symbol',
    selector: 'symmetry.symbol',
    format: ColumnFormat.SPACEGROUP_SYMBOL,
  },
  {
    name: 'Space Group Number',
    selector: 'symmetry.number',
    omit: true,
  },
  {
    name: 'Crystal System',
    selector: 'symmetry.crystal_system',
  },
  {
    name: 'Volume',
    selector: 'volume',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 3,
    omit: true,
    right: true,
  },
  {
    name: 'Density',
    selector: 'density',
    format: ColumnFormat.SIGNIFICANT_FIGURES,
    formatArg: 4,
    omit: true,
    right: true,
  },
  {
    name: 'Sites',
    selector: 'nsites',
    right: true,
  },
  {
    name: 'Energy Above Hull',
    selector: 'e_above_hull',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'meV/atom',
    conversionFactor: 1000,
    abbreviateNearZero: true,
    right: true,
    wrap: false,
  },
  {
    name: 'Formation Energy',
    selector: 'formation_energy_per_atom',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'eV/atom',
    omit: true,
    right: true,
  },
  {
    name: 'Is Stable',
    selector: 'is_stable',
    format: ColumnFormat.BOOLEAN,
    formatArg: ['yes', 'no'],
    omit: true,
  },
  {
    name: 'Bulk Modulus, Voigt',
    selector: 'k_voigt',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Bulk Modulus, Reuss',
    selector: 'k_reuss',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Bulk Modulus, VRH',
    selector: 'k_vrh',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Shear Modulus, Voigt',
    selector: 'g_voigt',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Shear Modulus, Reuss',
    selector: 'g_reuss',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Shear Modulus, VRH',
    selector: 'g_vrh',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'GPa',
    omit: true,
    right: true,
  },
  {
    name: 'Elastic Anisotropy',
    selector: 'universal_anisotropy',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Weighted Surface Energy',
    selector: 'weighted_surface_energy',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'J/m²',
    omit: true,
    right: true,
  },
  {
    name: 'Surface Anisotropy',
    selector: 'surface_anisotropy',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Shape Factor',
    selector: 'shape_factor',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Work Function',
    selector: 'weighted_work_function',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Piezoelectric Modulus',
    selector: 'e_ij_max',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    units: 'C/m²',
    omit: true,
    right: true,
  },
  {
    name: 'Total Dielectric Constant',
    selector: 'e_total',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Ionic Dielectric Constant',
    selector: 'e_ionic',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
  {
    name: 'Static Dielectric Constant',
    selector: 'e_static',
    format: ColumnFormat.FIXED_DECIMAL,
    formatArg: 2,
    omit: true,
    right: true,
  },
];
