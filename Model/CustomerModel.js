export class CustomerModel{
    constructor(id,name,gender,joinDate,level,dob,address1,address2,contact,mail) {
        this.customerCode = id;
        this.customerName =name;
        this.customerGender = gender;
        this.customerJoinDate = joinDate;
        this.level = level;
        this.birthDay = dob;
        this.addressLine1 = address1;
        this.addressLine2 = address2;
        this.contactNumber = contact;
        this.email = mail;

    }
}