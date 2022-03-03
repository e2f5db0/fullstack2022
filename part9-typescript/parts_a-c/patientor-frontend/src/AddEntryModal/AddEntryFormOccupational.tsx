import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { ExtendedEntry } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

/*
 * use type ExtendedEntry, but omit id,
 * because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<ExtendedEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryFormOccupational = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const formatError = "Malformatted date";
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
                            label="Employer"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label="Sickleave start"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.start"
                            component={TextField}
                        />
                        <Field
                            label="Sickleave end"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.end"
                            component={TextField}
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

export default AddEntryFormOccupational;
