import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import zxcvbn from 'zxcvbn';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const result = zxcvbn(value);

          // Score 0-4, requerimos mínimo 3 (fuerte)
          if (result.score < 3) {
            return false;
          }

          // Verificar longitud mínima
          if (value.length < 8) {
            return false;
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value as string;
          const result = zxcvbn(value);

          const feedback = result.feedback;
          const suggestions = feedback.suggestions || [];
          const warning = feedback.warning || '';

          let message = 'La contraseña no es lo suficientemente fuerte.';

          if (warning) {
            message += ` ${warning}`;
          }

          if (suggestions.length > 0) {
            message += ` Sugerencias: ${suggestions.join(' ')}`;
          }

          return message;
        },
      },
    });
  };
}
