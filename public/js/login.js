const logIn = () => {
    const loginForm = document.querySelector("#login-form")
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        const user = {
            email,
            password
        }

        await getUser(user).then(() => {
            window.location.href = "/products"
        })

    }) 
}

const getUser = async (user) => {
    try{
        const response = await fetch("/api/session/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const result = response.json()
        return result
    }
    catch(err){
        console.log("Algo ha ocurrido. No se pudo acceder a la cuenta", err)
    }
    
}

logIn()