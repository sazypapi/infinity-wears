import { customOrderType } from "./CustomOrdersContainer";

function CustomOrderDetails({ customOrder }: { customOrder: customOrderType }) {
  return (
    <div className="mt-5">
      <p className="text-left text-black text-[10px] mb-2 border-b-2 border-black w-fit">
        Order Details
      </p>
      {/* {IMAGES} */}
      <div className="mb-3">
        <p className="text-neutral-400 sm:text-xs text-[10px]">
          Sample Image{customOrder.sampleImages.length > 1 && "s"}
        </p>
        <div className="grid sm:grid-cols-5 grid-cols-3 gap-3">
          {customOrder.sampleImages.map((image) => (
            <img
              key={image}
              src={image}
              alt="Preview"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border"
            />
          ))}
        </div>
      </div>
      {/* {DESCRIPTION} */}
      <div>
        <p className="text-neutral-400 sm:text-xs text-[10px]">Description</p>
        <p className="text-black text-xs sm:text-sm">
          {customOrder.description}
        </p>
      </div>
      {customOrder.adminNote && (
        <div className="mt-5 border-t-2 border-neutral-200">
          <p className="text-neutral-400 sm:text-xs text-[10px]">
            Note about your order
          </p>
          <p className="text-black text-xs sm:text-sm">
            {customOrder.adminNote}
          </p>
        </div>
      )}
    </div>
  );
}

export default CustomOrderDetails;
