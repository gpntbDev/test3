const ldap = require("ldapjs");
const {
  LDAP_URL,
  LDAP_CLIENT_DN,
  LDAP_CLIENT_PASSWORD = ""
} = process.env;

module.exports.ldapCreateUser = async (userData) => {
  try {
    const client = ldap.createClient({
      url: LDAP_URL,
    });

    client.on("error", (err) => {
      throw err;
    });

    await new Promise((resolve, reject) => {
      client.bind(LDAP_CLIENT_DN, LDAP_CLIENT_PASSWORD, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }

        var entry = {
          cn: `${userData.libraryCardNumber}`,
          sn: "test test",
          userPassword: userData.password,
          objectclass: "Person"
        };

        client.add(
          `cn=${userData.libraryCardNumber},ou=PeopleEZ,dc=gpntbsib,dc=ru`,
          entry,
          function (err, res) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(res);
          }
        );
      });
    });

    client.unbind(function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  } catch (e) {
    throw e;
  }
};

module.exports.updateUserInfo = async (libraryCardNumber, password) => {
  try {
    const client = ldap.createClient({
      url: LDAP_URL,
    });

    client.on("error", (err) => {
      throw err;
    });

    await new Promise((resolve, reject) => {
      client.bind(LDAP_CLIENT_DN, LDAP_CLIENT_PASSWORD, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }

        const change = new ldap.Change({
          operation: "replace",
          modification: {
            userPassword: password
          }
        });

        client.modify(
          `cn=${libraryCardNumber},ou=PeopleEZ,dc=gpntbsib,dc=ru`,
          change,
          (err) => {
            if (err) {
              throw err;
            }
            resolve("updated");
          }
        );
      });
    });

    client.unbind(function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  } catch (e) {
    throw e;
  }
};