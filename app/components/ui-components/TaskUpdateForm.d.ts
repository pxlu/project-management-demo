import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Task } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskUpdateFormInputValues = {
    title?: string;
    description?: string;
    dueDate?: string;
    priority?: string;
    status?: string;
    owners?: string[];
};
export declare type TaskUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    dueDate?: ValidationFunction<string>;
    priority?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    owners?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskUpdateFormOverridesProps = {
    TaskUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    dueDate?: PrimitiveOverrideProps<TextFieldProps>;
    priority?: PrimitiveOverrideProps<SelectFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    owners?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TaskUpdateFormProps = React.PropsWithChildren<{
    overrides?: TaskUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    task?: Task;
    onSubmit?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onSuccess?: (fields: TaskUpdateFormInputValues) => void;
    onError?: (fields: TaskUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onValidate?: TaskUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TaskUpdateForm(props: TaskUpdateFormProps): React.ReactElement;
