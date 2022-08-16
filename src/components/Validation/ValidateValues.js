export const customerValidation = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!regex.test(values.email)) {
      errors.email = "Email is not valid!";
    }
    if (!values.oib) {
      errors.oib = "OIB is required!";
    } else if (values.oib.length < 11) {
      errors.oib = "OIB is too short!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.postalCode) {
      errors.postalCode = "Postal code is required!";
    } else if (values.postalCode.length < 5) {
      errors.postalCode = "Postal code is too short!";
    }
    if (!values.country) {
      errors.country = "Country is required!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required!";
    }

    return errors;
  };

  export const outputInvoiceValidation = (values) => {
    const errors = {};

    if (!values.serviceModel) {
      errors.serviceModel = "Service is required!";
    }
    if (!values.invoiceType) {
      errors.invoiceType = "Invoice type is required!";
    }
    if (!values.customer) {
      errors.customer = "Customer is required!";
    }
    if (!values.invoiceNumber) {
      errors.invoiceNumber = "Invoice number is required!";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Payment method is required!";
    }
    // if (!values.deliveryDate) {
    //   errors.deliveryDate = "Delivery date is required!";
    // }
    

    return errors;
  };

  export const invoiceServiceDetailsValidation = (values) => {
    const errors = {};
    
    values.map(value => {
      if (!value.measureUnit) {
        errors.measureUnit = "Measure unit is required!";
      }
      if (!value.amount) {
        errors.amount = "Amount is required!";
      }else if(value.amount <= 0){
        errors.priamountce = "Amount must be greater than 0";
      }
      if (!value.price) {
        errors.price = "Price is required!";
      }else if(value.price <= 0){
        errors.price = "Price must be greater than 0";
      }
      // if (!value.discount) {
      //   errors.discount = "Discount is required!";
      // }
      // if (!value.taxRate) {
      //   errors.taxRate = "Tax rate is required!";
      // }else if(value.taxRate  <= 0){
      //   errors.taxRate = "Tax rate must be greater than 0";
      // }
      // if (!value.serviceDescription) {
      //   errors.serviceDescription = "Service description is required!";
      // }
    })

    return errors;
  };

  export const servicesValidation = (values) => {
    const errors = {};
    
    if (!values.serviceName) {
      errors.serviceName = "Service name is required!";
    }
    if (values.serviceNumber <= 0) {
      errors.serviceNumber = "Service number is required!";
    }else if(values.serviceNumber === 0){
      errors.serviceNumber = "Service number be greater than 0";
    }

    return errors;
  };

  export const inputInvoiceValidation = (values) => {
    const errors = {};
    
    if (!values.issuer) {
      errors.issuer = "Ovo polje je obavezno!";
    }
    if (values.oib.length < 11 || values.oib.length > 11) {
      errors.oib = "OIB treba sadržavati 11 znamenki";
    }
    if(!values.city){
      errors.city = "Mjesto je obavezno polje";
    }
    if(!values.streetAddress){
      errors.streetAddress = "Adresa je obavezno polje";
    }
    if(!values.streetNumber){
      errors.streetNumber = "Kućni broj je obavezan";
    }
    if(!values.postalCode){
      errors.postalCode = "Poštanski broj je obavezan";
    }else if(values.postalCode.length < 5 || values.postalCode.length > 5){
      errors.postalCode = "Poštanski mora sadržavati 5 znakova";
    }
    if(!values.description){
      errors.description = "Opis (svrha) plaćanja je obavezan";
    }
    if(!values.price){
      errors.price = "Iznos računa je obavezan";
    }
    if(!values.paymentMethod){
      errors.paymentMethod = "Način plaćanja je obavezno polje";
    }

    return errors;
  };

  export const offerValidation = (values) => {
    const errors = {};

    if (!values.serviceModel) {
      errors.serviceModel = "Odaberite uslugu";
    }
    if (!values.customer) {
      errors.customer = "Odaberite kupca";
    }
    if (!values.offerNumber) {
      errors.offerNumber = "Unesite broj ponude";
    }
    if (!values.paymentMethod) {
      errors.paymentMethod = "Način plaćanja je potreban";
    }
    if (!values.offerDate) {
      errors.offerDate = "Unesite datum ponude";
    }
    if (!values.paymentDate) {
      errors.paymentDate = "Unesite datum plaćanja";
    }
    

    return errors;
  };