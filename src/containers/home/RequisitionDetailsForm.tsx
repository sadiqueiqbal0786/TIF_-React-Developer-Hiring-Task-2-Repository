import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Access state and setState from context

  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: state.requisitionDetails.requisitionTitle, // Get initial values from context
      noOfOpenings: state.requisitionDetails.noOfOpenings,
      urgency: state.requisitionDetails.urgency,
      gender: state.requisitionDetails.gender,
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      // Update context state with form values
      setState((prev) => ({
        ...prev,
        requisitionDetails: values,
      }));
      handleTab(1);
    },
  });
  const handleSelectChange = (field: string, value: any) => {
    setFieldValue(field, value);
    setState((prev) => ({
      ...prev,
      requisitionDetails: {
        ...prev.requisitionDetails,
        [field]: value,
      },
    }));
  };
  

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e) => {
            handleChange(e);
            setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                requisitionTitle: e.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e) => {
            handleChange(e);
            setState((prev) => ({
              ...prev,
              requisitionDetails: {
                ...prev.requisitionDetails,
                noOfOpenings: Number(e.target.value),
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <Box position="relative" zIndex={10}>
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(name, selectedValue) => handleSelectChange(name, selectedValue)}
          onBlur={() => setFieldTouched("gender")}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
          
         
        />
        </Box>
        <Box position="relative" zIndex={9}></Box>
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(name, selectedValue) => handleSelectChange(name, selectedValue)}
          onBlur={() => setFieldTouched("urgency")}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
         
        />
        <Box/>
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;