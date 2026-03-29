import { EmployeeBuilder } from './employee.builder';

export const testData = {
  users: {
    admin: () => ({ username: 'Admin', password: 'admin123' }),
    invalid: () => ({ username: 'invalid_user', password: 'wrong_password' }),
    wrongPassword: () => ({ username: 'Admin', password: 'wrongpassword' }),
    empty: () => ({ username: '', password: '' }),
  },
  employees: {
    new: () => EmployeeBuilder.create().build(),
  },
};
