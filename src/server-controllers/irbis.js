const fs = require('fs');
const {
    readdir
} = require('fs/promises');
const path = require('path');
const convert = require('xml-js');


module.exports.appendData = (userData, type) => {

    return new Promise((resolve, reject) => {

        const string = `<?xml version="1.0" encoding="UTF-8"?>
<collection>
<record format="IRBIS">
<leader>#####nam##22########450 </leader>
<field tag="10">
${userData.surname}
</field>
<field tag="11">
${userData.name}
</field>
<field tag="12">
${userData.patronymic}
</field>
<field tag="13">
${userData.registrationAdress}
</field>
<field tag="15">
${userData.placeofwork}
</field>
<field tag="16">
${userData.position}
</field>
<field tag="20">
${userData.education.level}
</field>
<field tag="160">
${userData.speciality}
</field>
<field tag="28">
${userData.degree.degree}
</field>
<field tag="21">
${userData.birthdate}
</field>
<field tag="51">
${userData.dateOfReg}
    <subfield code="C">АБ2</subfield>
</field>
 <field tag="953">
    <subfield code="A">jpg</subfield>
    <subfield code="T">Фотография читателя</subfield>
    <subfield code="B">${userData.image}</subfield>
</field>
<field tag="32">
${userData.email}
</field>
<field tag="30">
${userData.libraryCardNumber}
</field>
<field tag="99">
${userData.phonenumber}
</field>
</record>
</collection>`;

        let path = type === "signup" ? `./src/irbis/to_add_to_Irbis/${userData.email}.xml` : `./src/irbis/to_add_to_Irbis/updates_from_Mongo/${userData.email}.xml`;

        fs.writeFile(path, string, 'utf8', (err) => {
            if (err) reject(err);
            console.log('The "data to append" was appended to file!');
            resolve();

        });

    });
}


module.exports.addDataToMongo = async (req, res, next) => {

    let irbisUsers = req.app.locals.usersFromIrbis;


    const directoryPath = './src/irbis/to_add_to_Mongo/';

    let errors = [];

    try {

        const files = await readdir(directoryPath);

        for (const file of files) {

            if (file === "add.html") continue

            let xml = fs.readFileSync(directoryPath + file, 'utf8');

            const options = {
                ignoreComment: true,
                trim: true,
                alwaysChildren: false,
                compact: true
            };

            let userData = {};

            const result = convert.xml2js(xml, options);

            result.collection.record.field.forEach(item => {



                switch (item._attributes.tag) {
                    case "10":
                        userData.surname = item._text;
                        break;
                    case "11":
                        userData.name = item._text;
                        break;
                    case "12":
                        userData.patronymic = item._text;
                        break;
                    case "13":
                        userData.registrationAdress = item._text;
                        break;
                    case "15":
                        userData.placeofwork = item._text;
                        break;
                    case "16":
                        userData.position = item._text;
                        break;
                    case "20":
                        userData.education = item._text;
                        break;
                    case "21":
                        userData.birthdate = item._text;
                        break;
                    case "160":
                        userData.speciality = item._text;
                        break;
                    case "28":
                        userData.degree = item._text;
                        break;
                    case "51":
                        userData.dateOfReg = item._text;
                        break;
                    case "30":
                        userData.libraryCardNumber = item._text;
                        break;
                    case "99":
                        userData.phonenumber = item._text;
                        break
                    case "32":
                        userData.email = item._text;
                        break;
                    case "953":
                        userData.image = item.subfield.find(item => item._attributes.code === "B")._text;
                        break;
                }
            });

            try {
                await irbisUsers.insertOne(userData);
            } catch (err) {
                errors.push(err);
            }

            if (file === files[files.length - 1]) {

                let status = errors.length > 0 ? "Пользователи добавлены с ошибками" : 'Пользователи добавлены';
                let errorsStatus = errors.length;
                let errorsText = errors.length > 0 ? errors.map(it => it.name) : 0;

                console.log(errors);
                res.send(`<div><h1>${status}</h1>
                           <h2>ошибок: ${errorsStatus}</h2>
                           <div>текст ошибок: ${errorsText}</div>
                           </div>`);
            }

        }
    } catch (err) {
        errors.push(err);
        console.log(err);
        res.send(err);
    }

}