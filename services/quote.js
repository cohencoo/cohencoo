const form = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    phone: document.querySelector("#phone"),
    websiteCategory: document.querySelector("#category"),
    websiteDescription: document.querySelector("#website-description"),
    pageAmount: document.querySelector("#page-amount"),
    additionalFeatures: document.querySelector("#additional-features"),
    customFeatures: document.querySelector("#custom-features"),
    preferences: document.querySelector("#preferences"),
    comments: document.querySelector("#comments"),
}

Menu.open({
    title: "Quotes temporarily unavailable",
    content: `
    <br>
    We are currently in the process of implementing an improved quote automation system, improving the speed and accuracy of our quotes. 
    <br>
    <br>
    In the meantime, Please contact us via <a style="font-weight: 600;" href="mailto:cohencoombs@outlook.com"> cohencoombs@outlook.com </a>
    <br>
    <br>
    Thankyou for your understanding. <a style="font-weight: 500; text-decoration: underline" href="./"> Head Back </a>
    `
}, false, false)

function submit() {
    console.log(form)
}