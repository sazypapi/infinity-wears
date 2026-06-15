import React from "react";
import FormContainer from "../form/FormContainer";
import { sendContactForm } from "../../utils/actions";
import FormInput from "../form/FormInput";
import TextArea from "../form/TextArea";
import { SubmitButton } from "../form/Buttons";

function ContactForm() {
  return (
    <div>
      <FormContainer action={sendContactForm}>
        <FormInput
          type="text"
          name="name"
          label="Name"
          required
          placeholder="Name"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-10 mt-3">
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Email(abc@email.com)"
            required
          />
          <FormInput
            name="phoneNumber"
            type="text"
            label="Phone Number"
            required
            placeholder="Phone(01234567891)"
          />
        </div>
        <TextArea
          name="message"
          labelText="Message"
          placeholder="5-100 words"
          className="mt-3"
        />
        <div className="flex justify-end mt-5">
          <SubmitButton
            className="bg-white text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
            loadingText="Submitting..."
            text="Submit Message"
          />
        </div>
      </FormContainer>
    </div>
  );
}

export default ContactForm;
