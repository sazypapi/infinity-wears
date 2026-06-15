import React from "react";
import Header from "../../../components/contact/Header";
import ContactForm from "../../../components/contact/ContactForm";
import Containers from "../../../components/global/Containers";

function ContactPage() {
  return (
    <div>
      <Header />
      <Containers className=" py-5 sm:py-10">
        <ContactForm />
      </Containers>
    </div>
  );
}

export default ContactPage;
