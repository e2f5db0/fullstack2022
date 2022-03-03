import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { HealthCheckEntry } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

/*
 * use type ExtendedEntry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryFormHealthCheck = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const formatError = "Malformatted date";
                const numberError = "Value must be between 0-3";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                // regex for YYYY-MM-DD
                if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(values.date)) {
                    errors.date = formatError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                }
                if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
                    errors.healthCheckRating = numberError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Health check rating"
                            placeholder="0-3"
                            name="healthCheckRating"
                            component={NumberField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryFormHealthCheck;
