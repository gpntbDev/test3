
module.exports = (code) => {

    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
    
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    
    <body style="margin: 0; padding: 0;">
        <table style="background-color: #f0f0f0;" border="0" align="center" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="padding-top: 40px;" height="100">
                    <table style="background-color: #fff; border-radius: 10px;" align="center" cellpadding="0"
                        cellspacing="0" width="600">
                        <tr>
                            <td style="padding:20px 0 0 40px;">
                                <img width="121" border="0" height="56"
                                    src="data:image/png;base64,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"
                                    alt="logo" style="display: block;" />
                            </td>
                        </tr>
                        <tr cellpadding="0" cellspacing="0" width="100%">
                            <td
                                style="padding:35px 0 35px 40px; font-size: 24px; font-family: Arial, Helvetica, sans-serif; font-style: normal; font-weight: 800;">
                                Восстановление пароля
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding-left:40px; padding-right:40px; font-size: 14px; line-height: 19px; font-family: Arial, Helvetica, sans-serif; font-style: normal;">
                                Ваш код для сброса пароля: ${code}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding-left:40px; padding-right:40px; padding-top:20px; padding-bottom:80px; font-size: 14px; line-height: 19px; font-family: Arial, Helvetica, sans-serif; font-style: normal;">
                                Если вы не заправшивали изменение пароля, пожалуйста, <a
                                    href="http://www.spsl.nsc.ru/">сообщите нам</a>.
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 20px; padding-bottom: 20px;">
                                <table align="center" border="0" cellpadding="0" cellspacing="0"
                                    style="border-collapse: collapse;">
                                    <tr>
                                        <td style="padding-right:20px;">
                                            <a href="https://www.facebook.com/gpntbsorannsk/">
                                                <img width="30" border="0" height="30" style="display: block;" border="0"
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKzSURBVHgBvZdPUtswFMa/J4sO0019g6YHaAsnaDgBYUeBGeITkJ6AcALKCWRmCu3S2+6SG6TDBVh2mQVtmTbS65NDMvmjODaB/GYytmVJn97z09MLoQwNE2MTWzqiXQfUiVADI87fEfpy3yOgN3DcxdckKzMlLRNUL9UJKW6NhZZzy0ypc+4S35JbVBWOPpoGIjIVBOcWAOYze52kwflDjeowPSeiz3K7iccTg6hBb/fAN1l39iUFRI00NvG0pPaqmUw2TFmsji5PRbSFirAPMOCnN4PCXtqK3jVid5N9HzWMLY4OTFNcY1ASL6bAF3qA9H4miNShaRHofG6Q4z37EPU6b9g3NRE9RQVR53jHXSe9QeA9sXggFLZKDGuaDtJEFu2ftTqWSw0lIcefIKKoTqz+Dj+lHq6QmxUG9xdtkdxzAiv1SuYMdpHdciKXto6OZL9yeWuFXkgwivL4qOfPC0QfiPW+qSt2D53LwpIYZlAqd18dJXEKDSWmv8eqVM1uRB98cG1hzUjA17zwY3PxKsSqRKfbDctvRj/7W7bSDO4PWpN9xPeXyyb128mnu0Kr7wuOt5ws6d8P58mJDtPXKKavGPNRuiq8xBCvqSR//sATQ0sC1lcrWsqYjtwfF/SL1YFpjwdJmWNnyhufhCQfjMSWBytzV9sXyKJ/OC8YENP0AZLKb0qYLRqkqGjxk/S9pvInBRNfYH1k49PJafgyp481YC2f+etwH3urMWx4TuTEOhtVnuME4q4Sb3UHzwUhG1wn7dHjVOayG7zHoWNvRfyc9o6nir3plCkudxu888TiHfeLd3x2m2zUc928OLCtj0xb/hGUrsNCyDe9EPcGq9aFh8TgS9K2JRN+gI5l3l4k6tGFwyUCrS/u901bRZIkQLvBfsO6ukPE3cGdbM0Zt4b4D280E4OhjMFLAAAAAElFTkSuQmCC"
                                                    alt="facebook">
                                            </a>
                                        </td>
                                        <td style="padding-right:20px;">
                                            <a href="https://vk.com/gpntb_so_ran">
                                                <img width="30" style="display: block;" border="0" height="30"
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK1SURBVHgBtVfdjdpAEJ5Zm6d7oQTSAR3EVMDlIdLlLlJwBaEDoIKECkykHDopDyEVQDogFYTrwHlIHoLtyczaGDv+W9/hT0Ksd8fzze7OfLtGaIvX3hB6MEyfCXwI4ABf3H0LL4BGVjeeY1k4Y+shE/UrPPkQwY4j+Rau3VWTSzQg9Lg1gHY4ANGiLoBy4muvr65wxoNTeAb4/Y9Bjxawcv2SsSKpfYVbgsw+PgPsZx/1aPQ/OXZJWkeusgayvJcmFfDshvaRkzPfF8O69SaAOpE6A4Y0Ch7cnbTPM8Z8RF2ArPPENLGebfuSeQoGNpeoNOz4Gcfm78KKiB454n6EOMaWAZOlV3YXLzWCUzAgWob3E5QfImfkqT+iH9HanQdrd4osEtmATvbyE+cV3Dp5Fdx60ijIILO9g4mn+4PPOiFiR4r7SxCG5yCSrXOgHH3Re2WpyqXqq79n5eJZLyrsgGe+hAf3oB9uvEFTolp8yCgW9n6lQ8T32hHEsxZyJnlMDRT4XPeH4A/MU6eG2o4G9bvjPRuBAay33jUQfm00JHIVNMNRbzyjwyK0YSfy2GjIZ7gKDQxR4awXJ2EevA323erDKQlFi0WTm8hDvjgoWOubgw/1kJrdJtmawrJhyCRTdcRt2inkIb2q8enLbSUREB2hAw3kkgvW3UrO6U1E9Iv386UMyCHA/T+59j/lCErKlPf3u/xpYslWInTADAOZJWd8oR/N9H6TBBtDccTYsV5L6UX3kxeaLyVGcqFjZCU2JU4EYgkdQdQte/nL1XFgw9yoDltCfGbVTQdSsOKalPLAS172fvPptslf9orKlYjAJZZdlreMVI/VvSiCQajv1wNoAcleSdbkOC0PCgygFUvhmB06WPEJQ/wJw2N70YQ6wlbEWYhmR3KGZ45T3q/9cd3uo+0fUDMnxxwvMJQAAAAASUVORK5CYII="
                                                    alt="vk">
                                            </a>
                                        </td>
                                        <td>
                                            <a href="https://www.instagram.com/gpntbnsk/?hl=ru">
                                                <img width="30" style="display: block;" border="0" height="30"
                                                    src="data:image/png;base64,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"
                                                    alt="">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
    
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0" align="center" cellpadding="0" cellspacing="0" width="600">
                        <tr>
                            <td align="center"
                                style="padding-top:5px; padding-bottom: 40px; font-size: 12px; font-family: Arial, Helvetica, sans-serif; font-style: normal;">
                                Вы
                                получили это
                                письмо, так как указали свой email при восстановлении пароля на сайте ГПНТБ СО РАН.
                            </td>
                        </tr>
                    </table>
    
                </td>
            </tr>
        </table>
    
    </body>
    
    </html>`

}