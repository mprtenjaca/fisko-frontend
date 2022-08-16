export const invoiceTypes = [
    { value: "R" },
    { value: "R1" },
    { value: "R2" },
    { value: "AVANSNI" },
    { value: "OSTALO" },
];

export const measureUnits = [
    { value: "KOM" },
    { value: "SAT" },
    { value: "GOD" },
    { value: "KM" },
    { value: "LIT" },
    { value: "KG" },
    { value: "KWH" },
    { value: "M" },
    { value: "M2" },
    { value: "M3" },
    { value: "T" },
    { value: "G" },
    { value: "DAN" },
    { value: "MJ" },
    { value: "NOĆ" },
    { value: "PAR" },
    { value: "SOBA" },
];

export const paymentMethods = [
    { value: "GOTOVINA" },
    { value: "KARTICA" },
    { value: "ČEK" },
    { value: "OSTALO" },
];


export const handleFinalPriceValue = (list, index) => {

    let finalPrice = 0;
    let editedObject = list[index];

    if (editedObject.price) {
        if (editedObject.taxRate > 0) {
          let tax = (editedObject.taxRate / 100) * editedObject.price;
          finalPrice = editedObject.price + tax;
        }
  
        if (editedObject.taxRate > 0 && editedObject.discount > 0) {
          let disc = (editedObject.discount / 100) * finalPrice;
          finalPrice = finalPrice - disc;
        }
  
        if (
          (!editedObject.taxRate || editedObject.taxRate <= 0) &&
          editedObject.discount > 0
        ) {
          let disc = (editedObject.discount / 100) * editedObject.price;
          finalPrice = editedObject.price - disc;
        }
  
        if (
          (!editedObject.taxRate && !editedObject.discount) ||
          (editedObject.taxRate <= 0 && editedObject.discount <= 0)
        ) {
          finalPrice = editedObject.price;
        }
  
        if (!editedObject.taxRate) {
          editedObject.taxRate = "";
        }
        if (!editedObject.discount) {
          editedObject.discount = "";
        }
  
        if (editedObject.amount > 1) {
          finalPrice = finalPrice * editedObject.amount;
        }
      }

    return finalPrice;
}