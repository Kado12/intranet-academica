
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Sede
 * 
 */
export type Sede = $Result.DefaultSelection<Prisma.$SedePayload>
/**
 * Model AcademicPeriod
 * 
 */
export type AcademicPeriod = $Result.DefaultSelection<Prisma.$AcademicPeriodPayload>
/**
 * Model Turn
 * 
 */
export type Turn = $Result.DefaultSelection<Prisma.$TurnPayload>
/**
 * Model Classroom
 * 
 */
export type Classroom = $Result.DefaultSelection<Prisma.$ClassroomPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Membership
 * 
 */
export type Membership = $Result.DefaultSelection<Prisma.$MembershipPayload>
/**
 * Model CourseTeacher
 * 
 */
export type CourseTeacher = $Result.DefaultSelection<Prisma.$CourseTeacherPayload>
/**
 * Model SectionCourse
 * 
 */
export type SectionCourse = $Result.DefaultSelection<Prisma.$SectionCoursePayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model ParentStudent
 * 
 */
export type ParentStudent = $Result.DefaultSelection<Prisma.$ParentStudentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  DOCENTE: 'DOCENTE',
  ESTUDIANTE: 'ESTUDIANTE',
  PADRE_DE_FAMILIA: 'PADRE_DE_FAMILIA',
  COORDINADOR: 'COORDINADOR',
  INFORMATICO: 'INFORMATICO',
  SECRETARIA: 'SECRETARIA'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PeriodStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

export type PeriodStatus = (typeof PeriodStatus)[keyof typeof PeriodStatus]


export const MembershipStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus]


export const EnrollmentStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  WITHDRAWN: 'WITHDRAWN',
  TRANSFERRED: 'TRANSFERRED',
  COMPLETED: 'COMPLETED'
};

export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus]


export const ParentRelationType: {
  PADRE: 'PADRE',
  MADRE: 'MADRE',
  TUTOR: 'TUTOR',
  OTRO: 'OTRO'
};

export type ParentRelationType = (typeof ParentRelationType)[keyof typeof ParentRelationType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PeriodStatus = $Enums.PeriodStatus

export const PeriodStatus: typeof $Enums.PeriodStatus

export type MembershipStatus = $Enums.MembershipStatus

export const MembershipStatus: typeof $Enums.MembershipStatus

export type EnrollmentStatus = $Enums.EnrollmentStatus

export const EnrollmentStatus: typeof $Enums.EnrollmentStatus

export type ParentRelationType = $Enums.ParentRelationType

export const ParentRelationType: typeof $Enums.ParentRelationType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sedes
 * const sedes = await prisma.sede.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sedes
   * const sedes = await prisma.sede.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.sede`: Exposes CRUD operations for the **Sede** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sedes
    * const sedes = await prisma.sede.findMany()
    * ```
    */
  get sede(): Prisma.SedeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicPeriod`: Exposes CRUD operations for the **AcademicPeriod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicPeriods
    * const academicPeriods = await prisma.academicPeriod.findMany()
    * ```
    */
  get academicPeriod(): Prisma.AcademicPeriodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.turn`: Exposes CRUD operations for the **Turn** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Turns
    * const turns = await prisma.turn.findMany()
    * ```
    */
  get turn(): Prisma.TurnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.classroom`: Exposes CRUD operations for the **Classroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classrooms
    * const classrooms = await prisma.classroom.findMany()
    * ```
    */
  get classroom(): Prisma.ClassroomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memberships
    * const memberships = await prisma.membership.findMany()
    * ```
    */
  get membership(): Prisma.MembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.courseTeacher`: Exposes CRUD operations for the **CourseTeacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CourseTeachers
    * const courseTeachers = await prisma.courseTeacher.findMany()
    * ```
    */
  get courseTeacher(): Prisma.CourseTeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sectionCourse`: Exposes CRUD operations for the **SectionCourse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SectionCourses
    * const sectionCourses = await prisma.sectionCourse.findMany()
    * ```
    */
  get sectionCourse(): Prisma.SectionCourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parentStudent`: Exposes CRUD operations for the **ParentStudent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParentStudents
    * const parentStudents = await prisma.parentStudent.findMany()
    * ```
    */
  get parentStudent(): Prisma.ParentStudentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Sede: 'Sede',
    AcademicPeriod: 'AcademicPeriod',
    Turn: 'Turn',
    Classroom: 'Classroom',
    Section: 'Section',
    Course: 'Course',
    User: 'User',
    Profile: 'Profile',
    Membership: 'Membership',
    CourseTeacher: 'CourseTeacher',
    SectionCourse: 'SectionCourse',
    Enrollment: 'Enrollment',
    ParentStudent: 'ParentStudent'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "sede" | "academicPeriod" | "turn" | "classroom" | "section" | "course" | "user" | "profile" | "membership" | "courseTeacher" | "sectionCourse" | "enrollment" | "parentStudent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Sede: {
        payload: Prisma.$SedePayload<ExtArgs>
        fields: Prisma.SedeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SedeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SedeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          findFirst: {
            args: Prisma.SedeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SedeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          findMany: {
            args: Prisma.SedeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>[]
          }
          create: {
            args: Prisma.SedeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          createMany: {
            args: Prisma.SedeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SedeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          update: {
            args: Prisma.SedeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          deleteMany: {
            args: Prisma.SedeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SedeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SedeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SedePayload>
          }
          aggregate: {
            args: Prisma.SedeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSede>
          }
          groupBy: {
            args: Prisma.SedeGroupByArgs<ExtArgs>
            result: $Utils.Optional<SedeGroupByOutputType>[]
          }
          count: {
            args: Prisma.SedeCountArgs<ExtArgs>
            result: $Utils.Optional<SedeCountAggregateOutputType> | number
          }
        }
      }
      AcademicPeriod: {
        payload: Prisma.$AcademicPeriodPayload<ExtArgs>
        fields: Prisma.AcademicPeriodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicPeriodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicPeriodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          findFirst: {
            args: Prisma.AcademicPeriodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicPeriodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          findMany: {
            args: Prisma.AcademicPeriodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>[]
          }
          create: {
            args: Prisma.AcademicPeriodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          createMany: {
            args: Prisma.AcademicPeriodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AcademicPeriodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          update: {
            args: Prisma.AcademicPeriodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          deleteMany: {
            args: Prisma.AcademicPeriodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicPeriodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AcademicPeriodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicPeriodPayload>
          }
          aggregate: {
            args: Prisma.AcademicPeriodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicPeriod>
          }
          groupBy: {
            args: Prisma.AcademicPeriodGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicPeriodGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicPeriodCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicPeriodCountAggregateOutputType> | number
          }
        }
      }
      Turn: {
        payload: Prisma.$TurnPayload<ExtArgs>
        fields: Prisma.TurnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TurnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TurnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          findFirst: {
            args: Prisma.TurnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TurnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          findMany: {
            args: Prisma.TurnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>[]
          }
          create: {
            args: Prisma.TurnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          createMany: {
            args: Prisma.TurnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TurnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          update: {
            args: Prisma.TurnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          deleteMany: {
            args: Prisma.TurnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TurnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TurnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurnPayload>
          }
          aggregate: {
            args: Prisma.TurnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTurn>
          }
          groupBy: {
            args: Prisma.TurnGroupByArgs<ExtArgs>
            result: $Utils.Optional<TurnGroupByOutputType>[]
          }
          count: {
            args: Prisma.TurnCountArgs<ExtArgs>
            result: $Utils.Optional<TurnCountAggregateOutputType> | number
          }
        }
      }
      Classroom: {
        payload: Prisma.$ClassroomPayload<ExtArgs>
        fields: Prisma.ClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findFirst: {
            args: Prisma.ClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findMany: {
            args: Prisma.ClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          create: {
            args: Prisma.ClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          createMany: {
            args: Prisma.ClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          update: {
            args: Prisma.ClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          deleteMany: {
            args: Prisma.ClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          aggregate: {
            args: Prisma.ClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassroom>
          }
          groupBy: {
            args: Prisma.ClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassroomCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Membership: {
        payload: Prisma.$MembershipPayload<ExtArgs>
        fields: Prisma.MembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findFirst: {
            args: Prisma.MembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          findMany: {
            args: Prisma.MembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>[]
          }
          create: {
            args: Prisma.MembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          createMany: {
            args: Prisma.MembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          update: {
            args: Prisma.MembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          deleteMany: {
            args: Prisma.MembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MembershipPayload>
          }
          aggregate: {
            args: Prisma.MembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMembership>
          }
          groupBy: {
            args: Prisma.MembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<MembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.MembershipCountArgs<ExtArgs>
            result: $Utils.Optional<MembershipCountAggregateOutputType> | number
          }
        }
      }
      CourseTeacher: {
        payload: Prisma.$CourseTeacherPayload<ExtArgs>
        fields: Prisma.CourseTeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseTeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseTeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          findFirst: {
            args: Prisma.CourseTeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseTeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          findMany: {
            args: Prisma.CourseTeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>[]
          }
          create: {
            args: Prisma.CourseTeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          createMany: {
            args: Prisma.CourseTeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CourseTeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          update: {
            args: Prisma.CourseTeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          deleteMany: {
            args: Prisma.CourseTeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseTeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CourseTeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CourseTeacherPayload>
          }
          aggregate: {
            args: Prisma.CourseTeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourseTeacher>
          }
          groupBy: {
            args: Prisma.CourseTeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseTeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseTeacherCountArgs<ExtArgs>
            result: $Utils.Optional<CourseTeacherCountAggregateOutputType> | number
          }
        }
      }
      SectionCourse: {
        payload: Prisma.$SectionCoursePayload<ExtArgs>
        fields: Prisma.SectionCourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionCourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionCourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          findFirst: {
            args: Prisma.SectionCourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionCourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          findMany: {
            args: Prisma.SectionCourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>[]
          }
          create: {
            args: Prisma.SectionCourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          createMany: {
            args: Prisma.SectionCourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SectionCourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          update: {
            args: Prisma.SectionCourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          deleteMany: {
            args: Prisma.SectionCourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionCourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SectionCourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionCoursePayload>
          }
          aggregate: {
            args: Prisma.SectionCourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSectionCourse>
          }
          groupBy: {
            args: Prisma.SectionCourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionCourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCourseCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCourseCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      ParentStudent: {
        payload: Prisma.$ParentStudentPayload<ExtArgs>
        fields: Prisma.ParentStudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentStudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentStudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          findFirst: {
            args: Prisma.ParentStudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentStudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          findMany: {
            args: Prisma.ParentStudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>[]
          }
          create: {
            args: Prisma.ParentStudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          createMany: {
            args: Prisma.ParentStudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ParentStudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          update: {
            args: Prisma.ParentStudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          deleteMany: {
            args: Prisma.ParentStudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentStudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ParentStudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentStudentPayload>
          }
          aggregate: {
            args: Prisma.ParentStudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParentStudent>
          }
          groupBy: {
            args: Prisma.ParentStudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentStudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentStudentCountArgs<ExtArgs>
            result: $Utils.Optional<ParentStudentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    sede?: SedeOmit
    academicPeriod?: AcademicPeriodOmit
    turn?: TurnOmit
    classroom?: ClassroomOmit
    section?: SectionOmit
    course?: CourseOmit
    user?: UserOmit
    profile?: ProfileOmit
    membership?: MembershipOmit
    courseTeacher?: CourseTeacherOmit
    sectionCourse?: SectionCourseOmit
    enrollment?: EnrollmentOmit
    parentStudent?: ParentStudentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SedeCountOutputType
   */

  export type SedeCountOutputType = {
    classrooms: number
    memberships: number
  }

  export type SedeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classrooms?: boolean | SedeCountOutputTypeCountClassroomsArgs
    memberships?: boolean | SedeCountOutputTypeCountMembershipsArgs
  }

  // Custom InputTypes
  /**
   * SedeCountOutputType without action
   */
  export type SedeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SedeCountOutputType
     */
    select?: SedeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SedeCountOutputType without action
   */
  export type SedeCountOutputTypeCountClassroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
  }

  /**
   * SedeCountOutputType without action
   */
  export type SedeCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }


  /**
   * Count Type AcademicPeriodCountOutputType
   */

  export type AcademicPeriodCountOutputType = {
    sections: number
  }

  export type AcademicPeriodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | AcademicPeriodCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * AcademicPeriodCountOutputType without action
   */
  export type AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriodCountOutputType
     */
    select?: AcademicPeriodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcademicPeriodCountOutputType without action
   */
  export type AcademicPeriodCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }


  /**
   * Count Type TurnCountOutputType
   */

  export type TurnCountOutputType = {
    sections: number
  }

  export type TurnCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | TurnCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * TurnCountOutputType without action
   */
  export type TurnCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TurnCountOutputType
     */
    select?: TurnCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TurnCountOutputType without action
   */
  export type TurnCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }


  /**
   * Count Type ClassroomCountOutputType
   */

  export type ClassroomCountOutputType = {
    sections: number
  }

  export type ClassroomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | ClassroomCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassroomCountOutputType
     */
    select?: ClassroomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    enrollments: number
    sectionCourses: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | SectionCountOutputTypeCountEnrollmentsArgs
    sectionCourses?: boolean | SectionCountOutputTypeCountSectionCoursesArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountSectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionCourseWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    courseTeachers: number
    sectionCourses: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseTeachers?: boolean | CourseCountOutputTypeCountCourseTeachersArgs
    sectionCourses?: boolean | CourseCountOutputTypeCountSectionCoursesArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountCourseTeachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTeacherWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountSectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionCourseWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    memberships: number
    courseTeachers: number
    sectionCourses: number
    enrollments: number
    parentOf: number
    studentOf: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    memberships?: boolean | UserCountOutputTypeCountMembershipsArgs
    courseTeachers?: boolean | UserCountOutputTypeCountCourseTeachersArgs
    sectionCourses?: boolean | UserCountOutputTypeCountSectionCoursesArgs
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs
    parentOf?: boolean | UserCountOutputTypeCountParentOfArgs
    studentOf?: boolean | UserCountOutputTypeCountStudentOfArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCourseTeachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTeacherWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionCourseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParentOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStudentOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Sede
   */

  export type AggregateSede = {
    _count: SedeCountAggregateOutputType | null
    _min: SedeMinAggregateOutputType | null
    _max: SedeMaxAggregateOutputType | null
  }

  export type SedeMinAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SedeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    address: string | null
    phone: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SedeCountAggregateOutputType = {
    id: number
    name: number
    address: number
    phone: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SedeMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SedeMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SedeCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    phone?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SedeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sede to aggregate.
     */
    where?: SedeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sedes to fetch.
     */
    orderBy?: SedeOrderByWithRelationInput | SedeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SedeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sedes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sedes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sedes
    **/
    _count?: true | SedeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SedeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SedeMaxAggregateInputType
  }

  export type GetSedeAggregateType<T extends SedeAggregateArgs> = {
        [P in keyof T & keyof AggregateSede]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSede[P]>
      : GetScalarType<T[P], AggregateSede[P]>
  }




  export type SedeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SedeWhereInput
    orderBy?: SedeOrderByWithAggregationInput | SedeOrderByWithAggregationInput[]
    by: SedeScalarFieldEnum[] | SedeScalarFieldEnum
    having?: SedeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SedeCountAggregateInputType | true
    _min?: SedeMinAggregateInputType
    _max?: SedeMaxAggregateInputType
  }

  export type SedeGroupByOutputType = {
    id: string
    name: string
    address: string | null
    phone: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SedeCountAggregateOutputType | null
    _min: SedeMinAggregateOutputType | null
    _max: SedeMaxAggregateOutputType | null
  }

  type GetSedeGroupByPayload<T extends SedeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SedeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SedeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SedeGroupByOutputType[P]>
            : GetScalarType<T[P], SedeGroupByOutputType[P]>
        }
      >
    >


  export type SedeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classrooms?: boolean | Sede$classroomsArgs<ExtArgs>
    memberships?: boolean | Sede$membershipsArgs<ExtArgs>
    _count?: boolean | SedeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sede"]>



  export type SedeSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    phone?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SedeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "phone" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["sede"]>
  export type SedeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classrooms?: boolean | Sede$classroomsArgs<ExtArgs>
    memberships?: boolean | Sede$membershipsArgs<ExtArgs>
    _count?: boolean | SedeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SedePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sede"
    objects: {
      classrooms: Prisma.$ClassroomPayload<ExtArgs>[]
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      address: string | null
      phone: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sede"]>
    composites: {}
  }

  type SedeGetPayload<S extends boolean | null | undefined | SedeDefaultArgs> = $Result.GetResult<Prisma.$SedePayload, S>

  type SedeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SedeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SedeCountAggregateInputType | true
    }

  export interface SedeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sede'], meta: { name: 'Sede' } }
    /**
     * Find zero or one Sede that matches the filter.
     * @param {SedeFindUniqueArgs} args - Arguments to find a Sede
     * @example
     * // Get one Sede
     * const sede = await prisma.sede.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SedeFindUniqueArgs>(args: SelectSubset<T, SedeFindUniqueArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sede that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SedeFindUniqueOrThrowArgs} args - Arguments to find a Sede
     * @example
     * // Get one Sede
     * const sede = await prisma.sede.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SedeFindUniqueOrThrowArgs>(args: SelectSubset<T, SedeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sede that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeFindFirstArgs} args - Arguments to find a Sede
     * @example
     * // Get one Sede
     * const sede = await prisma.sede.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SedeFindFirstArgs>(args?: SelectSubset<T, SedeFindFirstArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sede that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeFindFirstOrThrowArgs} args - Arguments to find a Sede
     * @example
     * // Get one Sede
     * const sede = await prisma.sede.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SedeFindFirstOrThrowArgs>(args?: SelectSubset<T, SedeFindFirstOrThrowArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sedes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sedes
     * const sedes = await prisma.sede.findMany()
     * 
     * // Get first 10 Sedes
     * const sedes = await prisma.sede.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sedeWithIdOnly = await prisma.sede.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SedeFindManyArgs>(args?: SelectSubset<T, SedeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sede.
     * @param {SedeCreateArgs} args - Arguments to create a Sede.
     * @example
     * // Create one Sede
     * const Sede = await prisma.sede.create({
     *   data: {
     *     // ... data to create a Sede
     *   }
     * })
     * 
     */
    create<T extends SedeCreateArgs>(args: SelectSubset<T, SedeCreateArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sedes.
     * @param {SedeCreateManyArgs} args - Arguments to create many Sedes.
     * @example
     * // Create many Sedes
     * const sede = await prisma.sede.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SedeCreateManyArgs>(args?: SelectSubset<T, SedeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Sede.
     * @param {SedeDeleteArgs} args - Arguments to delete one Sede.
     * @example
     * // Delete one Sede
     * const Sede = await prisma.sede.delete({
     *   where: {
     *     // ... filter to delete one Sede
     *   }
     * })
     * 
     */
    delete<T extends SedeDeleteArgs>(args: SelectSubset<T, SedeDeleteArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sede.
     * @param {SedeUpdateArgs} args - Arguments to update one Sede.
     * @example
     * // Update one Sede
     * const sede = await prisma.sede.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SedeUpdateArgs>(args: SelectSubset<T, SedeUpdateArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sedes.
     * @param {SedeDeleteManyArgs} args - Arguments to filter Sedes to delete.
     * @example
     * // Delete a few Sedes
     * const { count } = await prisma.sede.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SedeDeleteManyArgs>(args?: SelectSubset<T, SedeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sedes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sedes
     * const sede = await prisma.sede.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SedeUpdateManyArgs>(args: SelectSubset<T, SedeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Sede.
     * @param {SedeUpsertArgs} args - Arguments to update or create a Sede.
     * @example
     * // Update or create a Sede
     * const sede = await prisma.sede.upsert({
     *   create: {
     *     // ... data to create a Sede
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sede we want to update
     *   }
     * })
     */
    upsert<T extends SedeUpsertArgs>(args: SelectSubset<T, SedeUpsertArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sedes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeCountArgs} args - Arguments to filter Sedes to count.
     * @example
     * // Count the number of Sedes
     * const count = await prisma.sede.count({
     *   where: {
     *     // ... the filter for the Sedes we want to count
     *   }
     * })
    **/
    count<T extends SedeCountArgs>(
      args?: Subset<T, SedeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SedeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sede.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SedeAggregateArgs>(args: Subset<T, SedeAggregateArgs>): Prisma.PrismaPromise<GetSedeAggregateType<T>>

    /**
     * Group by Sede.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SedeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SedeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SedeGroupByArgs['orderBy'] }
        : { orderBy?: SedeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SedeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSedeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sede model
   */
  readonly fields: SedeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sede.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SedeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classrooms<T extends Sede$classroomsArgs<ExtArgs> = {}>(args?: Subset<T, Sede$classroomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberships<T extends Sede$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, Sede$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sede model
   */
  interface SedeFieldRefs {
    readonly id: FieldRef<"Sede", 'String'>
    readonly name: FieldRef<"Sede", 'String'>
    readonly address: FieldRef<"Sede", 'String'>
    readonly phone: FieldRef<"Sede", 'String'>
    readonly isActive: FieldRef<"Sede", 'Boolean'>
    readonly createdAt: FieldRef<"Sede", 'DateTime'>
    readonly updatedAt: FieldRef<"Sede", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sede findUnique
   */
  export type SedeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter, which Sede to fetch.
     */
    where: SedeWhereUniqueInput
  }

  /**
   * Sede findUniqueOrThrow
   */
  export type SedeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter, which Sede to fetch.
     */
    where: SedeWhereUniqueInput
  }

  /**
   * Sede findFirst
   */
  export type SedeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter, which Sede to fetch.
     */
    where?: SedeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sedes to fetch.
     */
    orderBy?: SedeOrderByWithRelationInput | SedeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sedes.
     */
    cursor?: SedeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sedes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sedes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sedes.
     */
    distinct?: SedeScalarFieldEnum | SedeScalarFieldEnum[]
  }

  /**
   * Sede findFirstOrThrow
   */
  export type SedeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter, which Sede to fetch.
     */
    where?: SedeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sedes to fetch.
     */
    orderBy?: SedeOrderByWithRelationInput | SedeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sedes.
     */
    cursor?: SedeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sedes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sedes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sedes.
     */
    distinct?: SedeScalarFieldEnum | SedeScalarFieldEnum[]
  }

  /**
   * Sede findMany
   */
  export type SedeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter, which Sedes to fetch.
     */
    where?: SedeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sedes to fetch.
     */
    orderBy?: SedeOrderByWithRelationInput | SedeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sedes.
     */
    cursor?: SedeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sedes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sedes.
     */
    skip?: number
    distinct?: SedeScalarFieldEnum | SedeScalarFieldEnum[]
  }

  /**
   * Sede create
   */
  export type SedeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * The data needed to create a Sede.
     */
    data: XOR<SedeCreateInput, SedeUncheckedCreateInput>
  }

  /**
   * Sede createMany
   */
  export type SedeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sedes.
     */
    data: SedeCreateManyInput | SedeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sede update
   */
  export type SedeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * The data needed to update a Sede.
     */
    data: XOR<SedeUpdateInput, SedeUncheckedUpdateInput>
    /**
     * Choose, which Sede to update.
     */
    where: SedeWhereUniqueInput
  }

  /**
   * Sede updateMany
   */
  export type SedeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sedes.
     */
    data: XOR<SedeUpdateManyMutationInput, SedeUncheckedUpdateManyInput>
    /**
     * Filter which Sedes to update
     */
    where?: SedeWhereInput
    /**
     * Limit how many Sedes to update.
     */
    limit?: number
  }

  /**
   * Sede upsert
   */
  export type SedeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * The filter to search for the Sede to update in case it exists.
     */
    where: SedeWhereUniqueInput
    /**
     * In case the Sede found by the `where` argument doesn't exist, create a new Sede with this data.
     */
    create: XOR<SedeCreateInput, SedeUncheckedCreateInput>
    /**
     * In case the Sede was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SedeUpdateInput, SedeUncheckedUpdateInput>
  }

  /**
   * Sede delete
   */
  export type SedeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    /**
     * Filter which Sede to delete.
     */
    where: SedeWhereUniqueInput
  }

  /**
   * Sede deleteMany
   */
  export type SedeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sedes to delete
     */
    where?: SedeWhereInput
    /**
     * Limit how many Sedes to delete.
     */
    limit?: number
  }

  /**
   * Sede.classrooms
   */
  export type Sede$classroomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    cursor?: ClassroomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Sede.memberships
   */
  export type Sede$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Sede without action
   */
  export type SedeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
  }


  /**
   * Model AcademicPeriod
   */

  export type AggregateAcademicPeriod = {
    _count: AcademicPeriodCountAggregateOutputType | null
    _min: AcademicPeriodMinAggregateOutputType | null
    _max: AcademicPeriodMaxAggregateOutputType | null
  }

  export type AcademicPeriodMinAggregateOutputType = {
    id: string | null
    name: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.PeriodStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicPeriodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.PeriodStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AcademicPeriodCountAggregateOutputType = {
    id: number
    name: number
    startDate: number
    endDate: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AcademicPeriodMinAggregateInputType = {
    id?: true
    name?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicPeriodMaxAggregateInputType = {
    id?: true
    name?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AcademicPeriodCountAggregateInputType = {
    id?: true
    name?: true
    startDate?: true
    endDate?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AcademicPeriodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriod to aggregate.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicPeriods
    **/
    _count?: true | AcademicPeriodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicPeriodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicPeriodMaxAggregateInputType
  }

  export type GetAcademicPeriodAggregateType<T extends AcademicPeriodAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicPeriod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicPeriod[P]>
      : GetScalarType<T[P], AggregateAcademicPeriod[P]>
  }




  export type AcademicPeriodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicPeriodWhereInput
    orderBy?: AcademicPeriodOrderByWithAggregationInput | AcademicPeriodOrderByWithAggregationInput[]
    by: AcademicPeriodScalarFieldEnum[] | AcademicPeriodScalarFieldEnum
    having?: AcademicPeriodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicPeriodCountAggregateInputType | true
    _min?: AcademicPeriodMinAggregateInputType
    _max?: AcademicPeriodMaxAggregateInputType
  }

  export type AcademicPeriodGroupByOutputType = {
    id: string
    name: string
    startDate: Date
    endDate: Date
    status: $Enums.PeriodStatus
    createdAt: Date
    updatedAt: Date
    _count: AcademicPeriodCountAggregateOutputType | null
    _min: AcademicPeriodMinAggregateOutputType | null
    _max: AcademicPeriodMaxAggregateOutputType | null
  }

  type GetAcademicPeriodGroupByPayload<T extends AcademicPeriodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicPeriodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicPeriodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicPeriodGroupByOutputType[P]>
        }
      >
    >


  export type AcademicPeriodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sections?: boolean | AcademicPeriod$sectionsArgs<ExtArgs>
    _count?: boolean | AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicPeriod"]>



  export type AcademicPeriodSelectScalar = {
    id?: boolean
    name?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AcademicPeriodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "startDate" | "endDate" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["academicPeriod"]>
  export type AcademicPeriodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | AcademicPeriod$sectionsArgs<ExtArgs>
    _count?: boolean | AcademicPeriodCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AcademicPeriodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicPeriod"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      startDate: Date
      endDate: Date
      status: $Enums.PeriodStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["academicPeriod"]>
    composites: {}
  }

  type AcademicPeriodGetPayload<S extends boolean | null | undefined | AcademicPeriodDefaultArgs> = $Result.GetResult<Prisma.$AcademicPeriodPayload, S>

  type AcademicPeriodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicPeriodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicPeriodCountAggregateInputType | true
    }

  export interface AcademicPeriodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicPeriod'], meta: { name: 'AcademicPeriod' } }
    /**
     * Find zero or one AcademicPeriod that matches the filter.
     * @param {AcademicPeriodFindUniqueArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicPeriodFindUniqueArgs>(args: SelectSubset<T, AcademicPeriodFindUniqueArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicPeriod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicPeriodFindUniqueOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicPeriodFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicPeriodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicPeriod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicPeriodFindFirstArgs>(args?: SelectSubset<T, AcademicPeriodFindFirstArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicPeriod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindFirstOrThrowArgs} args - Arguments to find a AcademicPeriod
     * @example
     * // Get one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicPeriodFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicPeriodFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicPeriods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany()
     * 
     * // Get first 10 AcademicPeriods
     * const academicPeriods = await prisma.academicPeriod.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicPeriodWithIdOnly = await prisma.academicPeriod.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicPeriodFindManyArgs>(args?: SelectSubset<T, AcademicPeriodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicPeriod.
     * @param {AcademicPeriodCreateArgs} args - Arguments to create a AcademicPeriod.
     * @example
     * // Create one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.create({
     *   data: {
     *     // ... data to create a AcademicPeriod
     *   }
     * })
     * 
     */
    create<T extends AcademicPeriodCreateArgs>(args: SelectSubset<T, AcademicPeriodCreateArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicPeriods.
     * @param {AcademicPeriodCreateManyArgs} args - Arguments to create many AcademicPeriods.
     * @example
     * // Create many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicPeriodCreateManyArgs>(args?: SelectSubset<T, AcademicPeriodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AcademicPeriod.
     * @param {AcademicPeriodDeleteArgs} args - Arguments to delete one AcademicPeriod.
     * @example
     * // Delete one AcademicPeriod
     * const AcademicPeriod = await prisma.academicPeriod.delete({
     *   where: {
     *     // ... filter to delete one AcademicPeriod
     *   }
     * })
     * 
     */
    delete<T extends AcademicPeriodDeleteArgs>(args: SelectSubset<T, AcademicPeriodDeleteArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicPeriod.
     * @param {AcademicPeriodUpdateArgs} args - Arguments to update one AcademicPeriod.
     * @example
     * // Update one AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicPeriodUpdateArgs>(args: SelectSubset<T, AcademicPeriodUpdateArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicPeriods.
     * @param {AcademicPeriodDeleteManyArgs} args - Arguments to filter AcademicPeriods to delete.
     * @example
     * // Delete a few AcademicPeriods
     * const { count } = await prisma.academicPeriod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicPeriodDeleteManyArgs>(args?: SelectSubset<T, AcademicPeriodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicPeriods
     * const academicPeriod = await prisma.academicPeriod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicPeriodUpdateManyArgs>(args: SelectSubset<T, AcademicPeriodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AcademicPeriod.
     * @param {AcademicPeriodUpsertArgs} args - Arguments to update or create a AcademicPeriod.
     * @example
     * // Update or create a AcademicPeriod
     * const academicPeriod = await prisma.academicPeriod.upsert({
     *   create: {
     *     // ... data to create a AcademicPeriod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicPeriod we want to update
     *   }
     * })
     */
    upsert<T extends AcademicPeriodUpsertArgs>(args: SelectSubset<T, AcademicPeriodUpsertArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicPeriods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodCountArgs} args - Arguments to filter AcademicPeriods to count.
     * @example
     * // Count the number of AcademicPeriods
     * const count = await prisma.academicPeriod.count({
     *   where: {
     *     // ... the filter for the AcademicPeriods we want to count
     *   }
     * })
    **/
    count<T extends AcademicPeriodCountArgs>(
      args?: Subset<T, AcademicPeriodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicPeriodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicPeriodAggregateArgs>(args: Subset<T, AcademicPeriodAggregateArgs>): Prisma.PrismaPromise<GetAcademicPeriodAggregateType<T>>

    /**
     * Group by AcademicPeriod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicPeriodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicPeriodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicPeriodGroupByArgs['orderBy'] }
        : { orderBy?: AcademicPeriodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicPeriodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicPeriodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicPeriod model
   */
  readonly fields: AcademicPeriodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicPeriod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicPeriodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends AcademicPeriod$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, AcademicPeriod$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicPeriod model
   */
  interface AcademicPeriodFieldRefs {
    readonly id: FieldRef<"AcademicPeriod", 'String'>
    readonly name: FieldRef<"AcademicPeriod", 'String'>
    readonly startDate: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly endDate: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly status: FieldRef<"AcademicPeriod", 'PeriodStatus'>
    readonly createdAt: FieldRef<"AcademicPeriod", 'DateTime'>
    readonly updatedAt: FieldRef<"AcademicPeriod", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AcademicPeriod findUnique
   */
  export type AcademicPeriodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod findUniqueOrThrow
   */
  export type AcademicPeriodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod findFirst
   */
  export type AcademicPeriodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod findFirstOrThrow
   */
  export type AcademicPeriodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter, which AcademicPeriod to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicPeriods.
     */
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod findMany
   */
  export type AcademicPeriodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter, which AcademicPeriods to fetch.
     */
    where?: AcademicPeriodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicPeriods to fetch.
     */
    orderBy?: AcademicPeriodOrderByWithRelationInput | AcademicPeriodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicPeriods.
     */
    cursor?: AcademicPeriodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicPeriods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicPeriods.
     */
    skip?: number
    distinct?: AcademicPeriodScalarFieldEnum | AcademicPeriodScalarFieldEnum[]
  }

  /**
   * AcademicPeriod create
   */
  export type AcademicPeriodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicPeriod.
     */
    data: XOR<AcademicPeriodCreateInput, AcademicPeriodUncheckedCreateInput>
  }

  /**
   * AcademicPeriod createMany
   */
  export type AcademicPeriodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicPeriods.
     */
    data: AcademicPeriodCreateManyInput | AcademicPeriodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicPeriod update
   */
  export type AcademicPeriodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicPeriod.
     */
    data: XOR<AcademicPeriodUpdateInput, AcademicPeriodUncheckedUpdateInput>
    /**
     * Choose, which AcademicPeriod to update.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod updateMany
   */
  export type AcademicPeriodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicPeriods.
     */
    data: XOR<AcademicPeriodUpdateManyMutationInput, AcademicPeriodUncheckedUpdateManyInput>
    /**
     * Filter which AcademicPeriods to update
     */
    where?: AcademicPeriodWhereInput
    /**
     * Limit how many AcademicPeriods to update.
     */
    limit?: number
  }

  /**
   * AcademicPeriod upsert
   */
  export type AcademicPeriodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicPeriod to update in case it exists.
     */
    where: AcademicPeriodWhereUniqueInput
    /**
     * In case the AcademicPeriod found by the `where` argument doesn't exist, create a new AcademicPeriod with this data.
     */
    create: XOR<AcademicPeriodCreateInput, AcademicPeriodUncheckedCreateInput>
    /**
     * In case the AcademicPeriod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicPeriodUpdateInput, AcademicPeriodUncheckedUpdateInput>
  }

  /**
   * AcademicPeriod delete
   */
  export type AcademicPeriodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
    /**
     * Filter which AcademicPeriod to delete.
     */
    where: AcademicPeriodWhereUniqueInput
  }

  /**
   * AcademicPeriod deleteMany
   */
  export type AcademicPeriodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicPeriods to delete
     */
    where?: AcademicPeriodWhereInput
    /**
     * Limit how many AcademicPeriods to delete.
     */
    limit?: number
  }

  /**
   * AcademicPeriod.sections
   */
  export type AcademicPeriod$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * AcademicPeriod without action
   */
  export type AcademicPeriodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicPeriod
     */
    select?: AcademicPeriodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicPeriod
     */
    omit?: AcademicPeriodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicPeriodInclude<ExtArgs> | null
  }


  /**
   * Model Turn
   */

  export type AggregateTurn = {
    _count: TurnCountAggregateOutputType | null
    _min: TurnMinAggregateOutputType | null
    _max: TurnMaxAggregateOutputType | null
  }

  export type TurnMinAggregateOutputType = {
    id: string | null
    name: string | null
    startTime: string | null
    endTime: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TurnMaxAggregateOutputType = {
    id: string | null
    name: string | null
    startTime: string | null
    endTime: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TurnCountAggregateOutputType = {
    id: number
    name: number
    startTime: number
    endTime: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TurnMinAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TurnMaxAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TurnCountAggregateInputType = {
    id?: true
    name?: true
    startTime?: true
    endTime?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TurnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turn to aggregate.
     */
    where?: TurnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turns to fetch.
     */
    orderBy?: TurnOrderByWithRelationInput | TurnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TurnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Turns
    **/
    _count?: true | TurnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TurnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TurnMaxAggregateInputType
  }

  export type GetTurnAggregateType<T extends TurnAggregateArgs> = {
        [P in keyof T & keyof AggregateTurn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTurn[P]>
      : GetScalarType<T[P], AggregateTurn[P]>
  }




  export type TurnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurnWhereInput
    orderBy?: TurnOrderByWithAggregationInput | TurnOrderByWithAggregationInput[]
    by: TurnScalarFieldEnum[] | TurnScalarFieldEnum
    having?: TurnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TurnCountAggregateInputType | true
    _min?: TurnMinAggregateInputType
    _max?: TurnMaxAggregateInputType
  }

  export type TurnGroupByOutputType = {
    id: string
    name: string
    startTime: string | null
    endTime: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: TurnCountAggregateOutputType | null
    _min: TurnMinAggregateOutputType | null
    _max: TurnMaxAggregateOutputType | null
  }

  type GetTurnGroupByPayload<T extends TurnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TurnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TurnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TurnGroupByOutputType[P]>
            : GetScalarType<T[P], TurnGroupByOutputType[P]>
        }
      >
    >


  export type TurnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    startTime?: boolean
    endTime?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sections?: boolean | Turn$sectionsArgs<ExtArgs>
    _count?: boolean | TurnCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turn"]>



  export type TurnSelectScalar = {
    id?: boolean
    name?: boolean
    startTime?: boolean
    endTime?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TurnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "startTime" | "endTime" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["turn"]>
  export type TurnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | Turn$sectionsArgs<ExtArgs>
    _count?: boolean | TurnCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TurnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Turn"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      startTime: string | null
      endTime: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["turn"]>
    composites: {}
  }

  type TurnGetPayload<S extends boolean | null | undefined | TurnDefaultArgs> = $Result.GetResult<Prisma.$TurnPayload, S>

  type TurnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TurnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TurnCountAggregateInputType | true
    }

  export interface TurnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Turn'], meta: { name: 'Turn' } }
    /**
     * Find zero or one Turn that matches the filter.
     * @param {TurnFindUniqueArgs} args - Arguments to find a Turn
     * @example
     * // Get one Turn
     * const turn = await prisma.turn.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TurnFindUniqueArgs>(args: SelectSubset<T, TurnFindUniqueArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Turn that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TurnFindUniqueOrThrowArgs} args - Arguments to find a Turn
     * @example
     * // Get one Turn
     * const turn = await prisma.turn.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TurnFindUniqueOrThrowArgs>(args: SelectSubset<T, TurnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turn that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnFindFirstArgs} args - Arguments to find a Turn
     * @example
     * // Get one Turn
     * const turn = await prisma.turn.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TurnFindFirstArgs>(args?: SelectSubset<T, TurnFindFirstArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turn that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnFindFirstOrThrowArgs} args - Arguments to find a Turn
     * @example
     * // Get one Turn
     * const turn = await prisma.turn.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TurnFindFirstOrThrowArgs>(args?: SelectSubset<T, TurnFindFirstOrThrowArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Turns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Turns
     * const turns = await prisma.turn.findMany()
     * 
     * // Get first 10 Turns
     * const turns = await prisma.turn.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const turnWithIdOnly = await prisma.turn.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TurnFindManyArgs>(args?: SelectSubset<T, TurnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Turn.
     * @param {TurnCreateArgs} args - Arguments to create a Turn.
     * @example
     * // Create one Turn
     * const Turn = await prisma.turn.create({
     *   data: {
     *     // ... data to create a Turn
     *   }
     * })
     * 
     */
    create<T extends TurnCreateArgs>(args: SelectSubset<T, TurnCreateArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Turns.
     * @param {TurnCreateManyArgs} args - Arguments to create many Turns.
     * @example
     * // Create many Turns
     * const turn = await prisma.turn.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TurnCreateManyArgs>(args?: SelectSubset<T, TurnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Turn.
     * @param {TurnDeleteArgs} args - Arguments to delete one Turn.
     * @example
     * // Delete one Turn
     * const Turn = await prisma.turn.delete({
     *   where: {
     *     // ... filter to delete one Turn
     *   }
     * })
     * 
     */
    delete<T extends TurnDeleteArgs>(args: SelectSubset<T, TurnDeleteArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Turn.
     * @param {TurnUpdateArgs} args - Arguments to update one Turn.
     * @example
     * // Update one Turn
     * const turn = await prisma.turn.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TurnUpdateArgs>(args: SelectSubset<T, TurnUpdateArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Turns.
     * @param {TurnDeleteManyArgs} args - Arguments to filter Turns to delete.
     * @example
     * // Delete a few Turns
     * const { count } = await prisma.turn.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TurnDeleteManyArgs>(args?: SelectSubset<T, TurnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Turns
     * const turn = await prisma.turn.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TurnUpdateManyArgs>(args: SelectSubset<T, TurnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Turn.
     * @param {TurnUpsertArgs} args - Arguments to update or create a Turn.
     * @example
     * // Update or create a Turn
     * const turn = await prisma.turn.upsert({
     *   create: {
     *     // ... data to create a Turn
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Turn we want to update
     *   }
     * })
     */
    upsert<T extends TurnUpsertArgs>(args: SelectSubset<T, TurnUpsertArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Turns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnCountArgs} args - Arguments to filter Turns to count.
     * @example
     * // Count the number of Turns
     * const count = await prisma.turn.count({
     *   where: {
     *     // ... the filter for the Turns we want to count
     *   }
     * })
    **/
    count<T extends TurnCountArgs>(
      args?: Subset<T, TurnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TurnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Turn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TurnAggregateArgs>(args: Subset<T, TurnAggregateArgs>): Prisma.PrismaPromise<GetTurnAggregateType<T>>

    /**
     * Group by Turn.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TurnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TurnGroupByArgs['orderBy'] }
        : { orderBy?: TurnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TurnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTurnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Turn model
   */
  readonly fields: TurnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Turn.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TurnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends Turn$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Turn$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Turn model
   */
  interface TurnFieldRefs {
    readonly id: FieldRef<"Turn", 'String'>
    readonly name: FieldRef<"Turn", 'String'>
    readonly startTime: FieldRef<"Turn", 'String'>
    readonly endTime: FieldRef<"Turn", 'String'>
    readonly isActive: FieldRef<"Turn", 'Boolean'>
    readonly createdAt: FieldRef<"Turn", 'DateTime'>
    readonly updatedAt: FieldRef<"Turn", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Turn findUnique
   */
  export type TurnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter, which Turn to fetch.
     */
    where: TurnWhereUniqueInput
  }

  /**
   * Turn findUniqueOrThrow
   */
  export type TurnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter, which Turn to fetch.
     */
    where: TurnWhereUniqueInput
  }

  /**
   * Turn findFirst
   */
  export type TurnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter, which Turn to fetch.
     */
    where?: TurnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turns to fetch.
     */
    orderBy?: TurnOrderByWithRelationInput | TurnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turns.
     */
    cursor?: TurnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turns.
     */
    distinct?: TurnScalarFieldEnum | TurnScalarFieldEnum[]
  }

  /**
   * Turn findFirstOrThrow
   */
  export type TurnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter, which Turn to fetch.
     */
    where?: TurnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turns to fetch.
     */
    orderBy?: TurnOrderByWithRelationInput | TurnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turns.
     */
    cursor?: TurnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turns.
     */
    distinct?: TurnScalarFieldEnum | TurnScalarFieldEnum[]
  }

  /**
   * Turn findMany
   */
  export type TurnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter, which Turns to fetch.
     */
    where?: TurnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turns to fetch.
     */
    orderBy?: TurnOrderByWithRelationInput | TurnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Turns.
     */
    cursor?: TurnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turns.
     */
    skip?: number
    distinct?: TurnScalarFieldEnum | TurnScalarFieldEnum[]
  }

  /**
   * Turn create
   */
  export type TurnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * The data needed to create a Turn.
     */
    data: XOR<TurnCreateInput, TurnUncheckedCreateInput>
  }

  /**
   * Turn createMany
   */
  export type TurnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Turns.
     */
    data: TurnCreateManyInput | TurnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turn update
   */
  export type TurnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * The data needed to update a Turn.
     */
    data: XOR<TurnUpdateInput, TurnUncheckedUpdateInput>
    /**
     * Choose, which Turn to update.
     */
    where: TurnWhereUniqueInput
  }

  /**
   * Turn updateMany
   */
  export type TurnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Turns.
     */
    data: XOR<TurnUpdateManyMutationInput, TurnUncheckedUpdateManyInput>
    /**
     * Filter which Turns to update
     */
    where?: TurnWhereInput
    /**
     * Limit how many Turns to update.
     */
    limit?: number
  }

  /**
   * Turn upsert
   */
  export type TurnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * The filter to search for the Turn to update in case it exists.
     */
    where: TurnWhereUniqueInput
    /**
     * In case the Turn found by the `where` argument doesn't exist, create a new Turn with this data.
     */
    create: XOR<TurnCreateInput, TurnUncheckedCreateInput>
    /**
     * In case the Turn was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TurnUpdateInput, TurnUncheckedUpdateInput>
  }

  /**
   * Turn delete
   */
  export type TurnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
    /**
     * Filter which Turn to delete.
     */
    where: TurnWhereUniqueInput
  }

  /**
   * Turn deleteMany
   */
  export type TurnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turns to delete
     */
    where?: TurnWhereInput
    /**
     * Limit how many Turns to delete.
     */
    limit?: number
  }

  /**
   * Turn.sections
   */
  export type Turn$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Turn without action
   */
  export type TurnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turn
     */
    select?: TurnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turn
     */
    omit?: TurnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurnInclude<ExtArgs> | null
  }


  /**
   * Model Classroom
   */

  export type AggregateClassroom = {
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  export type ClassroomAvgAggregateOutputType = {
    capacity: number | null
  }

  export type ClassroomSumAggregateOutputType = {
    capacity: number | null
  }

  export type ClassroomMinAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    capacity: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    sedeId: string | null
  }

  export type ClassroomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    location: string | null
    capacity: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    sedeId: string | null
  }

  export type ClassroomCountAggregateOutputType = {
    id: number
    name: number
    location: number
    capacity: number
    isActive: number
    createdAt: number
    updatedAt: number
    sedeId: number
    _all: number
  }


  export type ClassroomAvgAggregateInputType = {
    capacity?: true
  }

  export type ClassroomSumAggregateInputType = {
    capacity?: true
  }

  export type ClassroomMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    sedeId?: true
  }

  export type ClassroomMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    sedeId?: true
  }

  export type ClassroomCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    sedeId?: true
    _all?: true
  }

  export type ClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classroom to aggregate.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classrooms
    **/
    _count?: true | ClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassroomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassroomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassroomMaxAggregateInputType
  }

  export type GetClassroomAggregateType<T extends ClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassroom[P]>
      : GetScalarType<T[P], AggregateClassroom[P]>
  }




  export type ClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithAggregationInput | ClassroomOrderByWithAggregationInput[]
    by: ClassroomScalarFieldEnum[] | ClassroomScalarFieldEnum
    having?: ClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassroomCountAggregateInputType | true
    _avg?: ClassroomAvgAggregateInputType
    _sum?: ClassroomSumAggregateInputType
    _min?: ClassroomMinAggregateInputType
    _max?: ClassroomMaxAggregateInputType
  }

  export type ClassroomGroupByOutputType = {
    id: string
    name: string
    location: string | null
    capacity: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    sedeId: string
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  type GetClassroomGroupByPayload<T extends ClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
        }
      >
    >


  export type ClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    capacity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sedeId?: boolean
    sede?: boolean | SedeDefaultArgs<ExtArgs>
    sections?: boolean | Classroom$sectionsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>



  export type ClassroomSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    capacity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sedeId?: boolean
  }

  export type ClassroomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "capacity" | "isActive" | "createdAt" | "updatedAt" | "sedeId", ExtArgs["result"]["classroom"]>
  export type ClassroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sede?: boolean | SedeDefaultArgs<ExtArgs>
    sections?: boolean | Classroom$sectionsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classroom"
    objects: {
      sede: Prisma.$SedePayload<ExtArgs>
      sections: Prisma.$SectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      location: string | null
      capacity: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      sedeId: string
    }, ExtArgs["result"]["classroom"]>
    composites: {}
  }

  type ClassroomGetPayload<S extends boolean | null | undefined | ClassroomDefaultArgs> = $Result.GetResult<Prisma.$ClassroomPayload, S>

  type ClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassroomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassroomCountAggregateInputType | true
    }

  export interface ClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classroom'], meta: { name: 'Classroom' } }
    /**
     * Find zero or one Classroom that matches the filter.
     * @param {ClassroomFindUniqueArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassroomFindUniqueArgs>(args: SelectSubset<T, ClassroomFindUniqueArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Classroom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassroomFindUniqueOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassroomFindFirstArgs>(args?: SelectSubset<T, ClassroomFindFirstArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Classroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classrooms
     * const classrooms = await prisma.classroom.findMany()
     * 
     * // Get first 10 Classrooms
     * const classrooms = await prisma.classroom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classroomWithIdOnly = await prisma.classroom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassroomFindManyArgs>(args?: SelectSubset<T, ClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Classroom.
     * @param {ClassroomCreateArgs} args - Arguments to create a Classroom.
     * @example
     * // Create one Classroom
     * const Classroom = await prisma.classroom.create({
     *   data: {
     *     // ... data to create a Classroom
     *   }
     * })
     * 
     */
    create<T extends ClassroomCreateArgs>(args: SelectSubset<T, ClassroomCreateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classrooms.
     * @param {ClassroomCreateManyArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassroomCreateManyArgs>(args?: SelectSubset<T, ClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Classroom.
     * @param {ClassroomDeleteArgs} args - Arguments to delete one Classroom.
     * @example
     * // Delete one Classroom
     * const Classroom = await prisma.classroom.delete({
     *   where: {
     *     // ... filter to delete one Classroom
     *   }
     * })
     * 
     */
    delete<T extends ClassroomDeleteArgs>(args: SelectSubset<T, ClassroomDeleteArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Classroom.
     * @param {ClassroomUpdateArgs} args - Arguments to update one Classroom.
     * @example
     * // Update one Classroom
     * const classroom = await prisma.classroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassroomUpdateArgs>(args: SelectSubset<T, ClassroomUpdateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classrooms.
     * @param {ClassroomDeleteManyArgs} args - Arguments to filter Classrooms to delete.
     * @example
     * // Delete a few Classrooms
     * const { count } = await prisma.classroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassroomDeleteManyArgs>(args?: SelectSubset<T, ClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassroomUpdateManyArgs>(args: SelectSubset<T, ClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classroom.
     * @param {ClassroomUpsertArgs} args - Arguments to update or create a Classroom.
     * @example
     * // Update or create a Classroom
     * const classroom = await prisma.classroom.upsert({
     *   create: {
     *     // ... data to create a Classroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classroom we want to update
     *   }
     * })
     */
    upsert<T extends ClassroomUpsertArgs>(args: SelectSubset<T, ClassroomUpsertArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomCountArgs} args - Arguments to filter Classrooms to count.
     * @example
     * // Count the number of Classrooms
     * const count = await prisma.classroom.count({
     *   where: {
     *     // ... the filter for the Classrooms we want to count
     *   }
     * })
    **/
    count<T extends ClassroomCountArgs>(
      args?: Subset<T, ClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassroomAggregateArgs>(args: Subset<T, ClassroomAggregateArgs>): Prisma.PrismaPromise<GetClassroomAggregateType<T>>

    /**
     * Group by Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassroomGroupByArgs['orderBy'] }
        : { orderBy?: ClassroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classroom model
   */
  readonly fields: ClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sede<T extends SedeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SedeDefaultArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sections<T extends Classroom$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Classroom model
   */
  interface ClassroomFieldRefs {
    readonly id: FieldRef<"Classroom", 'String'>
    readonly name: FieldRef<"Classroom", 'String'>
    readonly location: FieldRef<"Classroom", 'String'>
    readonly capacity: FieldRef<"Classroom", 'Int'>
    readonly isActive: FieldRef<"Classroom", 'Boolean'>
    readonly createdAt: FieldRef<"Classroom", 'DateTime'>
    readonly updatedAt: FieldRef<"Classroom", 'DateTime'>
    readonly sedeId: FieldRef<"Classroom", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Classroom findUnique
   */
  export type ClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findUniqueOrThrow
   */
  export type ClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findFirst
   */
  export type ClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findFirstOrThrow
   */
  export type ClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findMany
   */
  export type ClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classrooms to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom create
   */
  export type ClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to create a Classroom.
     */
    data: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
  }

  /**
   * Classroom createMany
   */
  export type ClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classroom update
   */
  export type ClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to update a Classroom.
     */
    data: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
    /**
     * Choose, which Classroom to update.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom updateMany
   */
  export type ClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
    /**
     * Limit how many Classrooms to update.
     */
    limit?: number
  }

  /**
   * Classroom upsert
   */
  export type ClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The filter to search for the Classroom to update in case it exists.
     */
    where: ClassroomWhereUniqueInput
    /**
     * In case the Classroom found by the `where` argument doesn't exist, create a new Classroom with this data.
     */
    create: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
    /**
     * In case the Classroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
  }

  /**
   * Classroom delete
   */
  export type ClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter which Classroom to delete.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom deleteMany
   */
  export type ClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classrooms to delete
     */
    where?: ClassroomWhereInput
    /**
     * Limit how many Classrooms to delete.
     */
    limit?: number
  }

  /**
   * Classroom.sections
   */
  export type Classroom$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Classroom without action
   */
  export type ClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Classroom
     */
    omit?: ClassroomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionAvgAggregateOutputType = {
    capacity: number | null
  }

  export type SectionSumAggregateOutputType = {
    capacity: number | null
  }

  export type SectionMinAggregateOutputType = {
    id: string | null
    name: string | null
    capacity: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    classroomId: string | null
    turnId: string | null
    periodId: string | null
  }

  export type SectionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    capacity: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    classroomId: string | null
    turnId: string | null
    periodId: string | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    name: number
    capacity: number
    isActive: number
    createdAt: number
    updatedAt: number
    classroomId: number
    turnId: number
    periodId: number
    _all: number
  }


  export type SectionAvgAggregateInputType = {
    capacity?: true
  }

  export type SectionSumAggregateInputType = {
    capacity?: true
  }

  export type SectionMinAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    classroomId?: true
    turnId?: true
    periodId?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    classroomId?: true
    turnId?: true
    periodId?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    name?: true
    capacity?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    classroomId?: true
    turnId?: true
    periodId?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _avg?: SectionAvgAggregateInputType
    _sum?: SectionSumAggregateInputType
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: string
    name: string
    capacity: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    classroomId: string
    turnId: string
    periodId: string
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    capacity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classroomId?: boolean
    turnId?: boolean
    periodId?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    turn?: boolean | TurnDefaultArgs<ExtArgs>
    period?: boolean | AcademicPeriodDefaultArgs<ExtArgs>
    enrollments?: boolean | Section$enrollmentsArgs<ExtArgs>
    sectionCourses?: boolean | Section$sectionCoursesArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>



  export type SectionSelectScalar = {
    id?: boolean
    name?: boolean
    capacity?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    classroomId?: boolean
    turnId?: boolean
    periodId?: boolean
  }

  export type SectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "capacity" | "isActive" | "createdAt" | "updatedAt" | "classroomId" | "turnId" | "periodId", ExtArgs["result"]["section"]>
  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
    turn?: boolean | TurnDefaultArgs<ExtArgs>
    period?: boolean | AcademicPeriodDefaultArgs<ExtArgs>
    enrollments?: boolean | Section$enrollmentsArgs<ExtArgs>
    sectionCourses?: boolean | Section$sectionCoursesArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      classroom: Prisma.$ClassroomPayload<ExtArgs>
      turn: Prisma.$TurnPayload<ExtArgs>
      period: Prisma.$AcademicPeriodPayload<ExtArgs>
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      sectionCourses: Prisma.$SectionCoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      capacity: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      classroomId: string
      turnId: string
      periodId: string
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classroom<T extends ClassroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassroomDefaultArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    turn<T extends TurnDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TurnDefaultArgs<ExtArgs>>): Prisma__TurnClient<$Result.GetResult<Prisma.$TurnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    period<T extends AcademicPeriodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademicPeriodDefaultArgs<ExtArgs>>): Prisma__AcademicPeriodClient<$Result.GetResult<Prisma.$AcademicPeriodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    enrollments<T extends Section$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Section$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sectionCourses<T extends Section$sectionCoursesArgs<ExtArgs> = {}>(args?: Subset<T, Section$sectionCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'String'>
    readonly name: FieldRef<"Section", 'String'>
    readonly capacity: FieldRef<"Section", 'Int'>
    readonly isActive: FieldRef<"Section", 'Boolean'>
    readonly createdAt: FieldRef<"Section", 'DateTime'>
    readonly updatedAt: FieldRef<"Section", 'DateTime'>
    readonly classroomId: FieldRef<"Section", 'String'>
    readonly turnId: FieldRef<"Section", 'String'>
    readonly periodId: FieldRef<"Section", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to delete.
     */
    limit?: number
  }

  /**
   * Section.enrollments
   */
  export type Section$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Section.sectionCourses
   */
  export type Section$sectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    where?: SectionCourseWhereInput
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    cursor?: SectionCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    courseTeachers?: boolean | Course$courseTeachersArgs<ExtArgs>
    sectionCourses?: boolean | Course$sectionCoursesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>



  export type CourseSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courseTeachers?: boolean | Course$courseTeachersArgs<ExtArgs>
    sectionCourses?: boolean | Course$sectionCoursesArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      courseTeachers: Prisma.$CourseTeacherPayload<ExtArgs>[]
      sectionCourses: Prisma.$SectionCoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courseTeachers<T extends Course$courseTeachersArgs<ExtArgs> = {}>(args?: Subset<T, Course$courseTeachersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sectionCourses<T extends Course$sectionCoursesArgs<ExtArgs> = {}>(args?: Subset<T, Course$sectionCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly code: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly description: FieldRef<"Course", 'String'>
    readonly isActive: FieldRef<"Course", 'Boolean'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.courseTeachers
   */
  export type Course$courseTeachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    where?: CourseTeacherWhereInput
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    cursor?: CourseTeacherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseTeacherScalarFieldEnum | CourseTeacherScalarFieldEnum[]
  }

  /**
   * Course.sectionCourses
   */
  export type Course$sectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    where?: SectionCourseWhereInput
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    cursor?: SectionCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    isActive: boolean | null
    lastLoginAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    isActive: number
    lastLoginAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isActive?: true
    lastLoginAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    isActive: boolean
    lastLoginAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    courseTeachers?: boolean | User$courseTeachersArgs<ExtArgs>
    sectionCourses?: boolean | User$sectionCoursesArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    parentOf?: boolean | User$parentOfArgs<ExtArgs>
    studentOf?: boolean | User$studentOfArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isActive?: boolean
    lastLoginAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "isActive" | "lastLoginAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    memberships?: boolean | User$membershipsArgs<ExtArgs>
    courseTeachers?: boolean | User$courseTeachersArgs<ExtArgs>
    sectionCourses?: boolean | User$sectionCoursesArgs<ExtArgs>
    enrollments?: boolean | User$enrollmentsArgs<ExtArgs>
    parentOf?: boolean | User$parentOfArgs<ExtArgs>
    studentOf?: boolean | User$studentOfArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      memberships: Prisma.$MembershipPayload<ExtArgs>[]
      courseTeachers: Prisma.$CourseTeacherPayload<ExtArgs>[]
      sectionCourses: Prisma.$SectionCoursePayload<ExtArgs>[]
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      parentOf: Prisma.$ParentStudentPayload<ExtArgs>[]
      studentOf: Prisma.$ParentStudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      isActive: boolean
      lastLoginAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    memberships<T extends User$membershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$membershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    courseTeachers<T extends User$courseTeachersArgs<ExtArgs> = {}>(args?: Subset<T, User$courseTeachersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sectionCourses<T extends User$sectionCoursesArgs<ExtArgs> = {}>(args?: Subset<T, User$sectionCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    enrollments<T extends User$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parentOf<T extends User$parentOfArgs<ExtArgs> = {}>(args?: Subset<T, User$parentOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studentOf<T extends User$studentOfArgs<ExtArgs> = {}>(args?: Subset<T, User$studentOfArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.memberships
   */
  export type User$membershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    cursor?: MembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * User.courseTeachers
   */
  export type User$courseTeachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    where?: CourseTeacherWhereInput
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    cursor?: CourseTeacherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseTeacherScalarFieldEnum | CourseTeacherScalarFieldEnum[]
  }

  /**
   * User.sectionCourses
   */
  export type User$sectionCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    where?: SectionCourseWhereInput
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    cursor?: SectionCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * User.enrollments
   */
  export type User$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * User.parentOf
   */
  export type User$parentOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    where?: ParentStudentWhereInput
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    cursor?: ParentStudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentStudentScalarFieldEnum | ParentStudentScalarFieldEnum[]
  }

  /**
   * User.studentOf
   */
  export type User$studentOfArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    where?: ParentStudentWhereInput
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    cursor?: ParentStudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParentStudentScalarFieldEnum | ParentStudentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    documentType: string | null
    documentNumber: string | null
    phone: string | null
    birthDate: Date | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    documentType: string | null
    documentNumber: string | null
    phone: string | null
    birthDate: Date | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    documentType: number
    documentNumber: number
    phone: number
    birthDate: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    phone?: true
    birthDate?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    phone?: true
    birthDate?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    documentType?: true
    documentNumber?: true
    phone?: true
    birthDate?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    documentType: string | null
    documentNumber: string | null
    phone: string | null
    birthDate: Date | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    phone?: boolean
    birthDate?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>



  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    documentType?: boolean
    documentNumber?: boolean
    phone?: boolean
    birthDate?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName" | "documentType" | "documentNumber" | "phone" | "birthDate" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      documentType: string | null
      documentNumber: string | null
      phone: string | null
      birthDate: Date | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly documentType: FieldRef<"Profile", 'String'>
    readonly documentNumber: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly birthDate: FieldRef<"Profile", 'DateTime'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Membership
   */

  export type AggregateMembership = {
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  export type MembershipMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    status: $Enums.MembershipStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    sedeId: string | null
  }

  export type MembershipMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    status: $Enums.MembershipStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    sedeId: string | null
  }

  export type MembershipCountAggregateOutputType = {
    id: number
    role: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    sedeId: number
    _all: number
  }


  export type MembershipMinAggregateInputType = {
    id?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sedeId?: true
  }

  export type MembershipMaxAggregateInputType = {
    id?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sedeId?: true
  }

  export type MembershipCountAggregateInputType = {
    id?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    sedeId?: true
    _all?: true
  }

  export type MembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Membership to aggregate.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memberships
    **/
    _count?: true | MembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MembershipMaxAggregateInputType
  }

  export type GetMembershipAggregateType<T extends MembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMembership[P]>
      : GetScalarType<T[P], AggregateMembership[P]>
  }




  export type MembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MembershipWhereInput
    orderBy?: MembershipOrderByWithAggregationInput | MembershipOrderByWithAggregationInput[]
    by: MembershipScalarFieldEnum[] | MembershipScalarFieldEnum
    having?: MembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MembershipCountAggregateInputType | true
    _min?: MembershipMinAggregateInputType
    _max?: MembershipMaxAggregateInputType
  }

  export type MembershipGroupByOutputType = {
    id: string
    role: $Enums.Role
    status: $Enums.MembershipStatus
    createdAt: Date
    updatedAt: Date
    userId: string
    sedeId: string | null
    _count: MembershipCountAggregateOutputType | null
    _min: MembershipMinAggregateOutputType | null
    _max: MembershipMaxAggregateOutputType | null
  }

  type GetMembershipGroupByPayload<T extends MembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MembershipGroupByOutputType[P]>
            : GetScalarType<T[P], MembershipGroupByOutputType[P]>
        }
      >
    >


  export type MembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sedeId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    sede?: boolean | Membership$sedeArgs<ExtArgs>
  }, ExtArgs["result"]["membership"]>



  export type MembershipSelectScalar = {
    id?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    sedeId?: boolean
  }

  export type MembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "status" | "createdAt" | "updatedAt" | "userId" | "sedeId", ExtArgs["result"]["membership"]>
  export type MembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    sede?: boolean | Membership$sedeArgs<ExtArgs>
  }

  export type $MembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Membership"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      sede: Prisma.$SedePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      status: $Enums.MembershipStatus
      createdAt: Date
      updatedAt: Date
      userId: string
      sedeId: string | null
    }, ExtArgs["result"]["membership"]>
    composites: {}
  }

  type MembershipGetPayload<S extends boolean | null | undefined | MembershipDefaultArgs> = $Result.GetResult<Prisma.$MembershipPayload, S>

  type MembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MembershipCountAggregateInputType | true
    }

  export interface MembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Membership'], meta: { name: 'Membership' } }
    /**
     * Find zero or one Membership that matches the filter.
     * @param {MembershipFindUniqueArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MembershipFindUniqueArgs>(args: SelectSubset<T, MembershipFindUniqueArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Membership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MembershipFindUniqueOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, MembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MembershipFindFirstArgs>(args?: SelectSubset<T, MembershipFindFirstArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Membership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindFirstOrThrowArgs} args - Arguments to find a Membership
     * @example
     * // Get one Membership
     * const membership = await prisma.membership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, MembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memberships
     * const memberships = await prisma.membership.findMany()
     * 
     * // Get first 10 Memberships
     * const memberships = await prisma.membership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const membershipWithIdOnly = await prisma.membership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MembershipFindManyArgs>(args?: SelectSubset<T, MembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Membership.
     * @param {MembershipCreateArgs} args - Arguments to create a Membership.
     * @example
     * // Create one Membership
     * const Membership = await prisma.membership.create({
     *   data: {
     *     // ... data to create a Membership
     *   }
     * })
     * 
     */
    create<T extends MembershipCreateArgs>(args: SelectSubset<T, MembershipCreateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memberships.
     * @param {MembershipCreateManyArgs} args - Arguments to create many Memberships.
     * @example
     * // Create many Memberships
     * const membership = await prisma.membership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MembershipCreateManyArgs>(args?: SelectSubset<T, MembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Membership.
     * @param {MembershipDeleteArgs} args - Arguments to delete one Membership.
     * @example
     * // Delete one Membership
     * const Membership = await prisma.membership.delete({
     *   where: {
     *     // ... filter to delete one Membership
     *   }
     * })
     * 
     */
    delete<T extends MembershipDeleteArgs>(args: SelectSubset<T, MembershipDeleteArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Membership.
     * @param {MembershipUpdateArgs} args - Arguments to update one Membership.
     * @example
     * // Update one Membership
     * const membership = await prisma.membership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MembershipUpdateArgs>(args: SelectSubset<T, MembershipUpdateArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memberships.
     * @param {MembershipDeleteManyArgs} args - Arguments to filter Memberships to delete.
     * @example
     * // Delete a few Memberships
     * const { count } = await prisma.membership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MembershipDeleteManyArgs>(args?: SelectSubset<T, MembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memberships
     * const membership = await prisma.membership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MembershipUpdateManyArgs>(args: SelectSubset<T, MembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Membership.
     * @param {MembershipUpsertArgs} args - Arguments to update or create a Membership.
     * @example
     * // Update or create a Membership
     * const membership = await prisma.membership.upsert({
     *   create: {
     *     // ... data to create a Membership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Membership we want to update
     *   }
     * })
     */
    upsert<T extends MembershipUpsertArgs>(args: SelectSubset<T, MembershipUpsertArgs<ExtArgs>>): Prisma__MembershipClient<$Result.GetResult<Prisma.$MembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipCountArgs} args - Arguments to filter Memberships to count.
     * @example
     * // Count the number of Memberships
     * const count = await prisma.membership.count({
     *   where: {
     *     // ... the filter for the Memberships we want to count
     *   }
     * })
    **/
    count<T extends MembershipCountArgs>(
      args?: Subset<T, MembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MembershipAggregateArgs>(args: Subset<T, MembershipAggregateArgs>): Prisma.PrismaPromise<GetMembershipAggregateType<T>>

    /**
     * Group by Membership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MembershipGroupByArgs['orderBy'] }
        : { orderBy?: MembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Membership model
   */
  readonly fields: MembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Membership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sede<T extends Membership$sedeArgs<ExtArgs> = {}>(args?: Subset<T, Membership$sedeArgs<ExtArgs>>): Prisma__SedeClient<$Result.GetResult<Prisma.$SedePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Membership model
   */
  interface MembershipFieldRefs {
    readonly id: FieldRef<"Membership", 'String'>
    readonly role: FieldRef<"Membership", 'Role'>
    readonly status: FieldRef<"Membership", 'MembershipStatus'>
    readonly createdAt: FieldRef<"Membership", 'DateTime'>
    readonly updatedAt: FieldRef<"Membership", 'DateTime'>
    readonly userId: FieldRef<"Membership", 'String'>
    readonly sedeId: FieldRef<"Membership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Membership findUnique
   */
  export type MembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findUniqueOrThrow
   */
  export type MembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership findFirst
   */
  export type MembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findFirstOrThrow
   */
  export type MembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Membership to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memberships.
     */
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership findMany
   */
  export type MembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter, which Memberships to fetch.
     */
    where?: MembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memberships to fetch.
     */
    orderBy?: MembershipOrderByWithRelationInput | MembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memberships.
     */
    cursor?: MembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memberships.
     */
    skip?: number
    distinct?: MembershipScalarFieldEnum | MembershipScalarFieldEnum[]
  }

  /**
   * Membership create
   */
  export type MembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a Membership.
     */
    data: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
  }

  /**
   * Membership createMany
   */
  export type MembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memberships.
     */
    data: MembershipCreateManyInput | MembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Membership update
   */
  export type MembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a Membership.
     */
    data: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
    /**
     * Choose, which Membership to update.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership updateMany
   */
  export type MembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memberships.
     */
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyInput>
    /**
     * Filter which Memberships to update
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to update.
     */
    limit?: number
  }

  /**
   * Membership upsert
   */
  export type MembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the Membership to update in case it exists.
     */
    where: MembershipWhereUniqueInput
    /**
     * In case the Membership found by the `where` argument doesn't exist, create a new Membership with this data.
     */
    create: XOR<MembershipCreateInput, MembershipUncheckedCreateInput>
    /**
     * In case the Membership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MembershipUpdateInput, MembershipUncheckedUpdateInput>
  }

  /**
   * Membership delete
   */
  export type MembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
    /**
     * Filter which Membership to delete.
     */
    where: MembershipWhereUniqueInput
  }

  /**
   * Membership deleteMany
   */
  export type MembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memberships to delete
     */
    where?: MembershipWhereInput
    /**
     * Limit how many Memberships to delete.
     */
    limit?: number
  }

  /**
   * Membership.sede
   */
  export type Membership$sedeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sede
     */
    select?: SedeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sede
     */
    omit?: SedeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SedeInclude<ExtArgs> | null
    where?: SedeWhereInput
  }

  /**
   * Membership without action
   */
  export type MembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Membership
     */
    select?: MembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Membership
     */
    omit?: MembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MembershipInclude<ExtArgs> | null
  }


  /**
   * Model CourseTeacher
   */

  export type AggregateCourseTeacher = {
    _count: CourseTeacherCountAggregateOutputType | null
    _min: CourseTeacherMinAggregateOutputType | null
    _max: CourseTeacherMaxAggregateOutputType | null
  }

  export type CourseTeacherMinAggregateOutputType = {
    id: string | null
    courseId: string | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseTeacherMaxAggregateOutputType = {
    id: string | null
    courseId: string | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseTeacherCountAggregateOutputType = {
    id: number
    courseId: number
    teacherId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseTeacherMinAggregateInputType = {
    id?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseTeacherMaxAggregateInputType = {
    id?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseTeacherCountAggregateInputType = {
    id?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseTeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTeacher to aggregate.
     */
    where?: CourseTeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTeachers to fetch.
     */
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseTeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTeachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTeachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CourseTeachers
    **/
    _count?: true | CourseTeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseTeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseTeacherMaxAggregateInputType
  }

  export type GetCourseTeacherAggregateType<T extends CourseTeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateCourseTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourseTeacher[P]>
      : GetScalarType<T[P], AggregateCourseTeacher[P]>
  }




  export type CourseTeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseTeacherWhereInput
    orderBy?: CourseTeacherOrderByWithAggregationInput | CourseTeacherOrderByWithAggregationInput[]
    by: CourseTeacherScalarFieldEnum[] | CourseTeacherScalarFieldEnum
    having?: CourseTeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseTeacherCountAggregateInputType | true
    _min?: CourseTeacherMinAggregateInputType
    _max?: CourseTeacherMaxAggregateInputType
  }

  export type CourseTeacherGroupByOutputType = {
    id: string
    courseId: string
    teacherId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: CourseTeacherCountAggregateOutputType | null
    _min: CourseTeacherMinAggregateOutputType | null
    _max: CourseTeacherMaxAggregateOutputType | null
  }

  type GetCourseTeacherGroupByPayload<T extends CourseTeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseTeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseTeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseTeacherGroupByOutputType[P]>
            : GetScalarType<T[P], CourseTeacherGroupByOutputType[P]>
        }
      >
    >


  export type CourseTeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    courseId?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    course?: boolean | CourseDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["courseTeacher"]>



  export type CourseTeacherSelectScalar = {
    id?: boolean
    courseId?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseTeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "courseId" | "teacherId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["courseTeacher"]>
  export type CourseTeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    course?: boolean | CourseDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CourseTeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CourseTeacher"
    objects: {
      course: Prisma.$CoursePayload<ExtArgs>
      teacher: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      courseId: string
      teacherId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["courseTeacher"]>
    composites: {}
  }

  type CourseTeacherGetPayload<S extends boolean | null | undefined | CourseTeacherDefaultArgs> = $Result.GetResult<Prisma.$CourseTeacherPayload, S>

  type CourseTeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseTeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseTeacherCountAggregateInputType | true
    }

  export interface CourseTeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CourseTeacher'], meta: { name: 'CourseTeacher' } }
    /**
     * Find zero or one CourseTeacher that matches the filter.
     * @param {CourseTeacherFindUniqueArgs} args - Arguments to find a CourseTeacher
     * @example
     * // Get one CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseTeacherFindUniqueArgs>(args: SelectSubset<T, CourseTeacherFindUniqueArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CourseTeacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseTeacherFindUniqueOrThrowArgs} args - Arguments to find a CourseTeacher
     * @example
     * // Get one CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseTeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseTeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTeacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherFindFirstArgs} args - Arguments to find a CourseTeacher
     * @example
     * // Get one CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseTeacherFindFirstArgs>(args?: SelectSubset<T, CourseTeacherFindFirstArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CourseTeacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherFindFirstOrThrowArgs} args - Arguments to find a CourseTeacher
     * @example
     * // Get one CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseTeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseTeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CourseTeachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CourseTeachers
     * const courseTeachers = await prisma.courseTeacher.findMany()
     * 
     * // Get first 10 CourseTeachers
     * const courseTeachers = await prisma.courseTeacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseTeacherWithIdOnly = await prisma.courseTeacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseTeacherFindManyArgs>(args?: SelectSubset<T, CourseTeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CourseTeacher.
     * @param {CourseTeacherCreateArgs} args - Arguments to create a CourseTeacher.
     * @example
     * // Create one CourseTeacher
     * const CourseTeacher = await prisma.courseTeacher.create({
     *   data: {
     *     // ... data to create a CourseTeacher
     *   }
     * })
     * 
     */
    create<T extends CourseTeacherCreateArgs>(args: SelectSubset<T, CourseTeacherCreateArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CourseTeachers.
     * @param {CourseTeacherCreateManyArgs} args - Arguments to create many CourseTeachers.
     * @example
     * // Create many CourseTeachers
     * const courseTeacher = await prisma.courseTeacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseTeacherCreateManyArgs>(args?: SelectSubset<T, CourseTeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CourseTeacher.
     * @param {CourseTeacherDeleteArgs} args - Arguments to delete one CourseTeacher.
     * @example
     * // Delete one CourseTeacher
     * const CourseTeacher = await prisma.courseTeacher.delete({
     *   where: {
     *     // ... filter to delete one CourseTeacher
     *   }
     * })
     * 
     */
    delete<T extends CourseTeacherDeleteArgs>(args: SelectSubset<T, CourseTeacherDeleteArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CourseTeacher.
     * @param {CourseTeacherUpdateArgs} args - Arguments to update one CourseTeacher.
     * @example
     * // Update one CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseTeacherUpdateArgs>(args: SelectSubset<T, CourseTeacherUpdateArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CourseTeachers.
     * @param {CourseTeacherDeleteManyArgs} args - Arguments to filter CourseTeachers to delete.
     * @example
     * // Delete a few CourseTeachers
     * const { count } = await prisma.courseTeacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseTeacherDeleteManyArgs>(args?: SelectSubset<T, CourseTeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CourseTeachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CourseTeachers
     * const courseTeacher = await prisma.courseTeacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseTeacherUpdateManyArgs>(args: SelectSubset<T, CourseTeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CourseTeacher.
     * @param {CourseTeacherUpsertArgs} args - Arguments to update or create a CourseTeacher.
     * @example
     * // Update or create a CourseTeacher
     * const courseTeacher = await prisma.courseTeacher.upsert({
     *   create: {
     *     // ... data to create a CourseTeacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CourseTeacher we want to update
     *   }
     * })
     */
    upsert<T extends CourseTeacherUpsertArgs>(args: SelectSubset<T, CourseTeacherUpsertArgs<ExtArgs>>): Prisma__CourseTeacherClient<$Result.GetResult<Prisma.$CourseTeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CourseTeachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherCountArgs} args - Arguments to filter CourseTeachers to count.
     * @example
     * // Count the number of CourseTeachers
     * const count = await prisma.courseTeacher.count({
     *   where: {
     *     // ... the filter for the CourseTeachers we want to count
     *   }
     * })
    **/
    count<T extends CourseTeacherCountArgs>(
      args?: Subset<T, CourseTeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseTeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CourseTeacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseTeacherAggregateArgs>(args: Subset<T, CourseTeacherAggregateArgs>): Prisma.PrismaPromise<GetCourseTeacherAggregateType<T>>

    /**
     * Group by CourseTeacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseTeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseTeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseTeacherGroupByArgs['orderBy'] }
        : { orderBy?: CourseTeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseTeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CourseTeacher model
   */
  readonly fields: CourseTeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CourseTeacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseTeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CourseTeacher model
   */
  interface CourseTeacherFieldRefs {
    readonly id: FieldRef<"CourseTeacher", 'String'>
    readonly courseId: FieldRef<"CourseTeacher", 'String'>
    readonly teacherId: FieldRef<"CourseTeacher", 'String'>
    readonly isActive: FieldRef<"CourseTeacher", 'Boolean'>
    readonly createdAt: FieldRef<"CourseTeacher", 'DateTime'>
    readonly updatedAt: FieldRef<"CourseTeacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CourseTeacher findUnique
   */
  export type CourseTeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter, which CourseTeacher to fetch.
     */
    where: CourseTeacherWhereUniqueInput
  }

  /**
   * CourseTeacher findUniqueOrThrow
   */
  export type CourseTeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter, which CourseTeacher to fetch.
     */
    where: CourseTeacherWhereUniqueInput
  }

  /**
   * CourseTeacher findFirst
   */
  export type CourseTeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter, which CourseTeacher to fetch.
     */
    where?: CourseTeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTeachers to fetch.
     */
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTeachers.
     */
    cursor?: CourseTeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTeachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTeachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTeachers.
     */
    distinct?: CourseTeacherScalarFieldEnum | CourseTeacherScalarFieldEnum[]
  }

  /**
   * CourseTeacher findFirstOrThrow
   */
  export type CourseTeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter, which CourseTeacher to fetch.
     */
    where?: CourseTeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTeachers to fetch.
     */
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CourseTeachers.
     */
    cursor?: CourseTeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTeachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTeachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CourseTeachers.
     */
    distinct?: CourseTeacherScalarFieldEnum | CourseTeacherScalarFieldEnum[]
  }

  /**
   * CourseTeacher findMany
   */
  export type CourseTeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter, which CourseTeachers to fetch.
     */
    where?: CourseTeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CourseTeachers to fetch.
     */
    orderBy?: CourseTeacherOrderByWithRelationInput | CourseTeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CourseTeachers.
     */
    cursor?: CourseTeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CourseTeachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CourseTeachers.
     */
    skip?: number
    distinct?: CourseTeacherScalarFieldEnum | CourseTeacherScalarFieldEnum[]
  }

  /**
   * CourseTeacher create
   */
  export type CourseTeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a CourseTeacher.
     */
    data: XOR<CourseTeacherCreateInput, CourseTeacherUncheckedCreateInput>
  }

  /**
   * CourseTeacher createMany
   */
  export type CourseTeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CourseTeachers.
     */
    data: CourseTeacherCreateManyInput | CourseTeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CourseTeacher update
   */
  export type CourseTeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a CourseTeacher.
     */
    data: XOR<CourseTeacherUpdateInput, CourseTeacherUncheckedUpdateInput>
    /**
     * Choose, which CourseTeacher to update.
     */
    where: CourseTeacherWhereUniqueInput
  }

  /**
   * CourseTeacher updateMany
   */
  export type CourseTeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CourseTeachers.
     */
    data: XOR<CourseTeacherUpdateManyMutationInput, CourseTeacherUncheckedUpdateManyInput>
    /**
     * Filter which CourseTeachers to update
     */
    where?: CourseTeacherWhereInput
    /**
     * Limit how many CourseTeachers to update.
     */
    limit?: number
  }

  /**
   * CourseTeacher upsert
   */
  export type CourseTeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the CourseTeacher to update in case it exists.
     */
    where: CourseTeacherWhereUniqueInput
    /**
     * In case the CourseTeacher found by the `where` argument doesn't exist, create a new CourseTeacher with this data.
     */
    create: XOR<CourseTeacherCreateInput, CourseTeacherUncheckedCreateInput>
    /**
     * In case the CourseTeacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseTeacherUpdateInput, CourseTeacherUncheckedUpdateInput>
  }

  /**
   * CourseTeacher delete
   */
  export type CourseTeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
    /**
     * Filter which CourseTeacher to delete.
     */
    where: CourseTeacherWhereUniqueInput
  }

  /**
   * CourseTeacher deleteMany
   */
  export type CourseTeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CourseTeachers to delete
     */
    where?: CourseTeacherWhereInput
    /**
     * Limit how many CourseTeachers to delete.
     */
    limit?: number
  }

  /**
   * CourseTeacher without action
   */
  export type CourseTeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseTeacher
     */
    select?: CourseTeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CourseTeacher
     */
    omit?: CourseTeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseTeacherInclude<ExtArgs> | null
  }


  /**
   * Model SectionCourse
   */

  export type AggregateSectionCourse = {
    _count: SectionCourseCountAggregateOutputType | null
    _min: SectionCourseMinAggregateOutputType | null
    _max: SectionCourseMaxAggregateOutputType | null
  }

  export type SectionCourseMinAggregateOutputType = {
    id: string | null
    sectionId: string | null
    courseId: string | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionCourseMaxAggregateOutputType = {
    id: string | null
    sectionId: string | null
    courseId: string | null
    teacherId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SectionCourseCountAggregateOutputType = {
    id: number
    sectionId: number
    courseId: number
    teacherId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SectionCourseMinAggregateInputType = {
    id?: true
    sectionId?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionCourseMaxAggregateInputType = {
    id?: true
    sectionId?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SectionCourseCountAggregateInputType = {
    id?: true
    sectionId?: true
    courseId?: true
    teacherId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SectionCourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectionCourse to aggregate.
     */
    where?: SectionCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionCourses to fetch.
     */
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SectionCourses
    **/
    _count?: true | SectionCourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionCourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionCourseMaxAggregateInputType
  }

  export type GetSectionCourseAggregateType<T extends SectionCourseAggregateArgs> = {
        [P in keyof T & keyof AggregateSectionCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSectionCourse[P]>
      : GetScalarType<T[P], AggregateSectionCourse[P]>
  }




  export type SectionCourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionCourseWhereInput
    orderBy?: SectionCourseOrderByWithAggregationInput | SectionCourseOrderByWithAggregationInput[]
    by: SectionCourseScalarFieldEnum[] | SectionCourseScalarFieldEnum
    having?: SectionCourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCourseCountAggregateInputType | true
    _min?: SectionCourseMinAggregateInputType
    _max?: SectionCourseMaxAggregateInputType
  }

  export type SectionCourseGroupByOutputType = {
    id: string
    sectionId: string
    courseId: string
    teacherId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SectionCourseCountAggregateOutputType | null
    _min: SectionCourseMinAggregateOutputType | null
    _max: SectionCourseMaxAggregateOutputType | null
  }

  type GetSectionCourseGroupByPayload<T extends SectionCourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionCourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionCourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionCourseGroupByOutputType[P]>
            : GetScalarType<T[P], SectionCourseGroupByOutputType[P]>
        }
      >
    >


  export type SectionCourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sectionId?: boolean
    courseId?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sectionCourse"]>



  export type SectionCourseSelectScalar = {
    id?: boolean
    sectionId?: boolean
    courseId?: boolean
    teacherId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SectionCourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sectionId" | "courseId" | "teacherId" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["sectionCourse"]>
  export type SectionCourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    teacher?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SectionCoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SectionCourse"
    objects: {
      section: Prisma.$SectionPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      teacher: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sectionId: string
      courseId: string
      teacherId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sectionCourse"]>
    composites: {}
  }

  type SectionCourseGetPayload<S extends boolean | null | undefined | SectionCourseDefaultArgs> = $Result.GetResult<Prisma.$SectionCoursePayload, S>

  type SectionCourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionCourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCourseCountAggregateInputType | true
    }

  export interface SectionCourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SectionCourse'], meta: { name: 'SectionCourse' } }
    /**
     * Find zero or one SectionCourse that matches the filter.
     * @param {SectionCourseFindUniqueArgs} args - Arguments to find a SectionCourse
     * @example
     * // Get one SectionCourse
     * const sectionCourse = await prisma.sectionCourse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionCourseFindUniqueArgs>(args: SelectSubset<T, SectionCourseFindUniqueArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SectionCourse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionCourseFindUniqueOrThrowArgs} args - Arguments to find a SectionCourse
     * @example
     * // Get one SectionCourse
     * const sectionCourse = await prisma.sectionCourse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionCourseFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionCourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectionCourse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseFindFirstArgs} args - Arguments to find a SectionCourse
     * @example
     * // Get one SectionCourse
     * const sectionCourse = await prisma.sectionCourse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionCourseFindFirstArgs>(args?: SelectSubset<T, SectionCourseFindFirstArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SectionCourse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseFindFirstOrThrowArgs} args - Arguments to find a SectionCourse
     * @example
     * // Get one SectionCourse
     * const sectionCourse = await prisma.sectionCourse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionCourseFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionCourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SectionCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SectionCourses
     * const sectionCourses = await prisma.sectionCourse.findMany()
     * 
     * // Get first 10 SectionCourses
     * const sectionCourses = await prisma.sectionCourse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionCourseWithIdOnly = await prisma.sectionCourse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionCourseFindManyArgs>(args?: SelectSubset<T, SectionCourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SectionCourse.
     * @param {SectionCourseCreateArgs} args - Arguments to create a SectionCourse.
     * @example
     * // Create one SectionCourse
     * const SectionCourse = await prisma.sectionCourse.create({
     *   data: {
     *     // ... data to create a SectionCourse
     *   }
     * })
     * 
     */
    create<T extends SectionCourseCreateArgs>(args: SelectSubset<T, SectionCourseCreateArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SectionCourses.
     * @param {SectionCourseCreateManyArgs} args - Arguments to create many SectionCourses.
     * @example
     * // Create many SectionCourses
     * const sectionCourse = await prisma.sectionCourse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCourseCreateManyArgs>(args?: SelectSubset<T, SectionCourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SectionCourse.
     * @param {SectionCourseDeleteArgs} args - Arguments to delete one SectionCourse.
     * @example
     * // Delete one SectionCourse
     * const SectionCourse = await prisma.sectionCourse.delete({
     *   where: {
     *     // ... filter to delete one SectionCourse
     *   }
     * })
     * 
     */
    delete<T extends SectionCourseDeleteArgs>(args: SelectSubset<T, SectionCourseDeleteArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SectionCourse.
     * @param {SectionCourseUpdateArgs} args - Arguments to update one SectionCourse.
     * @example
     * // Update one SectionCourse
     * const sectionCourse = await prisma.sectionCourse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionCourseUpdateArgs>(args: SelectSubset<T, SectionCourseUpdateArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SectionCourses.
     * @param {SectionCourseDeleteManyArgs} args - Arguments to filter SectionCourses to delete.
     * @example
     * // Delete a few SectionCourses
     * const { count } = await prisma.sectionCourse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionCourseDeleteManyArgs>(args?: SelectSubset<T, SectionCourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SectionCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SectionCourses
     * const sectionCourse = await prisma.sectionCourse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionCourseUpdateManyArgs>(args: SelectSubset<T, SectionCourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SectionCourse.
     * @param {SectionCourseUpsertArgs} args - Arguments to update or create a SectionCourse.
     * @example
     * // Update or create a SectionCourse
     * const sectionCourse = await prisma.sectionCourse.upsert({
     *   create: {
     *     // ... data to create a SectionCourse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SectionCourse we want to update
     *   }
     * })
     */
    upsert<T extends SectionCourseUpsertArgs>(args: SelectSubset<T, SectionCourseUpsertArgs<ExtArgs>>): Prisma__SectionCourseClient<$Result.GetResult<Prisma.$SectionCoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SectionCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseCountArgs} args - Arguments to filter SectionCourses to count.
     * @example
     * // Count the number of SectionCourses
     * const count = await prisma.sectionCourse.count({
     *   where: {
     *     // ... the filter for the SectionCourses we want to count
     *   }
     * })
    **/
    count<T extends SectionCourseCountArgs>(
      args?: Subset<T, SectionCourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SectionCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionCourseAggregateArgs>(args: Subset<T, SectionCourseAggregateArgs>): Prisma.PrismaPromise<GetSectionCourseAggregateType<T>>

    /**
     * Group by SectionCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionCourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionCourseGroupByArgs['orderBy'] }
        : { orderBy?: SectionCourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SectionCourse model
   */
  readonly fields: SectionCourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SectionCourse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionCourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teacher<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SectionCourse model
   */
  interface SectionCourseFieldRefs {
    readonly id: FieldRef<"SectionCourse", 'String'>
    readonly sectionId: FieldRef<"SectionCourse", 'String'>
    readonly courseId: FieldRef<"SectionCourse", 'String'>
    readonly teacherId: FieldRef<"SectionCourse", 'String'>
    readonly isActive: FieldRef<"SectionCourse", 'Boolean'>
    readonly createdAt: FieldRef<"SectionCourse", 'DateTime'>
    readonly updatedAt: FieldRef<"SectionCourse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SectionCourse findUnique
   */
  export type SectionCourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter, which SectionCourse to fetch.
     */
    where: SectionCourseWhereUniqueInput
  }

  /**
   * SectionCourse findUniqueOrThrow
   */
  export type SectionCourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter, which SectionCourse to fetch.
     */
    where: SectionCourseWhereUniqueInput
  }

  /**
   * SectionCourse findFirst
   */
  export type SectionCourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter, which SectionCourse to fetch.
     */
    where?: SectionCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionCourses to fetch.
     */
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectionCourses.
     */
    cursor?: SectionCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectionCourses.
     */
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * SectionCourse findFirstOrThrow
   */
  export type SectionCourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter, which SectionCourse to fetch.
     */
    where?: SectionCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionCourses to fetch.
     */
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SectionCourses.
     */
    cursor?: SectionCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SectionCourses.
     */
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * SectionCourse findMany
   */
  export type SectionCourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter, which SectionCourses to fetch.
     */
    where?: SectionCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SectionCourses to fetch.
     */
    orderBy?: SectionCourseOrderByWithRelationInput | SectionCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SectionCourses.
     */
    cursor?: SectionCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SectionCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SectionCourses.
     */
    skip?: number
    distinct?: SectionCourseScalarFieldEnum | SectionCourseScalarFieldEnum[]
  }

  /**
   * SectionCourse create
   */
  export type SectionCourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * The data needed to create a SectionCourse.
     */
    data: XOR<SectionCourseCreateInput, SectionCourseUncheckedCreateInput>
  }

  /**
   * SectionCourse createMany
   */
  export type SectionCourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SectionCourses.
     */
    data: SectionCourseCreateManyInput | SectionCourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SectionCourse update
   */
  export type SectionCourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * The data needed to update a SectionCourse.
     */
    data: XOR<SectionCourseUpdateInput, SectionCourseUncheckedUpdateInput>
    /**
     * Choose, which SectionCourse to update.
     */
    where: SectionCourseWhereUniqueInput
  }

  /**
   * SectionCourse updateMany
   */
  export type SectionCourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SectionCourses.
     */
    data: XOR<SectionCourseUpdateManyMutationInput, SectionCourseUncheckedUpdateManyInput>
    /**
     * Filter which SectionCourses to update
     */
    where?: SectionCourseWhereInput
    /**
     * Limit how many SectionCourses to update.
     */
    limit?: number
  }

  /**
   * SectionCourse upsert
   */
  export type SectionCourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * The filter to search for the SectionCourse to update in case it exists.
     */
    where: SectionCourseWhereUniqueInput
    /**
     * In case the SectionCourse found by the `where` argument doesn't exist, create a new SectionCourse with this data.
     */
    create: XOR<SectionCourseCreateInput, SectionCourseUncheckedCreateInput>
    /**
     * In case the SectionCourse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionCourseUpdateInput, SectionCourseUncheckedUpdateInput>
  }

  /**
   * SectionCourse delete
   */
  export type SectionCourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
    /**
     * Filter which SectionCourse to delete.
     */
    where: SectionCourseWhereUniqueInput
  }

  /**
   * SectionCourse deleteMany
   */
  export type SectionCourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SectionCourses to delete
     */
    where?: SectionCourseWhereInput
    /**
     * Limit how many SectionCourses to delete.
     */
    limit?: number
  }

  /**
   * SectionCourse without action
   */
  export type SectionCourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCourse
     */
    select?: SectionCourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SectionCourse
     */
    omit?: SectionCourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionCourseInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    sectionId: string | null
    status: $Enums.EnrollmentStatus | null
    enrolledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    sectionId: string | null
    status: $Enums.EnrollmentStatus | null
    enrolledAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    studentId: number
    sectionId: number
    status: number
    enrolledAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EnrollmentMinAggregateInputType = {
    id?: true
    studentId?: true
    sectionId?: true
    status?: true
    enrolledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    studentId?: true
    sectionId?: true
    status?: true
    enrolledAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    studentId?: true
    sectionId?: true
    status?: true
    enrolledAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: string
    studentId: string
    sectionId: string
    status: $Enums.EnrollmentStatus
    enrolledAt: Date
    createdAt: Date
    updatedAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    sectionId?: boolean
    status?: boolean
    enrolledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | UserDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>



  export type EnrollmentSelectScalar = {
    id?: boolean
    studentId?: boolean
    sectionId?: boolean
    status?: boolean
    enrolledAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "sectionId" | "status" | "enrolledAt" | "createdAt" | "updatedAt", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | UserDefaultArgs<ExtArgs>
    section?: boolean | SectionDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      student: Prisma.$UserPayload<ExtArgs>
      section: Prisma.$SectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      sectionId: string
      status: $Enums.EnrollmentStatus
      enrolledAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'String'>
    readonly studentId: FieldRef<"Enrollment", 'String'>
    readonly sectionId: FieldRef<"Enrollment", 'String'>
    readonly status: FieldRef<"Enrollment", 'EnrollmentStatus'>
    readonly enrolledAt: FieldRef<"Enrollment", 'DateTime'>
    readonly createdAt: FieldRef<"Enrollment", 'DateTime'>
    readonly updatedAt: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model ParentStudent
   */

  export type AggregateParentStudent = {
    _count: ParentStudentCountAggregateOutputType | null
    _min: ParentStudentMinAggregateOutputType | null
    _max: ParentStudentMaxAggregateOutputType | null
  }

  export type ParentStudentMinAggregateOutputType = {
    id: string | null
    parentId: string | null
    studentId: string | null
    relationType: $Enums.ParentRelationType | null
    isPrimary: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParentStudentMaxAggregateOutputType = {
    id: string | null
    parentId: string | null
    studentId: string | null
    relationType: $Enums.ParentRelationType | null
    isPrimary: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParentStudentCountAggregateOutputType = {
    id: number
    parentId: number
    studentId: number
    relationType: number
    isPrimary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParentStudentMinAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    relationType?: true
    isPrimary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParentStudentMaxAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    relationType?: true
    isPrimary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParentStudentCountAggregateInputType = {
    id?: true
    parentId?: true
    studentId?: true
    relationType?: true
    isPrimary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParentStudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentStudent to aggregate.
     */
    where?: ParentStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudents to fetch.
     */
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParentStudents
    **/
    _count?: true | ParentStudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentStudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentStudentMaxAggregateInputType
  }

  export type GetParentStudentAggregateType<T extends ParentStudentAggregateArgs> = {
        [P in keyof T & keyof AggregateParentStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParentStudent[P]>
      : GetScalarType<T[P], AggregateParentStudent[P]>
  }




  export type ParentStudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentStudentWhereInput
    orderBy?: ParentStudentOrderByWithAggregationInput | ParentStudentOrderByWithAggregationInput[]
    by: ParentStudentScalarFieldEnum[] | ParentStudentScalarFieldEnum
    having?: ParentStudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentStudentCountAggregateInputType | true
    _min?: ParentStudentMinAggregateInputType
    _max?: ParentStudentMaxAggregateInputType
  }

  export type ParentStudentGroupByOutputType = {
    id: string
    parentId: string
    studentId: string
    relationType: $Enums.ParentRelationType
    isPrimary: boolean
    createdAt: Date
    updatedAt: Date
    _count: ParentStudentCountAggregateOutputType | null
    _min: ParentStudentMinAggregateOutputType | null
    _max: ParentStudentMaxAggregateOutputType | null
  }

  type GetParentStudentGroupByPayload<T extends ParentStudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentStudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentStudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentStudentGroupByOutputType[P]>
            : GetScalarType<T[P], ParentStudentGroupByOutputType[P]>
        }
      >
    >


  export type ParentStudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    relationType?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | UserDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parentStudent"]>



  export type ParentStudentSelectScalar = {
    id?: boolean
    parentId?: boolean
    studentId?: boolean
    relationType?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParentStudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "parentId" | "studentId" | "relationType" | "isPrimary" | "createdAt" | "updatedAt", ExtArgs["result"]["parentStudent"]>
  export type ParentStudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | UserDefaultArgs<ExtArgs>
    student?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ParentStudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParentStudent"
    objects: {
      parent: Prisma.$UserPayload<ExtArgs>
      student: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      parentId: string
      studentId: string
      relationType: $Enums.ParentRelationType
      isPrimary: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parentStudent"]>
    composites: {}
  }

  type ParentStudentGetPayload<S extends boolean | null | undefined | ParentStudentDefaultArgs> = $Result.GetResult<Prisma.$ParentStudentPayload, S>

  type ParentStudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentStudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentStudentCountAggregateInputType | true
    }

  export interface ParentStudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParentStudent'], meta: { name: 'ParentStudent' } }
    /**
     * Find zero or one ParentStudent that matches the filter.
     * @param {ParentStudentFindUniqueArgs} args - Arguments to find a ParentStudent
     * @example
     * // Get one ParentStudent
     * const parentStudent = await prisma.parentStudent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentStudentFindUniqueArgs>(args: SelectSubset<T, ParentStudentFindUniqueArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ParentStudent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentStudentFindUniqueOrThrowArgs} args - Arguments to find a ParentStudent
     * @example
     * // Get one ParentStudent
     * const parentStudent = await prisma.parentStudent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentStudentFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentStudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentStudent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentFindFirstArgs} args - Arguments to find a ParentStudent
     * @example
     * // Get one ParentStudent
     * const parentStudent = await prisma.parentStudent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentStudentFindFirstArgs>(args?: SelectSubset<T, ParentStudentFindFirstArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ParentStudent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentFindFirstOrThrowArgs} args - Arguments to find a ParentStudent
     * @example
     * // Get one ParentStudent
     * const parentStudent = await prisma.parentStudent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentStudentFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentStudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ParentStudents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParentStudents
     * const parentStudents = await prisma.parentStudent.findMany()
     * 
     * // Get first 10 ParentStudents
     * const parentStudents = await prisma.parentStudent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentStudentWithIdOnly = await prisma.parentStudent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentStudentFindManyArgs>(args?: SelectSubset<T, ParentStudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ParentStudent.
     * @param {ParentStudentCreateArgs} args - Arguments to create a ParentStudent.
     * @example
     * // Create one ParentStudent
     * const ParentStudent = await prisma.parentStudent.create({
     *   data: {
     *     // ... data to create a ParentStudent
     *   }
     * })
     * 
     */
    create<T extends ParentStudentCreateArgs>(args: SelectSubset<T, ParentStudentCreateArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ParentStudents.
     * @param {ParentStudentCreateManyArgs} args - Arguments to create many ParentStudents.
     * @example
     * // Create many ParentStudents
     * const parentStudent = await prisma.parentStudent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentStudentCreateManyArgs>(args?: SelectSubset<T, ParentStudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ParentStudent.
     * @param {ParentStudentDeleteArgs} args - Arguments to delete one ParentStudent.
     * @example
     * // Delete one ParentStudent
     * const ParentStudent = await prisma.parentStudent.delete({
     *   where: {
     *     // ... filter to delete one ParentStudent
     *   }
     * })
     * 
     */
    delete<T extends ParentStudentDeleteArgs>(args: SelectSubset<T, ParentStudentDeleteArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ParentStudent.
     * @param {ParentStudentUpdateArgs} args - Arguments to update one ParentStudent.
     * @example
     * // Update one ParentStudent
     * const parentStudent = await prisma.parentStudent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentStudentUpdateArgs>(args: SelectSubset<T, ParentStudentUpdateArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ParentStudents.
     * @param {ParentStudentDeleteManyArgs} args - Arguments to filter ParentStudents to delete.
     * @example
     * // Delete a few ParentStudents
     * const { count } = await prisma.parentStudent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentStudentDeleteManyArgs>(args?: SelectSubset<T, ParentStudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParentStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParentStudents
     * const parentStudent = await prisma.parentStudent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentStudentUpdateManyArgs>(args: SelectSubset<T, ParentStudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ParentStudent.
     * @param {ParentStudentUpsertArgs} args - Arguments to update or create a ParentStudent.
     * @example
     * // Update or create a ParentStudent
     * const parentStudent = await prisma.parentStudent.upsert({
     *   create: {
     *     // ... data to create a ParentStudent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParentStudent we want to update
     *   }
     * })
     */
    upsert<T extends ParentStudentUpsertArgs>(args: SelectSubset<T, ParentStudentUpsertArgs<ExtArgs>>): Prisma__ParentStudentClient<$Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ParentStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentCountArgs} args - Arguments to filter ParentStudents to count.
     * @example
     * // Count the number of ParentStudents
     * const count = await prisma.parentStudent.count({
     *   where: {
     *     // ... the filter for the ParentStudents we want to count
     *   }
     * })
    **/
    count<T extends ParentStudentCountArgs>(
      args?: Subset<T, ParentStudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentStudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParentStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParentStudentAggregateArgs>(args: Subset<T, ParentStudentAggregateArgs>): Prisma.PrismaPromise<GetParentStudentAggregateType<T>>

    /**
     * Group by ParentStudent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentStudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParentStudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentStudentGroupByArgs['orderBy'] }
        : { orderBy?: ParentStudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParentStudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParentStudent model
   */
  readonly fields: ParentStudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParentStudent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentStudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    student<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ParentStudent model
   */
  interface ParentStudentFieldRefs {
    readonly id: FieldRef<"ParentStudent", 'String'>
    readonly parentId: FieldRef<"ParentStudent", 'String'>
    readonly studentId: FieldRef<"ParentStudent", 'String'>
    readonly relationType: FieldRef<"ParentStudent", 'ParentRelationType'>
    readonly isPrimary: FieldRef<"ParentStudent", 'Boolean'>
    readonly createdAt: FieldRef<"ParentStudent", 'DateTime'>
    readonly updatedAt: FieldRef<"ParentStudent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParentStudent findUnique
   */
  export type ParentStudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudent to fetch.
     */
    where: ParentStudentWhereUniqueInput
  }

  /**
   * ParentStudent findUniqueOrThrow
   */
  export type ParentStudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudent to fetch.
     */
    where: ParentStudentWhereUniqueInput
  }

  /**
   * ParentStudent findFirst
   */
  export type ParentStudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudent to fetch.
     */
    where?: ParentStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudents to fetch.
     */
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentStudents.
     */
    cursor?: ParentStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentStudents.
     */
    distinct?: ParentStudentScalarFieldEnum | ParentStudentScalarFieldEnum[]
  }

  /**
   * ParentStudent findFirstOrThrow
   */
  export type ParentStudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudent to fetch.
     */
    where?: ParentStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudents to fetch.
     */
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParentStudents.
     */
    cursor?: ParentStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParentStudents.
     */
    distinct?: ParentStudentScalarFieldEnum | ParentStudentScalarFieldEnum[]
  }

  /**
   * ParentStudent findMany
   */
  export type ParentStudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter, which ParentStudents to fetch.
     */
    where?: ParentStudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParentStudents to fetch.
     */
    orderBy?: ParentStudentOrderByWithRelationInput | ParentStudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParentStudents.
     */
    cursor?: ParentStudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParentStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParentStudents.
     */
    skip?: number
    distinct?: ParentStudentScalarFieldEnum | ParentStudentScalarFieldEnum[]
  }

  /**
   * ParentStudent create
   */
  export type ParentStudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * The data needed to create a ParentStudent.
     */
    data: XOR<ParentStudentCreateInput, ParentStudentUncheckedCreateInput>
  }

  /**
   * ParentStudent createMany
   */
  export type ParentStudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParentStudents.
     */
    data: ParentStudentCreateManyInput | ParentStudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParentStudent update
   */
  export type ParentStudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * The data needed to update a ParentStudent.
     */
    data: XOR<ParentStudentUpdateInput, ParentStudentUncheckedUpdateInput>
    /**
     * Choose, which ParentStudent to update.
     */
    where: ParentStudentWhereUniqueInput
  }

  /**
   * ParentStudent updateMany
   */
  export type ParentStudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParentStudents.
     */
    data: XOR<ParentStudentUpdateManyMutationInput, ParentStudentUncheckedUpdateManyInput>
    /**
     * Filter which ParentStudents to update
     */
    where?: ParentStudentWhereInput
    /**
     * Limit how many ParentStudents to update.
     */
    limit?: number
  }

  /**
   * ParentStudent upsert
   */
  export type ParentStudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * The filter to search for the ParentStudent to update in case it exists.
     */
    where: ParentStudentWhereUniqueInput
    /**
     * In case the ParentStudent found by the `where` argument doesn't exist, create a new ParentStudent with this data.
     */
    create: XOR<ParentStudentCreateInput, ParentStudentUncheckedCreateInput>
    /**
     * In case the ParentStudent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentStudentUpdateInput, ParentStudentUncheckedUpdateInput>
  }

  /**
   * ParentStudent delete
   */
  export type ParentStudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
    /**
     * Filter which ParentStudent to delete.
     */
    where: ParentStudentWhereUniqueInput
  }

  /**
   * ParentStudent deleteMany
   */
  export type ParentStudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParentStudents to delete
     */
    where?: ParentStudentWhereInput
    /**
     * Limit how many ParentStudents to delete.
     */
    limit?: number
  }

  /**
   * ParentStudent without action
   */
  export type ParentStudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentStudent
     */
    select?: ParentStudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ParentStudent
     */
    omit?: ParentStudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentStudentInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SedeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SedeScalarFieldEnum = (typeof SedeScalarFieldEnum)[keyof typeof SedeScalarFieldEnum]


  export const AcademicPeriodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AcademicPeriodScalarFieldEnum = (typeof AcademicPeriodScalarFieldEnum)[keyof typeof AcademicPeriodScalarFieldEnum]


  export const TurnScalarFieldEnum: {
    id: 'id',
    name: 'name',
    startTime: 'startTime',
    endTime: 'endTime',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TurnScalarFieldEnum = (typeof TurnScalarFieldEnum)[keyof typeof TurnScalarFieldEnum]


  export const ClassroomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    capacity: 'capacity',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sedeId: 'sedeId'
  };

  export type ClassroomScalarFieldEnum = (typeof ClassroomScalarFieldEnum)[keyof typeof ClassroomScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    capacity: 'capacity',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    classroomId: 'classroomId',
    turnId: 'turnId',
    periodId: 'periodId'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    isActive: 'isActive',
    lastLoginAt: 'lastLoginAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    phone: 'phone',
    birthDate: 'birthDate',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const MembershipScalarFieldEnum: {
    id: 'id',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    sedeId: 'sedeId'
  };

  export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum]


  export const CourseTeacherScalarFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    teacherId: 'teacherId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseTeacherScalarFieldEnum = (typeof CourseTeacherScalarFieldEnum)[keyof typeof CourseTeacherScalarFieldEnum]


  export const SectionCourseScalarFieldEnum: {
    id: 'id',
    sectionId: 'sectionId',
    courseId: 'courseId',
    teacherId: 'teacherId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SectionCourseScalarFieldEnum = (typeof SectionCourseScalarFieldEnum)[keyof typeof SectionCourseScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    sectionId: 'sectionId',
    status: 'status',
    enrolledAt: 'enrolledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const ParentStudentScalarFieldEnum: {
    id: 'id',
    parentId: 'parentId',
    studentId: 'studentId',
    relationType: 'relationType',
    isPrimary: 'isPrimary',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParentStudentScalarFieldEnum = (typeof ParentStudentScalarFieldEnum)[keyof typeof ParentStudentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const SedeOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    phone: 'phone'
  };

  export type SedeOrderByRelevanceFieldEnum = (typeof SedeOrderByRelevanceFieldEnum)[keyof typeof SedeOrderByRelevanceFieldEnum]


  export const AcademicPeriodOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type AcademicPeriodOrderByRelevanceFieldEnum = (typeof AcademicPeriodOrderByRelevanceFieldEnum)[keyof typeof AcademicPeriodOrderByRelevanceFieldEnum]


  export const TurnOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    startTime: 'startTime',
    endTime: 'endTime'
  };

  export type TurnOrderByRelevanceFieldEnum = (typeof TurnOrderByRelevanceFieldEnum)[keyof typeof TurnOrderByRelevanceFieldEnum]


  export const ClassroomOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    sedeId: 'sedeId'
  };

  export type ClassroomOrderByRelevanceFieldEnum = (typeof ClassroomOrderByRelevanceFieldEnum)[keyof typeof ClassroomOrderByRelevanceFieldEnum]


  export const SectionOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    classroomId: 'classroomId',
    turnId: 'turnId',
    periodId: 'periodId'
  };

  export type SectionOrderByRelevanceFieldEnum = (typeof SectionOrderByRelevanceFieldEnum)[keyof typeof SectionOrderByRelevanceFieldEnum]


  export const CourseOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description'
  };

  export type CourseOrderByRelevanceFieldEnum = (typeof CourseOrderByRelevanceFieldEnum)[keyof typeof CourseOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ProfileOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    phone: 'phone',
    avatarUrl: 'avatarUrl'
  };

  export type ProfileOrderByRelevanceFieldEnum = (typeof ProfileOrderByRelevanceFieldEnum)[keyof typeof ProfileOrderByRelevanceFieldEnum]


  export const MembershipOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    sedeId: 'sedeId'
  };

  export type MembershipOrderByRelevanceFieldEnum = (typeof MembershipOrderByRelevanceFieldEnum)[keyof typeof MembershipOrderByRelevanceFieldEnum]


  export const CourseTeacherOrderByRelevanceFieldEnum: {
    id: 'id',
    courseId: 'courseId',
    teacherId: 'teacherId'
  };

  export type CourseTeacherOrderByRelevanceFieldEnum = (typeof CourseTeacherOrderByRelevanceFieldEnum)[keyof typeof CourseTeacherOrderByRelevanceFieldEnum]


  export const SectionCourseOrderByRelevanceFieldEnum: {
    id: 'id',
    sectionId: 'sectionId',
    courseId: 'courseId',
    teacherId: 'teacherId'
  };

  export type SectionCourseOrderByRelevanceFieldEnum = (typeof SectionCourseOrderByRelevanceFieldEnum)[keyof typeof SectionCourseOrderByRelevanceFieldEnum]


  export const EnrollmentOrderByRelevanceFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    sectionId: 'sectionId'
  };

  export type EnrollmentOrderByRelevanceFieldEnum = (typeof EnrollmentOrderByRelevanceFieldEnum)[keyof typeof EnrollmentOrderByRelevanceFieldEnum]


  export const ParentStudentOrderByRelevanceFieldEnum: {
    id: 'id',
    parentId: 'parentId',
    studentId: 'studentId'
  };

  export type ParentStudentOrderByRelevanceFieldEnum = (typeof ParentStudentOrderByRelevanceFieldEnum)[keyof typeof ParentStudentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'PeriodStatus'
   */
  export type EnumPeriodStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PeriodStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'MembershipStatus'
   */
  export type EnumMembershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MembershipStatus'>
    


  /**
   * Reference to a field of type 'EnrollmentStatus'
   */
  export type EnumEnrollmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnrollmentStatus'>
    


  /**
   * Reference to a field of type 'ParentRelationType'
   */
  export type EnumParentRelationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParentRelationType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SedeWhereInput = {
    AND?: SedeWhereInput | SedeWhereInput[]
    OR?: SedeWhereInput[]
    NOT?: SedeWhereInput | SedeWhereInput[]
    id?: StringFilter<"Sede"> | string
    name?: StringFilter<"Sede"> | string
    address?: StringNullableFilter<"Sede"> | string | null
    phone?: StringNullableFilter<"Sede"> | string | null
    isActive?: BoolFilter<"Sede"> | boolean
    createdAt?: DateTimeFilter<"Sede"> | Date | string
    updatedAt?: DateTimeFilter<"Sede"> | Date | string
    classrooms?: ClassroomListRelationFilter
    memberships?: MembershipListRelationFilter
  }

  export type SedeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classrooms?: ClassroomOrderByRelationAggregateInput
    memberships?: MembershipOrderByRelationAggregateInput
    _relevance?: SedeOrderByRelevanceInput
  }

  export type SedeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SedeWhereInput | SedeWhereInput[]
    OR?: SedeWhereInput[]
    NOT?: SedeWhereInput | SedeWhereInput[]
    name?: StringFilter<"Sede"> | string
    address?: StringNullableFilter<"Sede"> | string | null
    phone?: StringNullableFilter<"Sede"> | string | null
    isActive?: BoolFilter<"Sede"> | boolean
    createdAt?: DateTimeFilter<"Sede"> | Date | string
    updatedAt?: DateTimeFilter<"Sede"> | Date | string
    classrooms?: ClassroomListRelationFilter
    memberships?: MembershipListRelationFilter
  }, "id">

  export type SedeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SedeCountOrderByAggregateInput
    _max?: SedeMaxOrderByAggregateInput
    _min?: SedeMinOrderByAggregateInput
  }

  export type SedeScalarWhereWithAggregatesInput = {
    AND?: SedeScalarWhereWithAggregatesInput | SedeScalarWhereWithAggregatesInput[]
    OR?: SedeScalarWhereWithAggregatesInput[]
    NOT?: SedeScalarWhereWithAggregatesInput | SedeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sede"> | string
    name?: StringWithAggregatesFilter<"Sede"> | string
    address?: StringNullableWithAggregatesFilter<"Sede"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Sede"> | string | null
    isActive?: BoolWithAggregatesFilter<"Sede"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Sede"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sede"> | Date | string
  }

  export type AcademicPeriodWhereInput = {
    AND?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    OR?: AcademicPeriodWhereInput[]
    NOT?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    id?: StringFilter<"AcademicPeriod"> | string
    name?: StringFilter<"AcademicPeriod"> | string
    startDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    status?: EnumPeriodStatusFilter<"AcademicPeriod"> | $Enums.PeriodStatus
    createdAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    sections?: SectionListRelationFilter
  }

  export type AcademicPeriodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    _relevance?: AcademicPeriodOrderByRelevanceInput
  }

  export type AcademicPeriodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    OR?: AcademicPeriodWhereInput[]
    NOT?: AcademicPeriodWhereInput | AcademicPeriodWhereInput[]
    startDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeFilter<"AcademicPeriod"> | Date | string
    status?: EnumPeriodStatusFilter<"AcademicPeriod"> | $Enums.PeriodStatus
    createdAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeFilter<"AcademicPeriod"> | Date | string
    sections?: SectionListRelationFilter
  }, "id" | "name">

  export type AcademicPeriodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AcademicPeriodCountOrderByAggregateInput
    _max?: AcademicPeriodMaxOrderByAggregateInput
    _min?: AcademicPeriodMinOrderByAggregateInput
  }

  export type AcademicPeriodScalarWhereWithAggregatesInput = {
    AND?: AcademicPeriodScalarWhereWithAggregatesInput | AcademicPeriodScalarWhereWithAggregatesInput[]
    OR?: AcademicPeriodScalarWhereWithAggregatesInput[]
    NOT?: AcademicPeriodScalarWhereWithAggregatesInput | AcademicPeriodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    name?: StringWithAggregatesFilter<"AcademicPeriod"> | string
    startDate?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    status?: EnumPeriodStatusWithAggregatesFilter<"AcademicPeriod"> | $Enums.PeriodStatus
    createdAt?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AcademicPeriod"> | Date | string
  }

  export type TurnWhereInput = {
    AND?: TurnWhereInput | TurnWhereInput[]
    OR?: TurnWhereInput[]
    NOT?: TurnWhereInput | TurnWhereInput[]
    id?: StringFilter<"Turn"> | string
    name?: StringFilter<"Turn"> | string
    startTime?: StringNullableFilter<"Turn"> | string | null
    endTime?: StringNullableFilter<"Turn"> | string | null
    isActive?: BoolFilter<"Turn"> | boolean
    createdAt?: DateTimeFilter<"Turn"> | Date | string
    updatedAt?: DateTimeFilter<"Turn"> | Date | string
    sections?: SectionListRelationFilter
  }

  export type TurnOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    _relevance?: TurnOrderByRelevanceInput
  }

  export type TurnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TurnWhereInput | TurnWhereInput[]
    OR?: TurnWhereInput[]
    NOT?: TurnWhereInput | TurnWhereInput[]
    startTime?: StringNullableFilter<"Turn"> | string | null
    endTime?: StringNullableFilter<"Turn"> | string | null
    isActive?: BoolFilter<"Turn"> | boolean
    createdAt?: DateTimeFilter<"Turn"> | Date | string
    updatedAt?: DateTimeFilter<"Turn"> | Date | string
    sections?: SectionListRelationFilter
  }, "id" | "name">

  export type TurnOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrderInput | SortOrder
    endTime?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TurnCountOrderByAggregateInput
    _max?: TurnMaxOrderByAggregateInput
    _min?: TurnMinOrderByAggregateInput
  }

  export type TurnScalarWhereWithAggregatesInput = {
    AND?: TurnScalarWhereWithAggregatesInput | TurnScalarWhereWithAggregatesInput[]
    OR?: TurnScalarWhereWithAggregatesInput[]
    NOT?: TurnScalarWhereWithAggregatesInput | TurnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Turn"> | string
    name?: StringWithAggregatesFilter<"Turn"> | string
    startTime?: StringNullableWithAggregatesFilter<"Turn"> | string | null
    endTime?: StringNullableWithAggregatesFilter<"Turn"> | string | null
    isActive?: BoolWithAggregatesFilter<"Turn"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Turn"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Turn"> | Date | string
  }

  export type ClassroomWhereInput = {
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    id?: StringFilter<"Classroom"> | string
    name?: StringFilter<"Classroom"> | string
    location?: StringNullableFilter<"Classroom"> | string | null
    capacity?: IntNullableFilter<"Classroom"> | number | null
    isActive?: BoolFilter<"Classroom"> | boolean
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeFilter<"Classroom"> | Date | string
    sedeId?: StringFilter<"Classroom"> | string
    sede?: XOR<SedeScalarRelationFilter, SedeWhereInput>
    sections?: SectionListRelationFilter
  }

  export type ClassroomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sedeId?: SortOrder
    sede?: SedeOrderByWithRelationInput
    sections?: SectionOrderByRelationAggregateInput
    _relevance?: ClassroomOrderByRelevanceInput
  }

  export type ClassroomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    name?: StringFilter<"Classroom"> | string
    location?: StringNullableFilter<"Classroom"> | string | null
    capacity?: IntNullableFilter<"Classroom"> | number | null
    isActive?: BoolFilter<"Classroom"> | boolean
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeFilter<"Classroom"> | Date | string
    sedeId?: StringFilter<"Classroom"> | string
    sede?: XOR<SedeScalarRelationFilter, SedeWhereInput>
    sections?: SectionListRelationFilter
  }, "id">

  export type ClassroomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sedeId?: SortOrder
    _count?: ClassroomCountOrderByAggregateInput
    _avg?: ClassroomAvgOrderByAggregateInput
    _max?: ClassroomMaxOrderByAggregateInput
    _min?: ClassroomMinOrderByAggregateInput
    _sum?: ClassroomSumOrderByAggregateInput
  }

  export type ClassroomScalarWhereWithAggregatesInput = {
    AND?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    OR?: ClassroomScalarWhereWithAggregatesInput[]
    NOT?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Classroom"> | string
    name?: StringWithAggregatesFilter<"Classroom"> | string
    location?: StringNullableWithAggregatesFilter<"Classroom"> | string | null
    capacity?: IntNullableWithAggregatesFilter<"Classroom"> | number | null
    isActive?: BoolWithAggregatesFilter<"Classroom"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
    sedeId?: StringWithAggregatesFilter<"Classroom"> | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: StringFilter<"Section"> | string
    name?: StringFilter<"Section"> | string
    capacity?: IntNullableFilter<"Section"> | number | null
    isActive?: BoolFilter<"Section"> | boolean
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    classroomId?: StringFilter<"Section"> | string
    turnId?: StringFilter<"Section"> | string
    periodId?: StringFilter<"Section"> | string
    classroom?: XOR<ClassroomScalarRelationFilter, ClassroomWhereInput>
    turn?: XOR<TurnScalarRelationFilter, TurnWhereInput>
    period?: XOR<AcademicPeriodScalarRelationFilter, AcademicPeriodWhereInput>
    enrollments?: EnrollmentListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classroomId?: SortOrder
    turnId?: SortOrder
    periodId?: SortOrder
    classroom?: ClassroomOrderByWithRelationInput
    turn?: TurnOrderByWithRelationInput
    period?: AcademicPeriodOrderByWithRelationInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    sectionCourses?: SectionCourseOrderByRelationAggregateInput
    _relevance?: SectionOrderByRelevanceInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    classroomId_turnId_periodId_name?: SectionClassroomIdTurnIdPeriodIdNameCompoundUniqueInput
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    name?: StringFilter<"Section"> | string
    capacity?: IntNullableFilter<"Section"> | number | null
    isActive?: BoolFilter<"Section"> | boolean
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    classroomId?: StringFilter<"Section"> | string
    turnId?: StringFilter<"Section"> | string
    periodId?: StringFilter<"Section"> | string
    classroom?: XOR<ClassroomScalarRelationFilter, ClassroomWhereInput>
    turn?: XOR<TurnScalarRelationFilter, TurnWhereInput>
    period?: XOR<AcademicPeriodScalarRelationFilter, AcademicPeriodWhereInput>
    enrollments?: EnrollmentListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
  }, "id" | "classroomId_turnId_periodId_name">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classroomId?: SortOrder
    turnId?: SortOrder
    periodId?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _avg?: SectionAvgOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
    _sum?: SectionSumOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Section"> | string
    name?: StringWithAggregatesFilter<"Section"> | string
    capacity?: IntNullableWithAggregatesFilter<"Section"> | number | null
    isActive?: BoolWithAggregatesFilter<"Section"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
    classroomId?: StringWithAggregatesFilter<"Section"> | string
    turnId?: StringWithAggregatesFilter<"Section"> | string
    periodId?: StringWithAggregatesFilter<"Section"> | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    code?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    isActive?: BoolFilter<"Course"> | boolean
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    courseTeachers?: CourseTeacherListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    courseTeachers?: CourseTeacherOrderByRelationAggregateInput
    sectionCourses?: SectionCourseOrderByRelationAggregateInput
    _relevance?: CourseOrderByRelevanceInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    description?: StringNullableFilter<"Course"> | string | null
    isActive?: BoolFilter<"Course"> | boolean
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    courseTeachers?: CourseTeacherListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
  }, "id" | "code">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    code?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    description?: StringNullableWithAggregatesFilter<"Course"> | string | null
    isActive?: BoolWithAggregatesFilter<"Course"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    memberships?: MembershipListRelationFilter
    courseTeachers?: CourseTeacherListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    parentOf?: ParentStudentListRelationFilter
    studentOf?: ParentStudentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    memberships?: MembershipOrderByRelationAggregateInput
    courseTeachers?: CourseTeacherOrderByRelationAggregateInput
    sectionCourses?: SectionCourseOrderByRelationAggregateInput
    enrollments?: EnrollmentOrderByRelationAggregateInput
    parentOf?: ParentStudentOrderByRelationAggregateInput
    studentOf?: ParentStudentOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableScalarRelationFilter, ProfileWhereInput> | null
    memberships?: MembershipListRelationFilter
    courseTeachers?: CourseTeacherListRelationFilter
    sectionCourses?: SectionCourseListRelationFilter
    enrollments?: EnrollmentListRelationFilter
    parentOf?: ParentStudentListRelationFilter
    studentOf?: ParentStudentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    documentType?: StringNullableFilter<"Profile"> | string | null
    documentNumber?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    birthDate?: DateTimeNullableFilter<"Profile"> | Date | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: ProfileOrderByRelevanceInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    documentType?: StringNullableFilter<"Profile"> | string | null
    documentNumber?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    birthDate?: DateTimeNullableFilter<"Profile"> | Date | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    birthDate?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    firstName?: StringWithAggregatesFilter<"Profile"> | string
    lastName?: StringWithAggregatesFilter<"Profile"> | string
    documentType?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    documentNumber?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    birthDate?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type MembershipWhereInput = {
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    sedeId?: StringNullableFilter<"Membership"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sede?: XOR<SedeNullableScalarRelationFilter, SedeWhereInput> | null
  }

  export type MembershipOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sedeId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    sede?: SedeOrderByWithRelationInput
    _relevance?: MembershipOrderByRelevanceInput
  }

  export type MembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_role_sedeId?: MembershipUserIdRoleSedeIdCompoundUniqueInput
    AND?: MembershipWhereInput | MembershipWhereInput[]
    OR?: MembershipWhereInput[]
    NOT?: MembershipWhereInput | MembershipWhereInput[]
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    sedeId?: StringNullableFilter<"Membership"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    sede?: XOR<SedeNullableScalarRelationFilter, SedeWhereInput> | null
  }, "id" | "userId_role_sedeId">

  export type MembershipOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sedeId?: SortOrderInput | SortOrder
    _count?: MembershipCountOrderByAggregateInput
    _max?: MembershipMaxOrderByAggregateInput
    _min?: MembershipMinOrderByAggregateInput
  }

  export type MembershipScalarWhereWithAggregatesInput = {
    AND?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    OR?: MembershipScalarWhereWithAggregatesInput[]
    NOT?: MembershipScalarWhereWithAggregatesInput | MembershipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Membership"> | string
    role?: EnumRoleWithAggregatesFilter<"Membership"> | $Enums.Role
    status?: EnumMembershipStatusWithAggregatesFilter<"Membership"> | $Enums.MembershipStatus
    createdAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Membership"> | Date | string
    userId?: StringWithAggregatesFilter<"Membership"> | string
    sedeId?: StringNullableWithAggregatesFilter<"Membership"> | string | null
  }

  export type CourseTeacherWhereInput = {
    AND?: CourseTeacherWhereInput | CourseTeacherWhereInput[]
    OR?: CourseTeacherWhereInput[]
    NOT?: CourseTeacherWhereInput | CourseTeacherWhereInput[]
    id?: StringFilter<"CourseTeacher"> | string
    courseId?: StringFilter<"CourseTeacher"> | string
    teacherId?: StringFilter<"CourseTeacher"> | string
    isActive?: BoolFilter<"CourseTeacher"> | boolean
    createdAt?: DateTimeFilter<"CourseTeacher"> | Date | string
    updatedAt?: DateTimeFilter<"CourseTeacher"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CourseTeacherOrderByWithRelationInput = {
    id?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    course?: CourseOrderByWithRelationInput
    teacher?: UserOrderByWithRelationInput
    _relevance?: CourseTeacherOrderByRelevanceInput
  }

  export type CourseTeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    courseId_teacherId?: CourseTeacherCourseIdTeacherIdCompoundUniqueInput
    AND?: CourseTeacherWhereInput | CourseTeacherWhereInput[]
    OR?: CourseTeacherWhereInput[]
    NOT?: CourseTeacherWhereInput | CourseTeacherWhereInput[]
    courseId?: StringFilter<"CourseTeacher"> | string
    teacherId?: StringFilter<"CourseTeacher"> | string
    isActive?: BoolFilter<"CourseTeacher"> | boolean
    createdAt?: DateTimeFilter<"CourseTeacher"> | Date | string
    updatedAt?: DateTimeFilter<"CourseTeacher"> | Date | string
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "courseId_teacherId">

  export type CourseTeacherOrderByWithAggregationInput = {
    id?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseTeacherCountOrderByAggregateInput
    _max?: CourseTeacherMaxOrderByAggregateInput
    _min?: CourseTeacherMinOrderByAggregateInput
  }

  export type CourseTeacherScalarWhereWithAggregatesInput = {
    AND?: CourseTeacherScalarWhereWithAggregatesInput | CourseTeacherScalarWhereWithAggregatesInput[]
    OR?: CourseTeacherScalarWhereWithAggregatesInput[]
    NOT?: CourseTeacherScalarWhereWithAggregatesInput | CourseTeacherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CourseTeacher"> | string
    courseId?: StringWithAggregatesFilter<"CourseTeacher"> | string
    teacherId?: StringWithAggregatesFilter<"CourseTeacher"> | string
    isActive?: BoolWithAggregatesFilter<"CourseTeacher"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CourseTeacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CourseTeacher"> | Date | string
  }

  export type SectionCourseWhereInput = {
    AND?: SectionCourseWhereInput | SectionCourseWhereInput[]
    OR?: SectionCourseWhereInput[]
    NOT?: SectionCourseWhereInput | SectionCourseWhereInput[]
    id?: StringFilter<"SectionCourse"> | string
    sectionId?: StringFilter<"SectionCourse"> | string
    courseId?: StringFilter<"SectionCourse"> | string
    teacherId?: StringFilter<"SectionCourse"> | string
    isActive?: BoolFilter<"SectionCourse"> | boolean
    createdAt?: DateTimeFilter<"SectionCourse"> | Date | string
    updatedAt?: DateTimeFilter<"SectionCourse"> | Date | string
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SectionCourseOrderByWithRelationInput = {
    id?: SortOrder
    sectionId?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    section?: SectionOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    teacher?: UserOrderByWithRelationInput
    _relevance?: SectionCourseOrderByRelevanceInput
  }

  export type SectionCourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sectionId_courseId?: SectionCourseSectionIdCourseIdCompoundUniqueInput
    AND?: SectionCourseWhereInput | SectionCourseWhereInput[]
    OR?: SectionCourseWhereInput[]
    NOT?: SectionCourseWhereInput | SectionCourseWhereInput[]
    sectionId?: StringFilter<"SectionCourse"> | string
    courseId?: StringFilter<"SectionCourse"> | string
    teacherId?: StringFilter<"SectionCourse"> | string
    isActive?: BoolFilter<"SectionCourse"> | boolean
    createdAt?: DateTimeFilter<"SectionCourse"> | Date | string
    updatedAt?: DateTimeFilter<"SectionCourse"> | Date | string
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    teacher?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sectionId_courseId">

  export type SectionCourseOrderByWithAggregationInput = {
    id?: SortOrder
    sectionId?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SectionCourseCountOrderByAggregateInput
    _max?: SectionCourseMaxOrderByAggregateInput
    _min?: SectionCourseMinOrderByAggregateInput
  }

  export type SectionCourseScalarWhereWithAggregatesInput = {
    AND?: SectionCourseScalarWhereWithAggregatesInput | SectionCourseScalarWhereWithAggregatesInput[]
    OR?: SectionCourseScalarWhereWithAggregatesInput[]
    NOT?: SectionCourseScalarWhereWithAggregatesInput | SectionCourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SectionCourse"> | string
    sectionId?: StringWithAggregatesFilter<"SectionCourse"> | string
    courseId?: StringWithAggregatesFilter<"SectionCourse"> | string
    teacherId?: StringWithAggregatesFilter<"SectionCourse"> | string
    isActive?: BoolWithAggregatesFilter<"SectionCourse"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SectionCourse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SectionCourse"> | Date | string
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    sectionId?: StringFilter<"Enrollment"> | string
    status?: EnumEnrollmentStatusFilter<"Enrollment"> | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    status?: SortOrder
    enrolledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: UserOrderByWithRelationInput
    section?: SectionOrderByWithRelationInput
    _relevance?: EnrollmentOrderByRelevanceInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_sectionId?: EnrollmentStudentIdSectionIdCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    studentId?: StringFilter<"Enrollment"> | string
    sectionId?: StringFilter<"Enrollment"> | string
    status?: EnumEnrollmentStatusFilter<"Enrollment"> | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
  }, "id" | "studentId_sectionId">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    status?: SortOrder
    enrolledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Enrollment"> | string
    studentId?: StringWithAggregatesFilter<"Enrollment"> | string
    sectionId?: StringWithAggregatesFilter<"Enrollment"> | string
    status?: EnumEnrollmentStatusWithAggregatesFilter<"Enrollment"> | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type ParentStudentWhereInput = {
    AND?: ParentStudentWhereInput | ParentStudentWhereInput[]
    OR?: ParentStudentWhereInput[]
    NOT?: ParentStudentWhereInput | ParentStudentWhereInput[]
    id?: StringFilter<"ParentStudent"> | string
    parentId?: StringFilter<"ParentStudent"> | string
    studentId?: StringFilter<"ParentStudent"> | string
    relationType?: EnumParentRelationTypeFilter<"ParentStudent"> | $Enums.ParentRelationType
    isPrimary?: BoolFilter<"ParentStudent"> | boolean
    createdAt?: DateTimeFilter<"ParentStudent"> | Date | string
    updatedAt?: DateTimeFilter<"ParentStudent"> | Date | string
    parent?: XOR<UserScalarRelationFilter, UserWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ParentStudentOrderByWithRelationInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    relationType?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: UserOrderByWithRelationInput
    student?: UserOrderByWithRelationInput
    _relevance?: ParentStudentOrderByRelevanceInput
  }

  export type ParentStudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    parentId_studentId?: ParentStudentParentIdStudentIdCompoundUniqueInput
    AND?: ParentStudentWhereInput | ParentStudentWhereInput[]
    OR?: ParentStudentWhereInput[]
    NOT?: ParentStudentWhereInput | ParentStudentWhereInput[]
    parentId?: StringFilter<"ParentStudent"> | string
    studentId?: StringFilter<"ParentStudent"> | string
    relationType?: EnumParentRelationTypeFilter<"ParentStudent"> | $Enums.ParentRelationType
    isPrimary?: BoolFilter<"ParentStudent"> | boolean
    createdAt?: DateTimeFilter<"ParentStudent"> | Date | string
    updatedAt?: DateTimeFilter<"ParentStudent"> | Date | string
    parent?: XOR<UserScalarRelationFilter, UserWhereInput>
    student?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "parentId_studentId">

  export type ParentStudentOrderByWithAggregationInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    relationType?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParentStudentCountOrderByAggregateInput
    _max?: ParentStudentMaxOrderByAggregateInput
    _min?: ParentStudentMinOrderByAggregateInput
  }

  export type ParentStudentScalarWhereWithAggregatesInput = {
    AND?: ParentStudentScalarWhereWithAggregatesInput | ParentStudentScalarWhereWithAggregatesInput[]
    OR?: ParentStudentScalarWhereWithAggregatesInput[]
    NOT?: ParentStudentScalarWhereWithAggregatesInput | ParentStudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ParentStudent"> | string
    parentId?: StringWithAggregatesFilter<"ParentStudent"> | string
    studentId?: StringWithAggregatesFilter<"ParentStudent"> | string
    relationType?: EnumParentRelationTypeWithAggregatesFilter<"ParentStudent"> | $Enums.ParentRelationType
    isPrimary?: BoolWithAggregatesFilter<"ParentStudent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ParentStudent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ParentStudent"> | Date | string
  }

  export type SedeCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomCreateNestedManyWithoutSedeInput
    memberships?: MembershipCreateNestedManyWithoutSedeInput
  }

  export type SedeUncheckedCreateInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutSedeInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutSedeInput
  }

  export type SedeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUpdateManyWithoutSedeNestedInput
    memberships?: MembershipUpdateManyWithoutSedeNestedInput
  }

  export type SedeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUncheckedUpdateManyWithoutSedeNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutSedeNestedInput
  }

  export type SedeCreateManyInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SedeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SedeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodCreateInput = {
    id?: string
    name: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.PeriodStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutPeriodInput
  }

  export type AcademicPeriodUncheckedCreateInput = {
    id?: string
    name: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.PeriodStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutPeriodInput
  }

  export type AcademicPeriodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutPeriodNestedInput
  }

  export type AcademicPeriodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutPeriodNestedInput
  }

  export type AcademicPeriodCreateManyInput = {
    id?: string
    name: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.PeriodStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicPeriodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnCreateInput = {
    id?: string
    name: string
    startTime?: string | null
    endTime?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutTurnInput
  }

  export type TurnUncheckedCreateInput = {
    id?: string
    name: string
    startTime?: string | null
    endTime?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutTurnInput
  }

  export type TurnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutTurnNestedInput
  }

  export type TurnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutTurnNestedInput
  }

  export type TurnCreateManyInput = {
    id?: string
    name: string
    startTime?: string | null
    endTime?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TurnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomCreateInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sede: SedeCreateNestedOneWithoutClassroomsInput
    sections?: SectionCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sedeId: string
    sections?: SectionUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: SedeUpdateOneRequiredWithoutClassroomsNestedInput
    sections?: SectionUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sedeId?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomCreateManyInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sedeId: string
  }

  export type ClassroomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sedeId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutSectionsInput
    turn: TurnCreateNestedOneWithoutSectionsInput
    period: AcademicPeriodCreateNestedOneWithoutSectionsInput
    enrollments?: EnrollmentCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
    periodId: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutSectionsNestedInput
    turn?: TurnUpdateOneRequiredWithoutSectionsNestedInput
    period?: AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput
    enrollments?: EnrollmentUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
    periodId: string
  }

  export type SectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
  }

  export type CourseCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    courseTeachers?: CourseTeacherCreateNestedManyWithoutCourseInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutCourseInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTeachers?: CourseTeacherUpdateManyWithoutCourseNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutCourseNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    firstName: string
    lastName: string
    documentType?: string | null
    documentNumber?: string | null
    phone?: string | null
    birthDate?: Date | string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    documentType?: string | null
    documentNumber?: string | null
    phone?: string | null
    birthDate?: Date | string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    documentType?: string | null
    documentNumber?: string | null
    phone?: string | null
    birthDate?: Date | string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
    sede?: SedeCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sedeId?: string | null
  }

  export type MembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
    sede?: SedeUpdateOneWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sedeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MembershipCreateManyInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    sedeId?: string | null
  }

  export type MembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    sedeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseTeacherCreateInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutCourseTeachersInput
    teacher: UserCreateNestedOneWithoutCourseTeachersInput
  }

  export type CourseTeacherUncheckedCreateInput = {
    id?: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTeacherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutCourseTeachersNestedInput
    teacher?: UserUpdateOneRequiredWithoutCourseTeachersNestedInput
  }

  export type CourseTeacherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTeacherCreateManyInput = {
    id?: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTeacherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTeacherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseCreateInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutSectionCoursesInput
    course: CourseCreateNestedOneWithoutSectionCoursesInput
    teacher: UserCreateNestedOneWithoutSectionCoursesInput
  }

  export type SectionCourseUncheckedCreateInput = {
    id?: string
    sectionId: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutSectionCoursesNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionCoursesNestedInput
    teacher?: UserUpdateOneRequiredWithoutSectionCoursesNestedInput
  }

  export type SectionCourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseCreateManyInput = {
    id?: string
    sectionId: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateInput = {
    id?: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutEnrollmentsInput
    section: SectionCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: string
    studentId: string
    sectionId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
    section?: SectionUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyInput = {
    id?: string
    studentId: string
    sectionId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentCreateInput = {
    id?: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutParentOfInput
    student: UserCreateNestedOneWithoutStudentOfInput
  }

  export type ParentStudentUncheckedCreateInput = {
    id?: string
    parentId: string
    studentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutParentOfNestedInput
    student?: UserUpdateOneRequiredWithoutStudentOfNestedInput
  }

  export type ParentStudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentCreateManyInput = {
    id?: string
    parentId: string
    studentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClassroomListRelationFilter = {
    every?: ClassroomWhereInput
    some?: ClassroomWhereInput
    none?: ClassroomWhereInput
  }

  export type MembershipListRelationFilter = {
    every?: MembershipWhereInput
    some?: MembershipWhereInput
    none?: MembershipWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClassroomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SedeOrderByRelevanceInput = {
    fields: SedeOrderByRelevanceFieldEnum | SedeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SedeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SedeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SedeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumPeriodStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PeriodStatus | EnumPeriodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PeriodStatus[]
    notIn?: $Enums.PeriodStatus[]
    not?: NestedEnumPeriodStatusFilter<$PrismaModel> | $Enums.PeriodStatus
  }

  export type SectionListRelationFilter = {
    every?: SectionWhereInput
    some?: SectionWhereInput
    none?: SectionWhereInput
  }

  export type SectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AcademicPeriodOrderByRelevanceInput = {
    fields: AcademicPeriodOrderByRelevanceFieldEnum | AcademicPeriodOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AcademicPeriodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AcademicPeriodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPeriodStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PeriodStatus | EnumPeriodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PeriodStatus[]
    notIn?: $Enums.PeriodStatus[]
    not?: NestedEnumPeriodStatusWithAggregatesFilter<$PrismaModel> | $Enums.PeriodStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPeriodStatusFilter<$PrismaModel>
    _max?: NestedEnumPeriodStatusFilter<$PrismaModel>
  }

  export type TurnOrderByRelevanceInput = {
    fields: TurnOrderByRelevanceFieldEnum | TurnOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TurnCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TurnMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TurnMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SedeScalarRelationFilter = {
    is?: SedeWhereInput
    isNot?: SedeWhereInput
  }

  export type ClassroomOrderByRelevanceInput = {
    fields: ClassroomOrderByRelevanceFieldEnum | ClassroomOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClassroomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sedeId?: SortOrder
  }

  export type ClassroomAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type ClassroomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sedeId?: SortOrder
  }

  export type ClassroomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sedeId?: SortOrder
  }

  export type ClassroomSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ClassroomScalarRelationFilter = {
    is?: ClassroomWhereInput
    isNot?: ClassroomWhereInput
  }

  export type TurnScalarRelationFilter = {
    is?: TurnWhereInput
    isNot?: TurnWhereInput
  }

  export type AcademicPeriodScalarRelationFilter = {
    is?: AcademicPeriodWhereInput
    isNot?: AcademicPeriodWhereInput
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type SectionCourseListRelationFilter = {
    every?: SectionCourseWhereInput
    some?: SectionCourseWhereInput
    none?: SectionCourseWhereInput
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectionCourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectionOrderByRelevanceInput = {
    fields: SectionOrderByRelevanceFieldEnum | SectionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SectionClassroomIdTurnIdPeriodIdNameCompoundUniqueInput = {
    classroomId: string
    turnId: string
    periodId: string
    name: string
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classroomId?: SortOrder
    turnId?: SortOrder
    periodId?: SortOrder
  }

  export type SectionAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classroomId?: SortOrder
    turnId?: SortOrder
    periodId?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    capacity?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    classroomId?: SortOrder
    turnId?: SortOrder
    periodId?: SortOrder
  }

  export type SectionSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type CourseTeacherListRelationFilter = {
    every?: CourseTeacherWhereInput
    some?: CourseTeacherWhereInput
    none?: CourseTeacherWhereInput
  }

  export type CourseTeacherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseOrderByRelevanceInput = {
    fields: CourseOrderByRelevanceFieldEnum | CourseOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProfileNullableScalarRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ParentStudentListRelationFilter = {
    every?: ParentStudentWhereInput
    some?: ParentStudentWhereInput
    none?: ParentStudentWhereInput
  }

  export type ParentStudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isActive?: SortOrder
    lastLoginAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfileOrderByRelevanceInput = {
    fields: ProfileOrderByRelevanceFieldEnum | ProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type EnumMembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[]
    notIn?: $Enums.MembershipStatus[]
    not?: NestedEnumMembershipStatusFilter<$PrismaModel> | $Enums.MembershipStatus
  }

  export type SedeNullableScalarRelationFilter = {
    is?: SedeWhereInput | null
    isNot?: SedeWhereInput | null
  }

  export type MembershipOrderByRelevanceInput = {
    fields: MembershipOrderByRelevanceFieldEnum | MembershipOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MembershipUserIdRoleSedeIdCompoundUniqueInput = {
    userId: string
    role: $Enums.Role
    sedeId: string
  }

  export type MembershipCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sedeId?: SortOrder
  }

  export type MembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sedeId?: SortOrder
  }

  export type MembershipMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    sedeId?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type EnumMembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[]
    notIn?: $Enums.MembershipStatus[]
    not?: NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.MembershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipStatusFilter<$PrismaModel>
    _max?: NestedEnumMembershipStatusFilter<$PrismaModel>
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type CourseTeacherOrderByRelevanceInput = {
    fields: CourseTeacherOrderByRelevanceFieldEnum | CourseTeacherOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CourseTeacherCourseIdTeacherIdCompoundUniqueInput = {
    courseId: string
    teacherId: string
  }

  export type CourseTeacherCountOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseTeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseTeacherMinOrderByAggregateInput = {
    id?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionScalarRelationFilter = {
    is?: SectionWhereInput
    isNot?: SectionWhereInput
  }

  export type SectionCourseOrderByRelevanceInput = {
    fields: SectionCourseOrderByRelevanceFieldEnum | SectionCourseOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SectionCourseSectionIdCourseIdCompoundUniqueInput = {
    sectionId: string
    courseId: string
  }

  export type SectionCourseCountOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionCourseMaxOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SectionCourseMinOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEnrollmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnrollmentStatus | EnumEnrollmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnrollmentStatus[]
    notIn?: $Enums.EnrollmentStatus[]
    not?: NestedEnumEnrollmentStatusFilter<$PrismaModel> | $Enums.EnrollmentStatus
  }

  export type EnrollmentOrderByRelevanceInput = {
    fields: EnrollmentOrderByRelevanceFieldEnum | EnrollmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EnrollmentStudentIdSectionIdCompoundUniqueInput = {
    studentId: string
    sectionId: string
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    status?: SortOrder
    enrolledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    status?: SortOrder
    enrolledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    status?: SortOrder
    enrolledAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEnrollmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnrollmentStatus | EnumEnrollmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnrollmentStatus[]
    notIn?: $Enums.EnrollmentStatus[]
    not?: NestedEnumEnrollmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnrollmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnrollmentStatusFilter<$PrismaModel>
    _max?: NestedEnumEnrollmentStatusFilter<$PrismaModel>
  }

  export type EnumParentRelationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRelationType | EnumParentRelationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRelationType[]
    notIn?: $Enums.ParentRelationType[]
    not?: NestedEnumParentRelationTypeFilter<$PrismaModel> | $Enums.ParentRelationType
  }

  export type ParentStudentOrderByRelevanceInput = {
    fields: ParentStudentOrderByRelevanceFieldEnum | ParentStudentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ParentStudentParentIdStudentIdCompoundUniqueInput = {
    parentId: string
    studentId: string
  }

  export type ParentStudentCountOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    relationType?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParentStudentMaxOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    relationType?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParentStudentMinOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    studentId?: SortOrder
    relationType?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumParentRelationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRelationType | EnumParentRelationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRelationType[]
    notIn?: $Enums.ParentRelationType[]
    not?: NestedEnumParentRelationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ParentRelationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumParentRelationTypeFilter<$PrismaModel>
    _max?: NestedEnumParentRelationTypeFilter<$PrismaModel>
  }

  export type ClassroomCreateNestedManyWithoutSedeInput = {
    create?: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput> | ClassroomCreateWithoutSedeInput[] | ClassroomUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSedeInput | ClassroomCreateOrConnectWithoutSedeInput[]
    createMany?: ClassroomCreateManySedeInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type MembershipCreateNestedManyWithoutSedeInput = {
    create?: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput> | MembershipCreateWithoutSedeInput[] | MembershipUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSedeInput | MembershipCreateOrConnectWithoutSedeInput[]
    createMany?: MembershipCreateManySedeInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type ClassroomUncheckedCreateNestedManyWithoutSedeInput = {
    create?: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput> | ClassroomCreateWithoutSedeInput[] | ClassroomUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSedeInput | ClassroomCreateOrConnectWithoutSedeInput[]
    createMany?: ClassroomCreateManySedeInputEnvelope
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
  }

  export type MembershipUncheckedCreateNestedManyWithoutSedeInput = {
    create?: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput> | MembershipCreateWithoutSedeInput[] | MembershipUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSedeInput | MembershipCreateOrConnectWithoutSedeInput[]
    createMany?: MembershipCreateManySedeInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClassroomUpdateManyWithoutSedeNestedInput = {
    create?: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput> | ClassroomCreateWithoutSedeInput[] | ClassroomUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSedeInput | ClassroomCreateOrConnectWithoutSedeInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutSedeInput | ClassroomUpsertWithWhereUniqueWithoutSedeInput[]
    createMany?: ClassroomCreateManySedeInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutSedeInput | ClassroomUpdateWithWhereUniqueWithoutSedeInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutSedeInput | ClassroomUpdateManyWithWhereWithoutSedeInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type MembershipUpdateManyWithoutSedeNestedInput = {
    create?: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput> | MembershipCreateWithoutSedeInput[] | MembershipUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSedeInput | MembershipCreateOrConnectWithoutSedeInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutSedeInput | MembershipUpsertWithWhereUniqueWithoutSedeInput[]
    createMany?: MembershipCreateManySedeInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutSedeInput | MembershipUpdateWithWhereUniqueWithoutSedeInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutSedeInput | MembershipUpdateManyWithWhereWithoutSedeInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type ClassroomUncheckedUpdateManyWithoutSedeNestedInput = {
    create?: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput> | ClassroomCreateWithoutSedeInput[] | ClassroomUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: ClassroomCreateOrConnectWithoutSedeInput | ClassroomCreateOrConnectWithoutSedeInput[]
    upsert?: ClassroomUpsertWithWhereUniqueWithoutSedeInput | ClassroomUpsertWithWhereUniqueWithoutSedeInput[]
    createMany?: ClassroomCreateManySedeInputEnvelope
    set?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    disconnect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    delete?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    connect?: ClassroomWhereUniqueInput | ClassroomWhereUniqueInput[]
    update?: ClassroomUpdateWithWhereUniqueWithoutSedeInput | ClassroomUpdateWithWhereUniqueWithoutSedeInput[]
    updateMany?: ClassroomUpdateManyWithWhereWithoutSedeInput | ClassroomUpdateManyWithWhereWithoutSedeInput[]
    deleteMany?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
  }

  export type MembershipUncheckedUpdateManyWithoutSedeNestedInput = {
    create?: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput> | MembershipCreateWithoutSedeInput[] | MembershipUncheckedCreateWithoutSedeInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutSedeInput | MembershipCreateOrConnectWithoutSedeInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutSedeInput | MembershipUpsertWithWhereUniqueWithoutSedeInput[]
    createMany?: MembershipCreateManySedeInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutSedeInput | MembershipUpdateWithWhereUniqueWithoutSedeInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutSedeInput | MembershipUpdateManyWithWhereWithoutSedeInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type SectionCreateNestedManyWithoutPeriodInput = {
    create?: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput> | SectionCreateWithoutPeriodInput[] | SectionUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutPeriodInput | SectionCreateOrConnectWithoutPeriodInput[]
    createMany?: SectionCreateManyPeriodInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutPeriodInput = {
    create?: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput> | SectionCreateWithoutPeriodInput[] | SectionUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutPeriodInput | SectionCreateOrConnectWithoutPeriodInput[]
    createMany?: SectionCreateManyPeriodInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type EnumPeriodStatusFieldUpdateOperationsInput = {
    set?: $Enums.PeriodStatus
  }

  export type SectionUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput> | SectionCreateWithoutPeriodInput[] | SectionUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutPeriodInput | SectionCreateOrConnectWithoutPeriodInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutPeriodInput | SectionUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: SectionCreateManyPeriodInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutPeriodInput | SectionUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutPeriodInput | SectionUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type SectionUncheckedUpdateManyWithoutPeriodNestedInput = {
    create?: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput> | SectionCreateWithoutPeriodInput[] | SectionUncheckedCreateWithoutPeriodInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutPeriodInput | SectionCreateOrConnectWithoutPeriodInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutPeriodInput | SectionUpsertWithWhereUniqueWithoutPeriodInput[]
    createMany?: SectionCreateManyPeriodInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutPeriodInput | SectionUpdateWithWhereUniqueWithoutPeriodInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutPeriodInput | SectionUpdateManyWithWhereWithoutPeriodInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type SectionCreateNestedManyWithoutTurnInput = {
    create?: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput> | SectionCreateWithoutTurnInput[] | SectionUncheckedCreateWithoutTurnInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutTurnInput | SectionCreateOrConnectWithoutTurnInput[]
    createMany?: SectionCreateManyTurnInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutTurnInput = {
    create?: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput> | SectionCreateWithoutTurnInput[] | SectionUncheckedCreateWithoutTurnInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutTurnInput | SectionCreateOrConnectWithoutTurnInput[]
    createMany?: SectionCreateManyTurnInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUpdateManyWithoutTurnNestedInput = {
    create?: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput> | SectionCreateWithoutTurnInput[] | SectionUncheckedCreateWithoutTurnInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutTurnInput | SectionCreateOrConnectWithoutTurnInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutTurnInput | SectionUpsertWithWhereUniqueWithoutTurnInput[]
    createMany?: SectionCreateManyTurnInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutTurnInput | SectionUpdateWithWhereUniqueWithoutTurnInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutTurnInput | SectionUpdateManyWithWhereWithoutTurnInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type SectionUncheckedUpdateManyWithoutTurnNestedInput = {
    create?: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput> | SectionCreateWithoutTurnInput[] | SectionUncheckedCreateWithoutTurnInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutTurnInput | SectionCreateOrConnectWithoutTurnInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutTurnInput | SectionUpsertWithWhereUniqueWithoutTurnInput[]
    createMany?: SectionCreateManyTurnInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutTurnInput | SectionUpdateWithWhereUniqueWithoutTurnInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutTurnInput | SectionUpdateManyWithWhereWithoutTurnInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type SedeCreateNestedOneWithoutClassroomsInput = {
    create?: XOR<SedeCreateWithoutClassroomsInput, SedeUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: SedeCreateOrConnectWithoutClassroomsInput
    connect?: SedeWhereUniqueInput
  }

  export type SectionCreateNestedManyWithoutClassroomInput = {
    create?: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput> | SectionCreateWithoutClassroomInput[] | SectionUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutClassroomInput | SectionCreateOrConnectWithoutClassroomInput[]
    createMany?: SectionCreateManyClassroomInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutClassroomInput = {
    create?: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput> | SectionCreateWithoutClassroomInput[] | SectionUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutClassroomInput | SectionCreateOrConnectWithoutClassroomInput[]
    createMany?: SectionCreateManyClassroomInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SedeUpdateOneRequiredWithoutClassroomsNestedInput = {
    create?: XOR<SedeCreateWithoutClassroomsInput, SedeUncheckedCreateWithoutClassroomsInput>
    connectOrCreate?: SedeCreateOrConnectWithoutClassroomsInput
    upsert?: SedeUpsertWithoutClassroomsInput
    connect?: SedeWhereUniqueInput
    update?: XOR<XOR<SedeUpdateToOneWithWhereWithoutClassroomsInput, SedeUpdateWithoutClassroomsInput>, SedeUncheckedUpdateWithoutClassroomsInput>
  }

  export type SectionUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput> | SectionCreateWithoutClassroomInput[] | SectionUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutClassroomInput | SectionCreateOrConnectWithoutClassroomInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutClassroomInput | SectionUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: SectionCreateManyClassroomInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutClassroomInput | SectionUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutClassroomInput | SectionUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type SectionUncheckedUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput> | SectionCreateWithoutClassroomInput[] | SectionUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutClassroomInput | SectionCreateOrConnectWithoutClassroomInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutClassroomInput | SectionUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: SectionCreateManyClassroomInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutClassroomInput | SectionUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutClassroomInput | SectionUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type ClassroomCreateNestedOneWithoutSectionsInput = {
    create?: XOR<ClassroomCreateWithoutSectionsInput, ClassroomUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutSectionsInput
    connect?: ClassroomWhereUniqueInput
  }

  export type TurnCreateNestedOneWithoutSectionsInput = {
    create?: XOR<TurnCreateWithoutSectionsInput, TurnUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: TurnCreateOrConnectWithoutSectionsInput
    connect?: TurnWhereUniqueInput
  }

  export type AcademicPeriodCreateNestedOneWithoutSectionsInput = {
    create?: XOR<AcademicPeriodCreateWithoutSectionsInput, AcademicPeriodUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: AcademicPeriodCreateOrConnectWithoutSectionsInput
    connect?: AcademicPeriodWhereUniqueInput
  }

  export type EnrollmentCreateNestedManyWithoutSectionInput = {
    create?: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput> | EnrollmentCreateWithoutSectionInput[] | EnrollmentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutSectionInput | EnrollmentCreateOrConnectWithoutSectionInput[]
    createMany?: EnrollmentCreateManySectionInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SectionCourseCreateNestedManyWithoutSectionInput = {
    create?: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput> | SectionCourseCreateWithoutSectionInput[] | SectionCourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutSectionInput | SectionCourseCreateOrConnectWithoutSectionInput[]
    createMany?: SectionCourseCreateManySectionInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput> | EnrollmentCreateWithoutSectionInput[] | EnrollmentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutSectionInput | EnrollmentCreateOrConnectWithoutSectionInput[]
    createMany?: EnrollmentCreateManySectionInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SectionCourseUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput> | SectionCourseCreateWithoutSectionInput[] | SectionCourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutSectionInput | SectionCourseCreateOrConnectWithoutSectionInput[]
    createMany?: SectionCourseCreateManySectionInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type ClassroomUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<ClassroomCreateWithoutSectionsInput, ClassroomUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutSectionsInput
    upsert?: ClassroomUpsertWithoutSectionsInput
    connect?: ClassroomWhereUniqueInput
    update?: XOR<XOR<ClassroomUpdateToOneWithWhereWithoutSectionsInput, ClassroomUpdateWithoutSectionsInput>, ClassroomUncheckedUpdateWithoutSectionsInput>
  }

  export type TurnUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<TurnCreateWithoutSectionsInput, TurnUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: TurnCreateOrConnectWithoutSectionsInput
    upsert?: TurnUpsertWithoutSectionsInput
    connect?: TurnWhereUniqueInput
    update?: XOR<XOR<TurnUpdateToOneWithWhereWithoutSectionsInput, TurnUpdateWithoutSectionsInput>, TurnUncheckedUpdateWithoutSectionsInput>
  }

  export type AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<AcademicPeriodCreateWithoutSectionsInput, AcademicPeriodUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: AcademicPeriodCreateOrConnectWithoutSectionsInput
    upsert?: AcademicPeriodUpsertWithoutSectionsInput
    connect?: AcademicPeriodWhereUniqueInput
    update?: XOR<XOR<AcademicPeriodUpdateToOneWithWhereWithoutSectionsInput, AcademicPeriodUpdateWithoutSectionsInput>, AcademicPeriodUncheckedUpdateWithoutSectionsInput>
  }

  export type EnrollmentUpdateManyWithoutSectionNestedInput = {
    create?: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput> | EnrollmentCreateWithoutSectionInput[] | EnrollmentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutSectionInput | EnrollmentCreateOrConnectWithoutSectionInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutSectionInput | EnrollmentUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: EnrollmentCreateManySectionInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutSectionInput | EnrollmentUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutSectionInput | EnrollmentUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SectionCourseUpdateManyWithoutSectionNestedInput = {
    create?: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput> | SectionCourseCreateWithoutSectionInput[] | SectionCourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutSectionInput | SectionCourseCreateOrConnectWithoutSectionInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutSectionInput | SectionCourseUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: SectionCourseCreateManySectionInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutSectionInput | SectionCourseUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutSectionInput | SectionCourseUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput> | EnrollmentCreateWithoutSectionInput[] | EnrollmentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutSectionInput | EnrollmentCreateOrConnectWithoutSectionInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutSectionInput | EnrollmentUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: EnrollmentCreateManySectionInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutSectionInput | EnrollmentUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutSectionInput | EnrollmentUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SectionCourseUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput> | SectionCourseCreateWithoutSectionInput[] | SectionCourseUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutSectionInput | SectionCourseCreateOrConnectWithoutSectionInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutSectionInput | SectionCourseUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: SectionCourseCreateManySectionInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutSectionInput | SectionCourseUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutSectionInput | SectionCourseUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type CourseTeacherCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput> | CourseTeacherCreateWithoutCourseInput[] | CourseTeacherUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutCourseInput | CourseTeacherCreateOrConnectWithoutCourseInput[]
    createMany?: CourseTeacherCreateManyCourseInputEnvelope
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
  }

  export type SectionCourseCreateNestedManyWithoutCourseInput = {
    create?: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput> | SectionCourseCreateWithoutCourseInput[] | SectionCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutCourseInput | SectionCourseCreateOrConnectWithoutCourseInput[]
    createMany?: SectionCourseCreateManyCourseInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type CourseTeacherUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput> | CourseTeacherCreateWithoutCourseInput[] | CourseTeacherUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutCourseInput | CourseTeacherCreateOrConnectWithoutCourseInput[]
    createMany?: CourseTeacherCreateManyCourseInputEnvelope
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
  }

  export type SectionCourseUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput> | SectionCourseCreateWithoutCourseInput[] | SectionCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutCourseInput | SectionCourseCreateOrConnectWithoutCourseInput[]
    createMany?: SectionCourseCreateManyCourseInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type CourseTeacherUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput> | CourseTeacherCreateWithoutCourseInput[] | CourseTeacherUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutCourseInput | CourseTeacherCreateOrConnectWithoutCourseInput[]
    upsert?: CourseTeacherUpsertWithWhereUniqueWithoutCourseInput | CourseTeacherUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseTeacherCreateManyCourseInputEnvelope
    set?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    disconnect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    delete?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    update?: CourseTeacherUpdateWithWhereUniqueWithoutCourseInput | CourseTeacherUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseTeacherUpdateManyWithWhereWithoutCourseInput | CourseTeacherUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
  }

  export type SectionCourseUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput> | SectionCourseCreateWithoutCourseInput[] | SectionCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutCourseInput | SectionCourseCreateOrConnectWithoutCourseInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutCourseInput | SectionCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SectionCourseCreateManyCourseInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutCourseInput | SectionCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutCourseInput | SectionCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type CourseTeacherUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput> | CourseTeacherCreateWithoutCourseInput[] | CourseTeacherUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutCourseInput | CourseTeacherCreateOrConnectWithoutCourseInput[]
    upsert?: CourseTeacherUpsertWithWhereUniqueWithoutCourseInput | CourseTeacherUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: CourseTeacherCreateManyCourseInputEnvelope
    set?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    disconnect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    delete?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    update?: CourseTeacherUpdateWithWhereUniqueWithoutCourseInput | CourseTeacherUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: CourseTeacherUpdateManyWithWhereWithoutCourseInput | CourseTeacherUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
  }

  export type SectionCourseUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput> | SectionCourseCreateWithoutCourseInput[] | SectionCourseUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutCourseInput | SectionCourseCreateOrConnectWithoutCourseInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutCourseInput | SectionCourseUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SectionCourseCreateManyCourseInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutCourseInput | SectionCourseUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutCourseInput | SectionCourseUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type MembershipCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type CourseTeacherCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput> | CourseTeacherCreateWithoutTeacherInput[] | CourseTeacherUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutTeacherInput | CourseTeacherCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseTeacherCreateManyTeacherInputEnvelope
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
  }

  export type SectionCourseCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput> | SectionCourseCreateWithoutTeacherInput[] | SectionCourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutTeacherInput | SectionCourseCreateOrConnectWithoutTeacherInput[]
    createMany?: SectionCourseCreateManyTeacherInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type ParentStudentCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput> | ParentStudentCreateWithoutParentInput[] | ParentStudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutParentInput | ParentStudentCreateOrConnectWithoutParentInput[]
    createMany?: ParentStudentCreateManyParentInputEnvelope
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
  }

  export type ParentStudentCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput> | ParentStudentCreateWithoutStudentInput[] | ParentStudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutStudentInput | ParentStudentCreateOrConnectWithoutStudentInput[]
    createMany?: ParentStudentCreateManyStudentInputEnvelope
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type MembershipUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
  }

  export type CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput> | CourseTeacherCreateWithoutTeacherInput[] | CourseTeacherUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutTeacherInput | CourseTeacherCreateOrConnectWithoutTeacherInput[]
    createMany?: CourseTeacherCreateManyTeacherInputEnvelope
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
  }

  export type SectionCourseUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput> | SectionCourseCreateWithoutTeacherInput[] | SectionCourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutTeacherInput | SectionCourseCreateOrConnectWithoutTeacherInput[]
    createMany?: SectionCourseCreateManyTeacherInputEnvelope
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type ParentStudentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput> | ParentStudentCreateWithoutParentInput[] | ParentStudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutParentInput | ParentStudentCreateOrConnectWithoutParentInput[]
    createMany?: ParentStudentCreateManyParentInputEnvelope
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
  }

  export type ParentStudentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput> | ParentStudentCreateWithoutStudentInput[] | ParentStudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutStudentInput | ParentStudentCreateOrConnectWithoutStudentInput[]
    createMany?: ParentStudentCreateManyStudentInputEnvelope
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type CourseTeacherUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput> | CourseTeacherCreateWithoutTeacherInput[] | CourseTeacherUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutTeacherInput | CourseTeacherCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseTeacherUpsertWithWhereUniqueWithoutTeacherInput | CourseTeacherUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseTeacherCreateManyTeacherInputEnvelope
    set?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    disconnect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    delete?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    update?: CourseTeacherUpdateWithWhereUniqueWithoutTeacherInput | CourseTeacherUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseTeacherUpdateManyWithWhereWithoutTeacherInput | CourseTeacherUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
  }

  export type SectionCourseUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput> | SectionCourseCreateWithoutTeacherInput[] | SectionCourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutTeacherInput | SectionCourseCreateOrConnectWithoutTeacherInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutTeacherInput | SectionCourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SectionCourseCreateManyTeacherInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutTeacherInput | SectionCourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutTeacherInput | SectionCourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type ParentStudentUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput> | ParentStudentCreateWithoutParentInput[] | ParentStudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutParentInput | ParentStudentCreateOrConnectWithoutParentInput[]
    upsert?: ParentStudentUpsertWithWhereUniqueWithoutParentInput | ParentStudentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentStudentCreateManyParentInputEnvelope
    set?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    disconnect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    delete?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    update?: ParentStudentUpdateWithWhereUniqueWithoutParentInput | ParentStudentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentStudentUpdateManyWithWhereWithoutParentInput | ParentStudentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
  }

  export type ParentStudentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput> | ParentStudentCreateWithoutStudentInput[] | ParentStudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutStudentInput | ParentStudentCreateOrConnectWithoutStudentInput[]
    upsert?: ParentStudentUpsertWithWhereUniqueWithoutStudentInput | ParentStudentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentStudentCreateManyStudentInputEnvelope
    set?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    disconnect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    delete?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    update?: ParentStudentUpdateWithWhereUniqueWithoutStudentInput | ParentStudentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentStudentUpdateManyWithWhereWithoutStudentInput | ParentStudentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput> | MembershipCreateWithoutUserInput[] | MembershipUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MembershipCreateOrConnectWithoutUserInput | MembershipCreateOrConnectWithoutUserInput[]
    upsert?: MembershipUpsertWithWhereUniqueWithoutUserInput | MembershipUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MembershipCreateManyUserInputEnvelope
    set?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    disconnect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    delete?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    connect?: MembershipWhereUniqueInput | MembershipWhereUniqueInput[]
    update?: MembershipUpdateWithWhereUniqueWithoutUserInput | MembershipUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MembershipUpdateManyWithWhereWithoutUserInput | MembershipUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
  }

  export type CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput> | CourseTeacherCreateWithoutTeacherInput[] | CourseTeacherUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseTeacherCreateOrConnectWithoutTeacherInput | CourseTeacherCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseTeacherUpsertWithWhereUniqueWithoutTeacherInput | CourseTeacherUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: CourseTeacherCreateManyTeacherInputEnvelope
    set?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    disconnect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    delete?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    connect?: CourseTeacherWhereUniqueInput | CourseTeacherWhereUniqueInput[]
    update?: CourseTeacherUpdateWithWhereUniqueWithoutTeacherInput | CourseTeacherUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseTeacherUpdateManyWithWhereWithoutTeacherInput | CourseTeacherUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
  }

  export type SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput> | SectionCourseCreateWithoutTeacherInput[] | SectionCourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SectionCourseCreateOrConnectWithoutTeacherInput | SectionCourseCreateOrConnectWithoutTeacherInput[]
    upsert?: SectionCourseUpsertWithWhereUniqueWithoutTeacherInput | SectionCourseUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SectionCourseCreateManyTeacherInputEnvelope
    set?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    disconnect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    delete?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    connect?: SectionCourseWhereUniqueInput | SectionCourseWhereUniqueInput[]
    update?: SectionCourseUpdateWithWhereUniqueWithoutTeacherInput | SectionCourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SectionCourseUpdateManyWithWhereWithoutTeacherInput | SectionCourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type ParentStudentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput> | ParentStudentCreateWithoutParentInput[] | ParentStudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutParentInput | ParentStudentCreateOrConnectWithoutParentInput[]
    upsert?: ParentStudentUpsertWithWhereUniqueWithoutParentInput | ParentStudentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ParentStudentCreateManyParentInputEnvelope
    set?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    disconnect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    delete?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    update?: ParentStudentUpdateWithWhereUniqueWithoutParentInput | ParentStudentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ParentStudentUpdateManyWithWhereWithoutParentInput | ParentStudentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
  }

  export type ParentStudentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput> | ParentStudentCreateWithoutStudentInput[] | ParentStudentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ParentStudentCreateOrConnectWithoutStudentInput | ParentStudentCreateOrConnectWithoutStudentInput[]
    upsert?: ParentStudentUpsertWithWhereUniqueWithoutStudentInput | ParentStudentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ParentStudentCreateManyStudentInputEnvelope
    set?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    disconnect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    delete?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    connect?: ParentStudentWhereUniqueInput | ParentStudentWhereUniqueInput[]
    update?: ParentStudentUpdateWithWhereUniqueWithoutStudentInput | ParentStudentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ParentStudentUpdateManyWithWhereWithoutStudentInput | ParentStudentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type SedeCreateNestedOneWithoutMembershipsInput = {
    create?: XOR<SedeCreateWithoutMembershipsInput, SedeUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: SedeCreateOrConnectWithoutMembershipsInput
    connect?: SedeWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type EnumMembershipStatusFieldUpdateOperationsInput = {
    set?: $Enums.MembershipStatus
  }

  export type UserUpdateOneRequiredWithoutMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMembershipsInput
    upsert?: UserUpsertWithoutMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMembershipsInput, UserUpdateWithoutMembershipsInput>, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type SedeUpdateOneWithoutMembershipsNestedInput = {
    create?: XOR<SedeCreateWithoutMembershipsInput, SedeUncheckedCreateWithoutMembershipsInput>
    connectOrCreate?: SedeCreateOrConnectWithoutMembershipsInput
    upsert?: SedeUpsertWithoutMembershipsInput
    disconnect?: SedeWhereInput | boolean
    delete?: SedeWhereInput | boolean
    connect?: SedeWhereUniqueInput
    update?: XOR<XOR<SedeUpdateToOneWithWhereWithoutMembershipsInput, SedeUpdateWithoutMembershipsInput>, SedeUncheckedUpdateWithoutMembershipsInput>
  }

  export type CourseCreateNestedOneWithoutCourseTeachersInput = {
    create?: XOR<CourseCreateWithoutCourseTeachersInput, CourseUncheckedCreateWithoutCourseTeachersInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseTeachersInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCourseTeachersInput = {
    create?: XOR<UserCreateWithoutCourseTeachersInput, UserUncheckedCreateWithoutCourseTeachersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCourseTeachersInput
    connect?: UserWhereUniqueInput
  }

  export type CourseUpdateOneRequiredWithoutCourseTeachersNestedInput = {
    create?: XOR<CourseCreateWithoutCourseTeachersInput, CourseUncheckedCreateWithoutCourseTeachersInput>
    connectOrCreate?: CourseCreateOrConnectWithoutCourseTeachersInput
    upsert?: CourseUpsertWithoutCourseTeachersInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutCourseTeachersInput, CourseUpdateWithoutCourseTeachersInput>, CourseUncheckedUpdateWithoutCourseTeachersInput>
  }

  export type UserUpdateOneRequiredWithoutCourseTeachersNestedInput = {
    create?: XOR<UserCreateWithoutCourseTeachersInput, UserUncheckedCreateWithoutCourseTeachersInput>
    connectOrCreate?: UserCreateOrConnectWithoutCourseTeachersInput
    upsert?: UserUpsertWithoutCourseTeachersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCourseTeachersInput, UserUpdateWithoutCourseTeachersInput>, UserUncheckedUpdateWithoutCourseTeachersInput>
  }

  export type SectionCreateNestedOneWithoutSectionCoursesInput = {
    create?: XOR<SectionCreateWithoutSectionCoursesInput, SectionUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutSectionCoursesInput
    connect?: SectionWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutSectionCoursesInput = {
    create?: XOR<CourseCreateWithoutSectionCoursesInput, CourseUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSectionCoursesInput
    connect?: CourseWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSectionCoursesInput = {
    create?: XOR<UserCreateWithoutSectionCoursesInput, UserUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSectionCoursesInput
    connect?: UserWhereUniqueInput
  }

  export type SectionUpdateOneRequiredWithoutSectionCoursesNestedInput = {
    create?: XOR<SectionCreateWithoutSectionCoursesInput, SectionUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: SectionCreateOrConnectWithoutSectionCoursesInput
    upsert?: SectionUpsertWithoutSectionCoursesInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutSectionCoursesInput, SectionUpdateWithoutSectionCoursesInput>, SectionUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type CourseUpdateOneRequiredWithoutSectionCoursesNestedInput = {
    create?: XOR<CourseCreateWithoutSectionCoursesInput, CourseUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutSectionCoursesInput
    upsert?: CourseUpsertWithoutSectionCoursesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutSectionCoursesInput, CourseUpdateWithoutSectionCoursesInput>, CourseUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type UserUpdateOneRequiredWithoutSectionCoursesNestedInput = {
    create?: XOR<UserCreateWithoutSectionCoursesInput, UserUncheckedCreateWithoutSectionCoursesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSectionCoursesInput
    upsert?: UserUpsertWithoutSectionCoursesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSectionCoursesInput, UserUpdateWithoutSectionCoursesInput>, UserUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
  }

  export type SectionCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<SectionCreateWithoutEnrollmentsInput, SectionUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutEnrollmentsInput
    connect?: SectionWhereUniqueInput
  }

  export type EnumEnrollmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.EnrollmentStatus
  }

  export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnrollmentsInput
    upsert?: UserUpsertWithoutEnrollmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnrollmentsInput, UserUpdateWithoutEnrollmentsInput>, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type SectionUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<SectionCreateWithoutEnrollmentsInput, SectionUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutEnrollmentsInput
    upsert?: SectionUpsertWithoutEnrollmentsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutEnrollmentsInput, SectionUpdateWithoutEnrollmentsInput>, SectionUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserCreateNestedOneWithoutParentOfInput = {
    create?: XOR<UserCreateWithoutParentOfInput, UserUncheckedCreateWithoutParentOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutParentOfInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentOfInput = {
    create?: XOR<UserCreateWithoutStudentOfInput, UserUncheckedCreateWithoutStudentOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentOfInput
    connect?: UserWhereUniqueInput
  }

  export type EnumParentRelationTypeFieldUpdateOperationsInput = {
    set?: $Enums.ParentRelationType
  }

  export type UserUpdateOneRequiredWithoutParentOfNestedInput = {
    create?: XOR<UserCreateWithoutParentOfInput, UserUncheckedCreateWithoutParentOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutParentOfInput
    upsert?: UserUpsertWithoutParentOfInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParentOfInput, UserUpdateWithoutParentOfInput>, UserUncheckedUpdateWithoutParentOfInput>
  }

  export type UserUpdateOneRequiredWithoutStudentOfNestedInput = {
    create?: XOR<UserCreateWithoutStudentOfInput, UserUncheckedCreateWithoutStudentOfInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentOfInput
    upsert?: UserUpsertWithoutStudentOfInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentOfInput, UserUpdateWithoutStudentOfInput>, UserUncheckedUpdateWithoutStudentOfInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPeriodStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PeriodStatus | EnumPeriodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PeriodStatus[]
    notIn?: $Enums.PeriodStatus[]
    not?: NestedEnumPeriodStatusFilter<$PrismaModel> | $Enums.PeriodStatus
  }

  export type NestedEnumPeriodStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PeriodStatus | EnumPeriodStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PeriodStatus[]
    notIn?: $Enums.PeriodStatus[]
    not?: NestedEnumPeriodStatusWithAggregatesFilter<$PrismaModel> | $Enums.PeriodStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPeriodStatusFilter<$PrismaModel>
    _max?: NestedEnumPeriodStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumMembershipStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[]
    notIn?: $Enums.MembershipStatus[]
    not?: NestedEnumMembershipStatusFilter<$PrismaModel> | $Enums.MembershipStatus
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MembershipStatus | EnumMembershipStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MembershipStatus[]
    notIn?: $Enums.MembershipStatus[]
    not?: NestedEnumMembershipStatusWithAggregatesFilter<$PrismaModel> | $Enums.MembershipStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMembershipStatusFilter<$PrismaModel>
    _max?: NestedEnumMembershipStatusFilter<$PrismaModel>
  }

  export type NestedEnumEnrollmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EnrollmentStatus | EnumEnrollmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnrollmentStatus[]
    notIn?: $Enums.EnrollmentStatus[]
    not?: NestedEnumEnrollmentStatusFilter<$PrismaModel> | $Enums.EnrollmentStatus
  }

  export type NestedEnumEnrollmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EnrollmentStatus | EnumEnrollmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EnrollmentStatus[]
    notIn?: $Enums.EnrollmentStatus[]
    not?: NestedEnumEnrollmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.EnrollmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEnrollmentStatusFilter<$PrismaModel>
    _max?: NestedEnumEnrollmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumParentRelationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRelationType | EnumParentRelationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRelationType[]
    notIn?: $Enums.ParentRelationType[]
    not?: NestedEnumParentRelationTypeFilter<$PrismaModel> | $Enums.ParentRelationType
  }

  export type NestedEnumParentRelationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ParentRelationType | EnumParentRelationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ParentRelationType[]
    notIn?: $Enums.ParentRelationType[]
    not?: NestedEnumParentRelationTypeWithAggregatesFilter<$PrismaModel> | $Enums.ParentRelationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumParentRelationTypeFilter<$PrismaModel>
    _max?: NestedEnumParentRelationTypeFilter<$PrismaModel>
  }

  export type ClassroomCreateWithoutSedeInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateWithoutSedeInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sections?: SectionUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomCreateOrConnectWithoutSedeInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput>
  }

  export type ClassroomCreateManySedeInputEnvelope = {
    data: ClassroomCreateManySedeInput | ClassroomCreateManySedeInput[]
    skipDuplicates?: boolean
  }

  export type MembershipCreateWithoutSedeInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutSedeInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type MembershipCreateOrConnectWithoutSedeInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput>
  }

  export type MembershipCreateManySedeInputEnvelope = {
    data: MembershipCreateManySedeInput | MembershipCreateManySedeInput[]
    skipDuplicates?: boolean
  }

  export type ClassroomUpsertWithWhereUniqueWithoutSedeInput = {
    where: ClassroomWhereUniqueInput
    update: XOR<ClassroomUpdateWithoutSedeInput, ClassroomUncheckedUpdateWithoutSedeInput>
    create: XOR<ClassroomCreateWithoutSedeInput, ClassroomUncheckedCreateWithoutSedeInput>
  }

  export type ClassroomUpdateWithWhereUniqueWithoutSedeInput = {
    where: ClassroomWhereUniqueInput
    data: XOR<ClassroomUpdateWithoutSedeInput, ClassroomUncheckedUpdateWithoutSedeInput>
  }

  export type ClassroomUpdateManyWithWhereWithoutSedeInput = {
    where: ClassroomScalarWhereInput
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyWithoutSedeInput>
  }

  export type ClassroomScalarWhereInput = {
    AND?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    OR?: ClassroomScalarWhereInput[]
    NOT?: ClassroomScalarWhereInput | ClassroomScalarWhereInput[]
    id?: StringFilter<"Classroom"> | string
    name?: StringFilter<"Classroom"> | string
    location?: StringNullableFilter<"Classroom"> | string | null
    capacity?: IntNullableFilter<"Classroom"> | number | null
    isActive?: BoolFilter<"Classroom"> | boolean
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    updatedAt?: DateTimeFilter<"Classroom"> | Date | string
    sedeId?: StringFilter<"Classroom"> | string
  }

  export type MembershipUpsertWithWhereUniqueWithoutSedeInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutSedeInput, MembershipUncheckedUpdateWithoutSedeInput>
    create: XOR<MembershipCreateWithoutSedeInput, MembershipUncheckedCreateWithoutSedeInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutSedeInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutSedeInput, MembershipUncheckedUpdateWithoutSedeInput>
  }

  export type MembershipUpdateManyWithWhereWithoutSedeInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutSedeInput>
  }

  export type MembershipScalarWhereInput = {
    AND?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    OR?: MembershipScalarWhereInput[]
    NOT?: MembershipScalarWhereInput | MembershipScalarWhereInput[]
    id?: StringFilter<"Membership"> | string
    role?: EnumRoleFilter<"Membership"> | $Enums.Role
    status?: EnumMembershipStatusFilter<"Membership"> | $Enums.MembershipStatus
    createdAt?: DateTimeFilter<"Membership"> | Date | string
    updatedAt?: DateTimeFilter<"Membership"> | Date | string
    userId?: StringFilter<"Membership"> | string
    sedeId?: StringNullableFilter<"Membership"> | string | null
  }

  export type SectionCreateWithoutPeriodInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutSectionsInput
    turn: TurnCreateNestedOneWithoutSectionsInput
    enrollments?: EnrollmentCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutPeriodInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutPeriodInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput>
  }

  export type SectionCreateManyPeriodInputEnvelope = {
    data: SectionCreateManyPeriodInput | SectionCreateManyPeriodInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithWhereUniqueWithoutPeriodInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutPeriodInput, SectionUncheckedUpdateWithoutPeriodInput>
    create: XOR<SectionCreateWithoutPeriodInput, SectionUncheckedCreateWithoutPeriodInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutPeriodInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutPeriodInput, SectionUncheckedUpdateWithoutPeriodInput>
  }

  export type SectionUpdateManyWithWhereWithoutPeriodInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutPeriodInput>
  }

  export type SectionScalarWhereInput = {
    AND?: SectionScalarWhereInput | SectionScalarWhereInput[]
    OR?: SectionScalarWhereInput[]
    NOT?: SectionScalarWhereInput | SectionScalarWhereInput[]
    id?: StringFilter<"Section"> | string
    name?: StringFilter<"Section"> | string
    capacity?: IntNullableFilter<"Section"> | number | null
    isActive?: BoolFilter<"Section"> | boolean
    createdAt?: DateTimeFilter<"Section"> | Date | string
    updatedAt?: DateTimeFilter<"Section"> | Date | string
    classroomId?: StringFilter<"Section"> | string
    turnId?: StringFilter<"Section"> | string
    periodId?: StringFilter<"Section"> | string
  }

  export type SectionCreateWithoutTurnInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutSectionsInput
    period: AcademicPeriodCreateNestedOneWithoutSectionsInput
    enrollments?: EnrollmentCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutTurnInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    periodId: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutTurnInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput>
  }

  export type SectionCreateManyTurnInputEnvelope = {
    data: SectionCreateManyTurnInput | SectionCreateManyTurnInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithWhereUniqueWithoutTurnInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutTurnInput, SectionUncheckedUpdateWithoutTurnInput>
    create: XOR<SectionCreateWithoutTurnInput, SectionUncheckedCreateWithoutTurnInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutTurnInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutTurnInput, SectionUncheckedUpdateWithoutTurnInput>
  }

  export type SectionUpdateManyWithWhereWithoutTurnInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutTurnInput>
  }

  export type SedeCreateWithoutClassroomsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutSedeInput
  }

  export type SedeUncheckedCreateWithoutClassroomsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutSedeInput
  }

  export type SedeCreateOrConnectWithoutClassroomsInput = {
    where: SedeWhereUniqueInput
    create: XOR<SedeCreateWithoutClassroomsInput, SedeUncheckedCreateWithoutClassroomsInput>
  }

  export type SectionCreateWithoutClassroomInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    turn: TurnCreateNestedOneWithoutSectionsInput
    period: AcademicPeriodCreateNestedOneWithoutSectionsInput
    enrollments?: EnrollmentCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutClassroomInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    turnId: string
    periodId: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutSectionInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutClassroomInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput>
  }

  export type SectionCreateManyClassroomInputEnvelope = {
    data: SectionCreateManyClassroomInput | SectionCreateManyClassroomInput[]
    skipDuplicates?: boolean
  }

  export type SedeUpsertWithoutClassroomsInput = {
    update: XOR<SedeUpdateWithoutClassroomsInput, SedeUncheckedUpdateWithoutClassroomsInput>
    create: XOR<SedeCreateWithoutClassroomsInput, SedeUncheckedCreateWithoutClassroomsInput>
    where?: SedeWhereInput
  }

  export type SedeUpdateToOneWithWhereWithoutClassroomsInput = {
    where?: SedeWhereInput
    data: XOR<SedeUpdateWithoutClassroomsInput, SedeUncheckedUpdateWithoutClassroomsInput>
  }

  export type SedeUpdateWithoutClassroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutSedeNestedInput
  }

  export type SedeUncheckedUpdateWithoutClassroomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutSedeNestedInput
  }

  export type SectionUpsertWithWhereUniqueWithoutClassroomInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutClassroomInput, SectionUncheckedUpdateWithoutClassroomInput>
    create: XOR<SectionCreateWithoutClassroomInput, SectionUncheckedCreateWithoutClassroomInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutClassroomInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutClassroomInput, SectionUncheckedUpdateWithoutClassroomInput>
  }

  export type SectionUpdateManyWithWhereWithoutClassroomInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutClassroomInput>
  }

  export type ClassroomCreateWithoutSectionsInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sede: SedeCreateNestedOneWithoutClassroomsInput
  }

  export type ClassroomUncheckedCreateWithoutSectionsInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sedeId: string
  }

  export type ClassroomCreateOrConnectWithoutSectionsInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutSectionsInput, ClassroomUncheckedCreateWithoutSectionsInput>
  }

  export type TurnCreateWithoutSectionsInput = {
    id?: string
    name: string
    startTime?: string | null
    endTime?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TurnUncheckedCreateWithoutSectionsInput = {
    id?: string
    name: string
    startTime?: string | null
    endTime?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TurnCreateOrConnectWithoutSectionsInput = {
    where: TurnWhereUniqueInput
    create: XOR<TurnCreateWithoutSectionsInput, TurnUncheckedCreateWithoutSectionsInput>
  }

  export type AcademicPeriodCreateWithoutSectionsInput = {
    id?: string
    name: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.PeriodStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicPeriodUncheckedCreateWithoutSectionsInput = {
    id?: string
    name: string
    startDate: Date | string
    endDate: Date | string
    status?: $Enums.PeriodStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AcademicPeriodCreateOrConnectWithoutSectionsInput = {
    where: AcademicPeriodWhereUniqueInput
    create: XOR<AcademicPeriodCreateWithoutSectionsInput, AcademicPeriodUncheckedCreateWithoutSectionsInput>
  }

  export type EnrollmentCreateWithoutSectionInput = {
    id?: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutSectionInput = {
    id?: string
    studentId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutSectionInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput>
  }

  export type EnrollmentCreateManySectionInputEnvelope = {
    data: EnrollmentCreateManySectionInput | EnrollmentCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type SectionCourseCreateWithoutSectionInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutSectionCoursesInput
    teacher: UserCreateNestedOneWithoutSectionCoursesInput
  }

  export type SectionCourseUncheckedCreateWithoutSectionInput = {
    id?: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateOrConnectWithoutSectionInput = {
    where: SectionCourseWhereUniqueInput
    create: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput>
  }

  export type SectionCourseCreateManySectionInputEnvelope = {
    data: SectionCourseCreateManySectionInput | SectionCourseCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type ClassroomUpsertWithoutSectionsInput = {
    update: XOR<ClassroomUpdateWithoutSectionsInput, ClassroomUncheckedUpdateWithoutSectionsInput>
    create: XOR<ClassroomCreateWithoutSectionsInput, ClassroomUncheckedCreateWithoutSectionsInput>
    where?: ClassroomWhereInput
  }

  export type ClassroomUpdateToOneWithWhereWithoutSectionsInput = {
    where?: ClassroomWhereInput
    data: XOR<ClassroomUpdateWithoutSectionsInput, ClassroomUncheckedUpdateWithoutSectionsInput>
  }

  export type ClassroomUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: SedeUpdateOneRequiredWithoutClassroomsNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sedeId?: StringFieldUpdateOperationsInput | string
  }

  export type TurnUpsertWithoutSectionsInput = {
    update: XOR<TurnUpdateWithoutSectionsInput, TurnUncheckedUpdateWithoutSectionsInput>
    create: XOR<TurnCreateWithoutSectionsInput, TurnUncheckedCreateWithoutSectionsInput>
    where?: TurnWhereInput
  }

  export type TurnUpdateToOneWithWhereWithoutSectionsInput = {
    where?: TurnWhereInput
    data: XOR<TurnUpdateWithoutSectionsInput, TurnUncheckedUpdateWithoutSectionsInput>
  }

  export type TurnUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TurnUncheckedUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startTime?: NullableStringFieldUpdateOperationsInput | string | null
    endTime?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodUpsertWithoutSectionsInput = {
    update: XOR<AcademicPeriodUpdateWithoutSectionsInput, AcademicPeriodUncheckedUpdateWithoutSectionsInput>
    create: XOR<AcademicPeriodCreateWithoutSectionsInput, AcademicPeriodUncheckedCreateWithoutSectionsInput>
    where?: AcademicPeriodWhereInput
  }

  export type AcademicPeriodUpdateToOneWithWhereWithoutSectionsInput = {
    where?: AcademicPeriodWhereInput
    data: XOR<AcademicPeriodUpdateWithoutSectionsInput, AcademicPeriodUncheckedUpdateWithoutSectionsInput>
  }

  export type AcademicPeriodUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AcademicPeriodUncheckedUpdateWithoutSectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPeriodStatusFieldUpdateOperationsInput | $Enums.PeriodStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutSectionInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutSectionInput, EnrollmentUncheckedUpdateWithoutSectionInput>
    create: XOR<EnrollmentCreateWithoutSectionInput, EnrollmentUncheckedCreateWithoutSectionInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutSectionInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutSectionInput, EnrollmentUncheckedUpdateWithoutSectionInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutSectionInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutSectionInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: StringFilter<"Enrollment"> | string
    studentId?: StringFilter<"Enrollment"> | string
    sectionId?: StringFilter<"Enrollment"> | string
    status?: EnumEnrollmentStatusFilter<"Enrollment"> | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFilter<"Enrollment"> | Date | string
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    updatedAt?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type SectionCourseUpsertWithWhereUniqueWithoutSectionInput = {
    where: SectionCourseWhereUniqueInput
    update: XOR<SectionCourseUpdateWithoutSectionInput, SectionCourseUncheckedUpdateWithoutSectionInput>
    create: XOR<SectionCourseCreateWithoutSectionInput, SectionCourseUncheckedCreateWithoutSectionInput>
  }

  export type SectionCourseUpdateWithWhereUniqueWithoutSectionInput = {
    where: SectionCourseWhereUniqueInput
    data: XOR<SectionCourseUpdateWithoutSectionInput, SectionCourseUncheckedUpdateWithoutSectionInput>
  }

  export type SectionCourseUpdateManyWithWhereWithoutSectionInput = {
    where: SectionCourseScalarWhereInput
    data: XOR<SectionCourseUpdateManyMutationInput, SectionCourseUncheckedUpdateManyWithoutSectionInput>
  }

  export type SectionCourseScalarWhereInput = {
    AND?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
    OR?: SectionCourseScalarWhereInput[]
    NOT?: SectionCourseScalarWhereInput | SectionCourseScalarWhereInput[]
    id?: StringFilter<"SectionCourse"> | string
    sectionId?: StringFilter<"SectionCourse"> | string
    courseId?: StringFilter<"SectionCourse"> | string
    teacherId?: StringFilter<"SectionCourse"> | string
    isActive?: BoolFilter<"SectionCourse"> | boolean
    createdAt?: DateTimeFilter<"SectionCourse"> | Date | string
    updatedAt?: DateTimeFilter<"SectionCourse"> | Date | string
  }

  export type CourseTeacherCreateWithoutCourseInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher: UserCreateNestedOneWithoutCourseTeachersInput
  }

  export type CourseTeacherUncheckedCreateWithoutCourseInput = {
    id?: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTeacherCreateOrConnectWithoutCourseInput = {
    where: CourseTeacherWhereUniqueInput
    create: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput>
  }

  export type CourseTeacherCreateManyCourseInputEnvelope = {
    data: CourseTeacherCreateManyCourseInput | CourseTeacherCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type SectionCourseCreateWithoutCourseInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutSectionCoursesInput
    teacher: UserCreateNestedOneWithoutSectionCoursesInput
  }

  export type SectionCourseUncheckedCreateWithoutCourseInput = {
    id?: string
    sectionId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateOrConnectWithoutCourseInput = {
    where: SectionCourseWhereUniqueInput
    create: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput>
  }

  export type SectionCourseCreateManyCourseInputEnvelope = {
    data: SectionCourseCreateManyCourseInput | SectionCourseCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type CourseTeacherUpsertWithWhereUniqueWithoutCourseInput = {
    where: CourseTeacherWhereUniqueInput
    update: XOR<CourseTeacherUpdateWithoutCourseInput, CourseTeacherUncheckedUpdateWithoutCourseInput>
    create: XOR<CourseTeacherCreateWithoutCourseInput, CourseTeacherUncheckedCreateWithoutCourseInput>
  }

  export type CourseTeacherUpdateWithWhereUniqueWithoutCourseInput = {
    where: CourseTeacherWhereUniqueInput
    data: XOR<CourseTeacherUpdateWithoutCourseInput, CourseTeacherUncheckedUpdateWithoutCourseInput>
  }

  export type CourseTeacherUpdateManyWithWhereWithoutCourseInput = {
    where: CourseTeacherScalarWhereInput
    data: XOR<CourseTeacherUpdateManyMutationInput, CourseTeacherUncheckedUpdateManyWithoutCourseInput>
  }

  export type CourseTeacherScalarWhereInput = {
    AND?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
    OR?: CourseTeacherScalarWhereInput[]
    NOT?: CourseTeacherScalarWhereInput | CourseTeacherScalarWhereInput[]
    id?: StringFilter<"CourseTeacher"> | string
    courseId?: StringFilter<"CourseTeacher"> | string
    teacherId?: StringFilter<"CourseTeacher"> | string
    isActive?: BoolFilter<"CourseTeacher"> | boolean
    createdAt?: DateTimeFilter<"CourseTeacher"> | Date | string
    updatedAt?: DateTimeFilter<"CourseTeacher"> | Date | string
  }

  export type SectionCourseUpsertWithWhereUniqueWithoutCourseInput = {
    where: SectionCourseWhereUniqueInput
    update: XOR<SectionCourseUpdateWithoutCourseInput, SectionCourseUncheckedUpdateWithoutCourseInput>
    create: XOR<SectionCourseCreateWithoutCourseInput, SectionCourseUncheckedCreateWithoutCourseInput>
  }

  export type SectionCourseUpdateWithWhereUniqueWithoutCourseInput = {
    where: SectionCourseWhereUniqueInput
    data: XOR<SectionCourseUpdateWithoutCourseInput, SectionCourseUncheckedUpdateWithoutCourseInput>
  }

  export type SectionCourseUpdateManyWithWhereWithoutCourseInput = {
    where: SectionCourseScalarWhereInput
    data: XOR<SectionCourseUpdateManyMutationInput, SectionCourseUncheckedUpdateManyWithoutCourseInput>
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    documentType?: string | null
    documentNumber?: string | null
    phone?: string | null
    birthDate?: Date | string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    documentType?: string | null
    documentNumber?: string | null
    phone?: string | null
    birthDate?: Date | string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type MembershipCreateWithoutUserInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sede?: SedeCreateNestedOneWithoutMembershipsInput
  }

  export type MembershipUncheckedCreateWithoutUserInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sedeId?: string | null
  }

  export type MembershipCreateOrConnectWithoutUserInput = {
    where: MembershipWhereUniqueInput
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipCreateManyUserInputEnvelope = {
    data: MembershipCreateManyUserInput | MembershipCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CourseTeacherCreateWithoutTeacherInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    course: CourseCreateNestedOneWithoutCourseTeachersInput
  }

  export type CourseTeacherUncheckedCreateWithoutTeacherInput = {
    id?: string
    courseId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTeacherCreateOrConnectWithoutTeacherInput = {
    where: CourseTeacherWhereUniqueInput
    create: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput>
  }

  export type CourseTeacherCreateManyTeacherInputEnvelope = {
    data: CourseTeacherCreateManyTeacherInput | CourseTeacherCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type SectionCourseCreateWithoutTeacherInput = {
    id?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutSectionCoursesInput
    course: CourseCreateNestedOneWithoutSectionCoursesInput
  }

  export type SectionCourseUncheckedCreateWithoutTeacherInput = {
    id?: string
    sectionId: string
    courseId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateOrConnectWithoutTeacherInput = {
    where: SectionCourseWhereUniqueInput
    create: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput>
  }

  export type SectionCourseCreateManyTeacherInputEnvelope = {
    data: SectionCourseCreateManyTeacherInput | SectionCourseCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentCreateWithoutStudentInput = {
    id?: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    section: SectionCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: string
    sectionId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ParentStudentCreateWithoutParentInput = {
    id?: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    student: UserCreateNestedOneWithoutStudentOfInput
  }

  export type ParentStudentUncheckedCreateWithoutParentInput = {
    id?: string
    studentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentCreateOrConnectWithoutParentInput = {
    where: ParentStudentWhereUniqueInput
    create: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput>
  }

  export type ParentStudentCreateManyParentInputEnvelope = {
    data: ParentStudentCreateManyParentInput | ParentStudentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ParentStudentCreateWithoutStudentInput = {
    id?: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent: UserCreateNestedOneWithoutParentOfInput
  }

  export type ParentStudentUncheckedCreateWithoutStudentInput = {
    id?: string
    parentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentCreateOrConnectWithoutStudentInput = {
    where: ParentStudentWhereUniqueInput
    create: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput>
  }

  export type ParentStudentCreateManyStudentInputEnvelope = {
    data: ParentStudentCreateManyStudentInput | ParentStudentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUpsertWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    update: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
    create: XOR<MembershipCreateWithoutUserInput, MembershipUncheckedCreateWithoutUserInput>
  }

  export type MembershipUpdateWithWhereUniqueWithoutUserInput = {
    where: MembershipWhereUniqueInput
    data: XOR<MembershipUpdateWithoutUserInput, MembershipUncheckedUpdateWithoutUserInput>
  }

  export type MembershipUpdateManyWithWhereWithoutUserInput = {
    where: MembershipScalarWhereInput
    data: XOR<MembershipUpdateManyMutationInput, MembershipUncheckedUpdateManyWithoutUserInput>
  }

  export type CourseTeacherUpsertWithWhereUniqueWithoutTeacherInput = {
    where: CourseTeacherWhereUniqueInput
    update: XOR<CourseTeacherUpdateWithoutTeacherInput, CourseTeacherUncheckedUpdateWithoutTeacherInput>
    create: XOR<CourseTeacherCreateWithoutTeacherInput, CourseTeacherUncheckedCreateWithoutTeacherInput>
  }

  export type CourseTeacherUpdateWithWhereUniqueWithoutTeacherInput = {
    where: CourseTeacherWhereUniqueInput
    data: XOR<CourseTeacherUpdateWithoutTeacherInput, CourseTeacherUncheckedUpdateWithoutTeacherInput>
  }

  export type CourseTeacherUpdateManyWithWhereWithoutTeacherInput = {
    where: CourseTeacherScalarWhereInput
    data: XOR<CourseTeacherUpdateManyMutationInput, CourseTeacherUncheckedUpdateManyWithoutTeacherInput>
  }

  export type SectionCourseUpsertWithWhereUniqueWithoutTeacherInput = {
    where: SectionCourseWhereUniqueInput
    update: XOR<SectionCourseUpdateWithoutTeacherInput, SectionCourseUncheckedUpdateWithoutTeacherInput>
    create: XOR<SectionCourseCreateWithoutTeacherInput, SectionCourseUncheckedCreateWithoutTeacherInput>
  }

  export type SectionCourseUpdateWithWhereUniqueWithoutTeacherInput = {
    where: SectionCourseWhereUniqueInput
    data: XOR<SectionCourseUpdateWithoutTeacherInput, SectionCourseUncheckedUpdateWithoutTeacherInput>
  }

  export type SectionCourseUpdateManyWithWhereWithoutTeacherInput = {
    where: SectionCourseScalarWhereInput
    data: XOR<SectionCourseUpdateManyMutationInput, SectionCourseUncheckedUpdateManyWithoutTeacherInput>
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type ParentStudentUpsertWithWhereUniqueWithoutParentInput = {
    where: ParentStudentWhereUniqueInput
    update: XOR<ParentStudentUpdateWithoutParentInput, ParentStudentUncheckedUpdateWithoutParentInput>
    create: XOR<ParentStudentCreateWithoutParentInput, ParentStudentUncheckedCreateWithoutParentInput>
  }

  export type ParentStudentUpdateWithWhereUniqueWithoutParentInput = {
    where: ParentStudentWhereUniqueInput
    data: XOR<ParentStudentUpdateWithoutParentInput, ParentStudentUncheckedUpdateWithoutParentInput>
  }

  export type ParentStudentUpdateManyWithWhereWithoutParentInput = {
    where: ParentStudentScalarWhereInput
    data: XOR<ParentStudentUpdateManyMutationInput, ParentStudentUncheckedUpdateManyWithoutParentInput>
  }

  export type ParentStudentScalarWhereInput = {
    AND?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
    OR?: ParentStudentScalarWhereInput[]
    NOT?: ParentStudentScalarWhereInput | ParentStudentScalarWhereInput[]
    id?: StringFilter<"ParentStudent"> | string
    parentId?: StringFilter<"ParentStudent"> | string
    studentId?: StringFilter<"ParentStudent"> | string
    relationType?: EnumParentRelationTypeFilter<"ParentStudent"> | $Enums.ParentRelationType
    isPrimary?: BoolFilter<"ParentStudent"> | boolean
    createdAt?: DateTimeFilter<"ParentStudent"> | Date | string
    updatedAt?: DateTimeFilter<"ParentStudent"> | Date | string
  }

  export type ParentStudentUpsertWithWhereUniqueWithoutStudentInput = {
    where: ParentStudentWhereUniqueInput
    update: XOR<ParentStudentUpdateWithoutStudentInput, ParentStudentUncheckedUpdateWithoutStudentInput>
    create: XOR<ParentStudentCreateWithoutStudentInput, ParentStudentUncheckedCreateWithoutStudentInput>
  }

  export type ParentStudentUpdateWithWhereUniqueWithoutStudentInput = {
    where: ParentStudentWhereUniqueInput
    data: XOR<ParentStudentUpdateWithoutStudentInput, ParentStudentUncheckedUpdateWithoutStudentInput>
  }

  export type ParentStudentUpdateManyWithWhereWithoutStudentInput = {
    where: ParentStudentScalarWhereInput
    data: XOR<ParentStudentUpdateManyMutationInput, ParentStudentUncheckedUpdateManyWithoutStudentInput>
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateWithoutMembershipsInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutMembershipsInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
  }

  export type SedeCreateWithoutMembershipsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomCreateNestedManyWithoutSedeInput
  }

  export type SedeUncheckedCreateWithoutMembershipsInput = {
    id?: string
    name: string
    address?: string | null
    phone?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classrooms?: ClassroomUncheckedCreateNestedManyWithoutSedeInput
  }

  export type SedeCreateOrConnectWithoutMembershipsInput = {
    where: SedeWhereUniqueInput
    create: XOR<SedeCreateWithoutMembershipsInput, SedeUncheckedCreateWithoutMembershipsInput>
  }

  export type UserUpsertWithoutMembershipsInput = {
    update: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
    create: XOR<UserCreateWithoutMembershipsInput, UserUncheckedCreateWithoutMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMembershipsInput, UserUncheckedUpdateWithoutMembershipsInput>
  }

  export type UserUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type SedeUpsertWithoutMembershipsInput = {
    update: XOR<SedeUpdateWithoutMembershipsInput, SedeUncheckedUpdateWithoutMembershipsInput>
    create: XOR<SedeCreateWithoutMembershipsInput, SedeUncheckedCreateWithoutMembershipsInput>
    where?: SedeWhereInput
  }

  export type SedeUpdateToOneWithWhereWithoutMembershipsInput = {
    where?: SedeWhereInput
    data: XOR<SedeUpdateWithoutMembershipsInput, SedeUncheckedUpdateWithoutMembershipsInput>
  }

  export type SedeUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUpdateManyWithoutSedeNestedInput
  }

  export type SedeUncheckedUpdateWithoutMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classrooms?: ClassroomUncheckedUpdateManyWithoutSedeNestedInput
  }

  export type CourseCreateWithoutCourseTeachersInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionCourses?: SectionCourseCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutCourseTeachersInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutCourseTeachersInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutCourseTeachersInput, CourseUncheckedCreateWithoutCourseTeachersInput>
  }

  export type UserCreateWithoutCourseTeachersInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutCourseTeachersInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutCourseTeachersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCourseTeachersInput, UserUncheckedCreateWithoutCourseTeachersInput>
  }

  export type CourseUpsertWithoutCourseTeachersInput = {
    update: XOR<CourseUpdateWithoutCourseTeachersInput, CourseUncheckedUpdateWithoutCourseTeachersInput>
    create: XOR<CourseCreateWithoutCourseTeachersInput, CourseUncheckedCreateWithoutCourseTeachersInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutCourseTeachersInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutCourseTeachersInput, CourseUncheckedUpdateWithoutCourseTeachersInput>
  }

  export type CourseUpdateWithoutCourseTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionCourses?: SectionCourseUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutCourseTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserUpsertWithoutCourseTeachersInput = {
    update: XOR<UserUpdateWithoutCourseTeachersInput, UserUncheckedUpdateWithoutCourseTeachersInput>
    create: XOR<UserCreateWithoutCourseTeachersInput, UserUncheckedCreateWithoutCourseTeachersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCourseTeachersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCourseTeachersInput, UserUncheckedUpdateWithoutCourseTeachersInput>
  }

  export type UserUpdateWithoutCourseTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutCourseTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type SectionCreateWithoutSectionCoursesInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutSectionsInput
    turn: TurnCreateNestedOneWithoutSectionsInput
    period: AcademicPeriodCreateNestedOneWithoutSectionsInput
    enrollments?: EnrollmentCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutSectionCoursesInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
    periodId: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutSectionCoursesInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutSectionCoursesInput, SectionUncheckedCreateWithoutSectionCoursesInput>
  }

  export type CourseCreateWithoutSectionCoursesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    courseTeachers?: CourseTeacherCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutSectionCoursesInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSectionCoursesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSectionCoursesInput, CourseUncheckedCreateWithoutSectionCoursesInput>
  }

  export type UserCreateWithoutSectionCoursesInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutSectionCoursesInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutSectionCoursesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSectionCoursesInput, UserUncheckedCreateWithoutSectionCoursesInput>
  }

  export type SectionUpsertWithoutSectionCoursesInput = {
    update: XOR<SectionUpdateWithoutSectionCoursesInput, SectionUncheckedUpdateWithoutSectionCoursesInput>
    create: XOR<SectionCreateWithoutSectionCoursesInput, SectionUncheckedCreateWithoutSectionCoursesInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutSectionCoursesInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutSectionCoursesInput, SectionUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type SectionUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutSectionsNestedInput
    turn?: TurnUpdateOneRequiredWithoutSectionsNestedInput
    period?: AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput
    enrollments?: EnrollmentUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type CourseUpsertWithoutSectionCoursesInput = {
    update: XOR<CourseUpdateWithoutSectionCoursesInput, CourseUncheckedUpdateWithoutSectionCoursesInput>
    create: XOR<CourseCreateWithoutSectionCoursesInput, CourseUncheckedCreateWithoutSectionCoursesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutSectionCoursesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutSectionCoursesInput, CourseUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type CourseUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTeachers?: CourseTeacherUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type UserUpsertWithoutSectionCoursesInput = {
    update: XOR<UserUpdateWithoutSectionCoursesInput, UserUncheckedUpdateWithoutSectionCoursesInput>
    create: XOR<UserCreateWithoutSectionCoursesInput, UserUncheckedCreateWithoutSectionCoursesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSectionCoursesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSectionCoursesInput, UserUncheckedUpdateWithoutSectionCoursesInput>
  }

  export type UserUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutSectionCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateWithoutEnrollmentsInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
  }

  export type SectionCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutSectionsInput
    turn: TurnCreateNestedOneWithoutSectionsInput
    period: AcademicPeriodCreateNestedOneWithoutSectionsInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutEnrollmentsInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
    periodId: string
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutEnrollmentsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutEnrollmentsInput, SectionUncheckedCreateWithoutEnrollmentsInput>
  }

  export type UserUpsertWithoutEnrollmentsInput = {
    update: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<UserCreateWithoutEnrollmentsInput, UserUncheckedCreateWithoutEnrollmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnrollmentsInput, UserUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type UserUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type SectionUpsertWithoutEnrollmentsInput = {
    update: XOR<SectionUpdateWithoutEnrollmentsInput, SectionUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<SectionCreateWithoutEnrollmentsInput, SectionUncheckedCreateWithoutEnrollmentsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutEnrollmentsInput, SectionUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type SectionUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutSectionsNestedInput
    turn?: TurnUpdateOneRequiredWithoutSectionsNestedInput
    period?: AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutEnrollmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type UserCreateWithoutParentOfInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    studentOf?: ParentStudentCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutParentOfInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    studentOf?: ParentStudentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutParentOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParentOfInput, UserUncheckedCreateWithoutParentOfInput>
  }

  export type UserCreateWithoutStudentOfInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    memberships?: MembershipCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentCreateNestedManyWithoutParentInput
  }

  export type UserUncheckedCreateWithoutStudentOfInput = {
    id?: string
    email: string
    passwordHash: string
    isActive?: boolean
    lastLoginAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    memberships?: MembershipUncheckedCreateNestedManyWithoutUserInput
    courseTeachers?: CourseTeacherUncheckedCreateNestedManyWithoutTeacherInput
    sectionCourses?: SectionCourseUncheckedCreateNestedManyWithoutTeacherInput
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
    parentOf?: ParentStudentUncheckedCreateNestedManyWithoutParentInput
  }

  export type UserCreateOrConnectWithoutStudentOfInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentOfInput, UserUncheckedCreateWithoutStudentOfInput>
  }

  export type UserUpsertWithoutParentOfInput = {
    update: XOR<UserUpdateWithoutParentOfInput, UserUncheckedUpdateWithoutParentOfInput>
    create: XOR<UserCreateWithoutParentOfInput, UserUncheckedCreateWithoutParentOfInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParentOfInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParentOfInput, UserUncheckedUpdateWithoutParentOfInput>
  }

  export type UserUpdateWithoutParentOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    studentOf?: ParentStudentUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutParentOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    studentOf?: ParentStudentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserUpsertWithoutStudentOfInput = {
    update: XOR<UserUpdateWithoutStudentOfInput, UserUncheckedUpdateWithoutStudentOfInput>
    create: XOR<UserCreateWithoutStudentOfInput, UserUncheckedCreateWithoutStudentOfInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentOfInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentOfInput, UserUncheckedUpdateWithoutStudentOfInput>
  }

  export type UserUpdateWithoutStudentOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    memberships?: MembershipUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUpdateManyWithoutParentNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentOfInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    memberships?: MembershipUncheckedUpdateManyWithoutUserNestedInput
    courseTeachers?: CourseTeacherUncheckedUpdateManyWithoutTeacherNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutTeacherNestedInput
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
    parentOf?: ParentStudentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ClassroomCreateManySedeInput = {
    id?: string
    name: string
    location?: string | null
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipCreateManySedeInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ClassroomUpdateWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sections?: SectionUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateManyWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipUpdateWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type MembershipUncheckedUpdateManyWithoutSedeInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyPeriodInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    turnId: string
  }

  export type SectionUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutSectionsNestedInput
    turn?: TurnUpdateOneRequiredWithoutSectionsNestedInput
    enrollments?: EnrollmentUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutPeriodInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    turnId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyTurnInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    classroomId: string
    periodId: string
  }

  export type SectionUpdateWithoutTurnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutSectionsNestedInput
    period?: AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput
    enrollments?: EnrollmentUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutTurnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutTurnInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroomId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateManyClassroomInput = {
    id?: string
    name: string
    capacity?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    turnId: string
    periodId: string
  }

  export type SectionUpdateWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    turn?: TurnUpdateOneRequiredWithoutSectionsNestedInput
    period?: AcademicPeriodUpdateOneRequiredWithoutSectionsNestedInput
    enrollments?: EnrollmentUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutSectionNestedInput
    sectionCourses?: SectionCourseUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutClassroomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    turnId?: StringFieldUpdateOperationsInput | string
    periodId?: StringFieldUpdateOperationsInput | string
  }

  export type EnrollmentCreateManySectionInput = {
    id?: string
    studentId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateManySectionInput = {
    id?: string
    courseId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutSectionCoursesNestedInput
    teacher?: UserUpdateOneRequiredWithoutSectionCoursesNestedInput
  }

  export type SectionCourseUncheckedUpdateWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUncheckedUpdateManyWithoutSectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTeacherCreateManyCourseInput = {
    id?: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateManyCourseInput = {
    id?: string
    sectionId: string
    teacherId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseTeacherUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: UserUpdateOneRequiredWithoutCourseTeachersNestedInput
  }

  export type CourseTeacherUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTeacherUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutSectionCoursesNestedInput
    teacher?: UserUpdateOneRequiredWithoutSectionCoursesNestedInput
  }

  export type SectionCourseUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    teacherId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MembershipCreateManyUserInput = {
    id?: string
    role: $Enums.Role
    status?: $Enums.MembershipStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    sedeId?: string | null
  }

  export type CourseTeacherCreateManyTeacherInput = {
    id?: string
    courseId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SectionCourseCreateManyTeacherInput = {
    id?: string
    sectionId: string
    courseId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: string
    sectionId: string
    status?: $Enums.EnrollmentStatus
    enrolledAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentCreateManyParentInput = {
    id?: string
    studentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentStudentCreateManyStudentInput = {
    id?: string
    parentId: string
    relationType?: $Enums.ParentRelationType
    isPrimary?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MembershipUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sede?: SedeUpdateOneWithoutMembershipsNestedInput
  }

  export type MembershipUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sedeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MembershipUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    status?: EnumMembershipStatusFieldUpdateOperationsInput | $Enums.MembershipStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sedeId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CourseTeacherUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutCourseTeachersNestedInput
  }

  export type CourseTeacherUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseTeacherUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutSectionCoursesNestedInput
    course?: CourseUpdateOneRequiredWithoutSectionCoursesNestedInput
  }

  export type SectionCourseUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionCourseUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    section?: SectionUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionId?: StringFieldUpdateOperationsInput | string
    status?: EnumEnrollmentStatusFieldUpdateOperationsInput | $Enums.EnrollmentStatus
    enrolledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: UserUpdateOneRequiredWithoutStudentOfNestedInput
  }

  export type ParentStudentUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: UserUpdateOneRequiredWithoutParentOfNestedInput
  }

  export type ParentStudentUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentStudentUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentId?: StringFieldUpdateOperationsInput | string
    relationType?: EnumParentRelationTypeFieldUpdateOperationsInput | $Enums.ParentRelationType
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}