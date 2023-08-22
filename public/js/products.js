const userName = document.querySelector("#user")
const userRole = document.querySelector("#role")

Swal.fire({
  title: `Bienvenido ${userName.textContent}!`,
  text: `Role: ${userRole.textContent}`,
  icon: 'success',
  confirmButtonText: 'Cool'
})


async function createCartAndAddProducts () {
  const  cartResponse = await fetch("api/carts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
  //Espero a que se complete la creacion del carrito.
    const cartData = await cartResponse.json(); // Parse the response JSON
    const cid = cartData.data._id; // Extraigo el ID del carrito que se creo recientemente

    console.log(cid)
    const goToCart = document.querySelector(".go-to-cart")
    goToCart.addEventListener("click", async (event) => {
      try{
        event.preventDefault()
        window.location.href = `cart/${cid}`
      }
      catch (err) {
        console.log("no se pudo ir al carrito")
      }
      
    })



  const addToCart = document.querySelectorAll(".add-to-cart");
  addToCart.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonId = button.id;
      addProductToCart(cid, buttonId).then(Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      }));
    });
  });
};

createCartAndAddProducts()

//Hago el fetch para poder agregar el producto al carrito que se creo.
const addProductToCart = async (cid, pid) => {
  try {
    const response = await fetch(`api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

/* LOGOUT */
const logout = () => {
  const buttonLogout = document.querySelector("#logout")
  buttonLogout.addEventListener("click", async () => {
    const response = await fetch("api/session/logout")
    const data = await response.json()
    if (data) {
      Swal.fire({
        title: 'Sesión cerrada con éxito!',
        icon: 'success',
        confirmButtonText: 'Cool'
      }),
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
      
    }
  })
}

logout()