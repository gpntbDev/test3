const fs = require('fs');
const path = require('path');




module.exports = async (req, res, next) => {

    try {

        const pathCurrent = `./src/images/users/${req.body.id}` + '.jpg';
        const imgdata = req.body.base64Image;
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(pathCurrent, base64Data, {
            encoding: 'base64'
        });
     //   let finalPath = pathCurrent.replace(/^\.\/static/, '');
        let result = await req.app.locals.collection.updateOne({
            email: req.body.user
        }, {
            $set: {
                image: `/images/users/${req.body.id}`
            },
        });

        

        return res.send({
            path: `/images/users/${req.body.id}`
        });

    } catch (e) {
        console.log(e);
    }


}