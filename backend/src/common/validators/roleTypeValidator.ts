import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsRoleType(property: string, validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRoleType',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && (value === 'MEAL' || value === 'ACCOMMONDATION');
          // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
