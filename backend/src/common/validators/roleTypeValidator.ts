import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsRoleType(property: string, validationOptions?: ValidationOptions) {
  // tslint:disable-next-line: only-arrow-functions
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'isRoleType',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && (value === 'MEAL' || value === 'ACCOMMODATION');
          // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
