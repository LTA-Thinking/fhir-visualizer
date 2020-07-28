function GetFhirSchema(successFunc, errorFunc){
    $.ajax('http://hl7.org/fhir/R4/fhir.schema.json', {
        type: 'GET',
        success: (schema) => successFunc(schema),
        error: (err) => errorFunc(err),
    });
}

