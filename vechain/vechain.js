function myFunc(){

    if(vendor) {
        vendor.sign("cert", {
            purpose: "identification",
            payload: {
                type: "text",
                content: "Connect wallet to login"
            }
            }).request(); 


    }

}