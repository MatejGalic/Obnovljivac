import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Array<infer U extends Record<string, any>>
    ? FormArray<FormGroup<ControlsOf<U>>>
    : T[K] extends Array<infer U>
    ? FormArray<FormControl<U>>
    : T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
