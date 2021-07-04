export const EMPLOYEE_SCHEMA = 'employee';

export const EmployeeSchema = {
  name: EMPLOYEE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    value: 'string',
  },
};

// export const EmployeesSchema = {
//   name: 'employees',
//   primaryKey: 'id',
//   properties: {
//     id: 'int',
//     value: {type: 'list', objectType: 'employee'},
//   },
// };

// export const EmployeeSchema = {
//   name: 'employee',
//   properties: {
//     name: 'string',
//     username: 'string',
//     email: 'string?',
//     profile_image: 'string?',
//     phone: 'string?',
//     website: 'string?',
//     address: 'address?',
//     company: 'company?',
//   },
// };

// export const AddressSchema = {
//   name: 'address',
//   properties: {
//     street: 'string?',
//     suite: 'string?',
//     email: 'string?',
//     city: 'string?',
//     zipcode: 'string?',
//     geo: 'geo?',
//   },
// };

// export const GeoSchema = {
//   name: 'geo',
//   properties: {
//     lat: 'string?',
//     lng: 'string?',
//   },
// };

// export const CompanySchema = {
//   name: 'company',
//   properties: {
//     name: 'string?',
//     catchPhrase: 'string?',
//     bs: 'string?',
//   },
// };
