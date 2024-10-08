import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";
import { stat } from "fs";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Access state and setState from context
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: state.jobDetails.jobTitle,
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
       // jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        setState((prev) => ({
          ...prev,
          jobDetails: values,
        }));
        handleTab(2);
      },
    });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e)=>{ handleChange(e);
            setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                jobTitle: e.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e)=>{ handleChange(e);
            setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                jobDetails: e.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e)=>{ handleChange(e);
            setState((prev) => ({
              ...prev,
              jobDetails: {
                ...prev.jobDetails,
                jobLocation: e.target.value,
              },
            }));
          }}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
