const deleteProduct = () => {
    try {
        const idCart = document.querySelector(".cart-list").id

        const deleteButtons = document.querySelectorAll(".delete-button")
        deleteButtons.forEach(button => {
            
            button.addEventListener("click", async () => {
                const idProduct = button.id
                await deleteProductFromCart(idCart, idProduct).then(Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto borrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  }))
                location.reload()
            })
           
        })
        
    }
    catch (err) {
        console.log("No se pudo eliminar el producto del carrito", err)
    }
}

deleteProduct()

const deleteProductFromCart =  async(cid, pid) => {
    try{
        const response = await fetch(`../api/carts/${cid}/products/${pid}`, {
            method: "DELETE", 
            headers: {
                "Content-type": "application/json"
            }
        })
        console.log(response)
        return response
    }
    catch (err) {
        console.log("No se pudo hacer el fetch correctamente.", err)
    }
}