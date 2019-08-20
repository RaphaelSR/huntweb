import React, { Component } from 'react';
import api from '../../services/api';


export default class Main extends Component {
    // Modo de armazenar variaveis no react
    state = {
        products: [],
    }

    // Funções nativas do react podem ser usadas como namedfunctions
    componentDidMount() {
        this.loadProducts();
    }
    // Funções criadas precisam ser arrow functions para não sobrescrever o valor do this, mantendo o valor do escopo fora da função
    loadProducts = async () => {
        const response = await api.get('/products');
        // Amazenando variável
        this.setState({products: response.data.docs})
    };
    // loadProducts = async () => {
    //     await api
    //       .get(`/products`)
    //       .then(resposta => {
    //            console.log(resposta);
    //       })
    //       .catch(error => {
    //     console.log(error)
    //       });
    // }
    render() {
        return(
            <div className="product-list">
                {this.state.products.map(product => (<h2 key={product._id}>{product.title}</h2>))}
            </div>
        )
        //return <h1>Contagem de produtos: {this.state.products.length}</h1>
    }
}