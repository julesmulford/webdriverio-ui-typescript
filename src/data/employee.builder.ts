import { randomUUID } from 'crypto';

export interface Employee {
  firstName: string;
  middleName: string;
  lastName: string;
}

export class EmployeeBuilder {
  private firstName = 'AutoFirst';
  private middleName = 'AutoMid';
  private lastName = `AutoLast${randomUUID().replace(/-/g, '').slice(0, 6)}`;

  withFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  withMiddleName(middleName: string): this {
    this.middleName = middleName;
    return this;
  }

  withLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  build(): Employee {
    return {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
    };
  }

  static create(): EmployeeBuilder {
    return new EmployeeBuilder();
  }
}
