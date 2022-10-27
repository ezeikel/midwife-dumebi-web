import axios from "axios";
import clsx from "clsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { cssTransition, toast } from "react-toastify";
import Button from "../../Button/Button";
import TextInput from "../../form/formik/inputs/TextInput/TextInput";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceInLeft",
  exit: "animate__animated animate__slideOutRight",
});

const SubscribeSchema = Yup.object().shape({
  email: Yup.string()
    .email("That email doesn't look quite right")
    .required("Looks like your email is missing"),
});

type SubscribeFormProps = {
  className?: string;
};

const SubscribeForm = ({ className }: SubscribeFormProps) => (
  <Formik
    initialValues={{ email: "" }}
    validationSchema={SubscribeSchema}
    validateOnBlur={false}
    validateOnChange={false}
    onSubmit={async ({ email }, { resetForm }) => {
      try {
        // send to mailchimp
        await axios.post("/api/subscribe", { email });

        resetForm();

        // show success toast
        toast("You have succesfully subscribed.", { transition: bounce });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error({ error });
      }
    }}
  >
    {({ isSubmitting, handleSubmit }) => (
      <Form
        onSubmit={handleSubmit}
        className={clsx(
          "flex flex-col md:flex-row w-full gap-y-4 md:gap-x-4 md:gap-y-0",
          {
            [className as string]: !!className,
          },
        )}
      >
        <TextInput
          type="email"
          name="email"
          placeholder="hi@midwifedumebi.com"
          inputClasses="shadow shadow-[rgba(243,_205,_194,_0.5)]"
        />
        <Button
          text="Subscribe"
          type="submit"
          isLoading={isSubmitting}
          className="shadow shadow-[rgba(243,_205,_194,_0.5)] md:self-start"
        />
      </Form>
    )}
  </Formik>
);

export default SubscribeForm;
