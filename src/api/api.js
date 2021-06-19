const { NODE_ENV } = process.env;
const baseUrl = NODE_ENV === 'dev' ? 'http://auth.gpntbsib.ru:3000' : 'http://10.3.6.91:3000/' ;

function getResponse(res) {
    if (!res.ok) {
        console.log(res);
        return Promise.reject(res.status);

    }
    try {
        return res.json();
    } catch (err) {
        throw new Error(`Ошибка: ${err}`);
    }
}


export function getUserData() {
    return fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return getResponse(res);
        });

}



export function getAllUsers() {
    return fetch(`${baseUrl}/getallusers`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return getResponse(res);
        });

}

export function getDataFromLibraryCard(obj) {
    return fetch(`${baseUrl}/getuserdatafromlibrarycard/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });

}


export function sendUserData(obj) {
    return fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });
}


export function signupByCard(obj) {
    return fetch(`${baseUrl}/activatelibrarycard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });
}



export function saveImage(obj) {
    return fetch(`${baseUrl}/saveimage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });
}



export function updateUserData(obj) {
    return fetch(`${baseUrl}/updateinfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });
}


export function loginEmail(obj) {
    return fetch(`${baseUrl}/login-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });

}


export function loginLibraryCard(obj) {
    return fetch(`${baseUrl}/login-library-card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => {
            return getResponse(res);
        });

}

export function checkUserEmail(obj) {
    return fetch(`${baseUrl}/checkemail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(res => {
        return getResponse(res);
    });
}

export function signin(obj) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return getResponse(res);
    });

}

export function signinLibraryCard(obj) {
    return fetch(`${baseUrl}/signinlibrarycard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return getResponse(res);
    });

}

export function signOut() {
    return fetch(`${baseUrl}/signout`, {
            method: 'GET',
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return getResponse(res);
        });

}




export function sendCode(obj) {
    return fetch(`${baseUrl}/send-code-for-reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return getResponse(res);
    });

}


export function compareCodes(obj) {
    return fetch(`${baseUrl}/verify-codes-for-reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return getResponse(res);
    });

}


export function resetPassword(obj) {
    return fetch(`${baseUrl}/reset-user-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return getResponse(res);
    });

}