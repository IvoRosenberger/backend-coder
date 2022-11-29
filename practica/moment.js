const moment = require ('moment');

const actualDate = moment();

const birthDate= moment ('1998-07-21');

if (birthDate.isValid(birthDate)){
    console.log("fecha correcta");
    const days = actualDate.diff(birthDate,'days');
    console.log(days);
} else{
    console.log("fecha inc");
}