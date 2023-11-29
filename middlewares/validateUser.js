const validateUser = (req, res, next) => {

    const {firstname, lastname, email, city, language} = req.body;
    const errors = [];
    
    if(firstname == null) {
        errors.push({field: "firstname", message:"This field is required"});
    } else if(firstname >= 255) {
        errors.push({field: "firstname", message: "Should contain less than 255 characters"});
    }
    
    if(lastname == null) {
        errors.push({field: "lastname", message:"This field is required"});
    } else if(firstname >= 255) {
        errors.push({field: "lastname", message: "Should contain less than 255 characters"});
    }
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!emailRegex.test(email)) {
        errors.push({field: "email", message:"Invalid email"});
    } else if(email >= 255) {
        errors.push({field: "email", message: "Should contain less than 255 characters"});
    }

    if(city == null) {
        errors.push({field: "city", message:"This field is required"});
    } else if(city >= 255) {
        errors.push({field: "city", message: "Should contain less than 255 characters"});
    }

    if(language == null) {
        errors.push({field: "language", message:"This field is required"});
    } else if(language >= 255) {
        errors.push({field: "language", message: "Should contain less than 255 characters"});
    }

    if(errors.length) {
        res.status(422).json({validationErrors: errors});
    } else {
        next();
    }
};

module.exports = validateUser;