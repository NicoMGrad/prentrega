import axios from 'axios'

export default {
    namespaced:true,
    state: {
        productos: {},
        carrito: [
            {
              id: 1,
              producto: 'Frutillas',
              precio: 250,
              cantidad: 356
            },
            {
              id: 2,
              producto: 'Naranjas',
              precio: 250,
              cantidad: 356
            }
          ],
        product: null
    },
    mutations: {
        CARGAR_PRODUCTOS: (state, productos) => {
            state.productos = productos;
        },
        SUMAR_ITEM: (state, producto) => {
            let productoBuscado = state.carrito.find(item => {
            return item.id == producto.id
            })
            let productoOriginal = state.productos.find(item => {
                return item.id == producto.id
            })
            if(productoBuscado){
                productoBuscado.contador += 1;
                productoBuscado.precio = productoOriginal.precio * productoBuscado.contador;
                productoBuscado.cantidad = productoOriginal.cantidad * productoBuscado.contador;  
            }
        },
        ELIMINAR_PROD_DE_CARRITO: (state, producto) => {
            state.carrito = state.carrito.filter(item => {
                return item.id !== producto.id 
            })
        },
        RESTAR_ITEM: (state, producto) => {
            let productoBuscado = state.carrito.find(item => {
                return item.id == producto.id
            })
            let productoOriginal = state.productos.find(item => {
                return item.id == producto.id
            })
            if(productoBuscado){
                if(productoBuscado.contador <= 1){
                    this.ELIMINAR_PROD_DE_CARRITO(state, producto);
                } else {
                    productoBuscado.contador -= 1;
                    productoBuscado.precio = productoOriginal.precio * productoBuscado.contador;
                    productoBuscado.cantidad = productoOriginal.cantidad * productoBuscado.contador; 
                }
            }
        },
        ADD_A_CARRITO: (state, { id, producto, precio, cantidad, contador }) => {
    
            let productoEnCarrito = state.carrito.find(item => {
                return item.id == id
            })
        
            if(productoEnCarrito){
                productoEnCarrito.cantidad += cantidad;
                productoEnCarrito.contador += 1;
                productoEnCarrito.precio += precio;
                return
            }
        
            state.carrito.push({
                id,
                producto,
                precio,
                cantidad,
                contador
            })
        }
    },
    actions: {
        traerProductos: ({commit}) => {
            let url = 'arrayProductos';
            axios.get(url)
            .then(response=>{
                commit('CARGAR_PRODUCTOS',response.data)
            })
        },
        agregarAcarrito: ({commit},{ id, producto, precio, cantidad, contador }) => {
            commit('ADD_A_CARRITO', { id, producto, precio, cantidad, contador});
        },
        sumarItem: ({commit}, producto ) => {
            commit('SUMAR_ITEM', producto );
        },
        restarItem: ({commit}, producto ) => {
            commit('RESTAR_ITEM', producto );
        },
        eliminarProductoEnCarrito: ({commit}, producto) => {
            commit('ELIMINAR_PROD_DE_CARRITO', producto);
        }
    },
    getters: {

    }
}