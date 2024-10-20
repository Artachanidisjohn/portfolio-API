const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';

//ΒΑΖΩ ΕΔΩ ΤΑ FILES ΑΠΟ ΤΑ ROUTES ΑΠΟ ΟΠΟΥ ΘΕΛΩ ΝΑ ΔΗΜΙΟΥΡΓΗΣΕΙ ΤΟ JSON
const endpointsFiles = ['../routes/recordRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    console.log('Swagger documentation generated');
});
