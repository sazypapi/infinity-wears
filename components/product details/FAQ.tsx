import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productFAQ } from "../../utils/faq";
function FAQ() {
  return (
    <div className="w-full mt-15">
      <h2 className="text-neutral-600 text-xl sm:text-3xl mb-5 text-center">
        FAQ
      </h2>
      <Accordion type="single" collapsible>
        {productFAQ.map((faq, index) => {
          return (
            <AccordionItem
              value={index.toString()}
              key={index}
              className=" px-4 "
            >
              <AccordionTrigger className="text-black sm:text-lg text-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default FAQ;
