const createUser = () => {
    const signupForm = document.querySelector("#signup-form")
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const name = document.querySelector("#name").value
        const lastname = document.querySelector("#lastname").value
        const age = document.querySelector("#age").value
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        const newUser = {
            name,
            lastname,
            age,
            email,
            password
        }

        await postUser(newUser).then(Swal.fire({
            title: 'Usuario creado con éxito!',
            icon: 'success',
            confirmButtonText: 'Cool'
          }).then(() => {
            window.location.href = "/login"
          })).catch(Swal.fire({
            title: 'El email ya se encuentra registrado',
            icon: 'Error',
            confirmButtonText: 'Cool'
          }))
    })
}

const postUser = async (newUser)=> {
    try{
        const response = await fetch("/api/session/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        console.log(response)
        const result = response.json()
        return result
    }
    catch (err) {
        console.log("Algo ha ocurrido al tratar de crear el usuario en el front", err)
    }
}

createUser()