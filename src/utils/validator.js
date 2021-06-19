const emailPattern = /^[a-z0-9]+(_[a-z0-9]+)*(-[a-z0-9]+([_-][a-z0-9]+)*)*(\.[a-z0-9]+([_-][a-z0-9]+)*)*@([a-z0-9]+([_-][a-z0-9]+)*)\.[a-z0-9]+([_-][a-z0-9]+)*(\.[a-z0-9]+([_-][a-z0-9]+)*)*$/i;

const namePattern = /^[а-яА-ЯёЁ\s]+$/i;


export function validator(e, value, state, password = null, validMail=true) {
    console.log(e);
    let inputName = e.target.name;
    
    if (!value) {
        state[inputName].state = false;
        state[inputName].message = 'Заполните все поля';
    } else {
        state[inputName].state = true;
        state[inputName].message = null;
    }
    switch (inputName) {
        case "inputSurname":
        case "inputName":
        case "inputPatronymic":
            if (!namePattern.test(value) && value) {
                state[inputName].state = false;
                state[inputName].message = 'Введите имя на русском языке';

            }
            break;
        case "inputEmail":
            if (!emailPattern.test(value) && value) {
                state[inputName].state = false;
                state[inputName].message = 'Введите корректный адрес электронной почты';

            }
            if (!validMail) {
                state[inputName].state = false;
                state[inputName].message = 'Пользователь с таким email уже есть';

            }
            break;
        case "inputDegree":
            if (value.degree == 'не указано' || !value) {
                state[inputName].state = false;
                state[inputName].message = 'Заполните все поля';

            }
            break;
        case "inputSpeciality":
            if (value.speciality == 'не указано' || !value) {
                state[inputName].state = false;
                state[inputName].message = 'Заполните все поля';

            }
            break;
        case "inputPasswordRepeat":
            if (password !== value) {
                state[inputName].state = false;
                state[inputName].message = 'Пароли не совпадают';

            }
            break;

    }
    console.log(state);
    return state;

}

export function phoneValidator(e) {
   
} 

