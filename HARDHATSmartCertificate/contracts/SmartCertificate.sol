// SPDX-License-Identifier: MIT
pragma solidity  0.8.28;
 contract Certi {
    struct CertificateDetails{
        uint256 id;
        string name;
        string course;
        string grade;
        string date;
    }
    address admin;
    constructor() {admin = msg.sender;
    }
     modifier Adminonly{
        require(msg.sender==admin,"Only admin have acess");
        _;
     }

    mapping (uint256 => CertificateDetails) public Certificate;

function Issue(uint256 _id,
               string memory _name,
               string memory _course,
               string memory _grade,
               string memory _date) public Adminonly{
                Certificate[_id]=CertificateDetails(_id,_name,_course,_grade,_date);
}
 }