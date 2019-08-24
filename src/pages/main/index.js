import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import "./styles.css";

export default class Main extends Component {
    // Modo de armazenar variaveis no react
    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    // Funções nativas do react podem ser usadas como namedfunctions
    componentDidMount() {
        this.loadProducts();
    }
    // Funções criadas precisam ser arrow functions para não sobrescrever o valor do this, mantendo o valor do escopo fora da função
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        // Amazenando variável
        const { docs, ...productInfo} = response.data
        this.setState({products: docs, productInfo, page})
    };

    prevPage = () => {
        const { page, productInfo} = this.state;

        if (page === 1) return;
        
        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    };

    nextPage = () => {
        const { page, productInfo} = this.state;
        if (page === productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber)
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
        //desestruturação para manusear as variáveis.
        const { products, page, productInfo } = this.state;
        return(
            <div className="product-list">
                {products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
        //return <h1>Contagem de produtos: {this.state.products.length}</h1>
    }
}